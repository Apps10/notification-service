import zod from 'zod'
import { config } from 'dotenv'
interface IEnv {
  MAIL_HOST: string
  MAIL_PORT: number
  MAIL_USER: string
  MAIL_PASSWORD: string
  FIREBASE_CREDENTIALS: string
}

class Env {
  private static envs: IEnv
  private static envSchema = zod.object({
    MAIL_HOST: zod.string(),
    MAIL_PORT: zod.string().transform((val) => parseInt(val)),
    MAIL_USER: zod.string(),
    MAIL_PASSWORD: zod.string(),
    FIREBASE_CREDENTIALS: zod.string(),
  })

  private constructor() {}

  public static getEnvVars(): IEnv {
    config()
    if (!Env.envs) {
      const result = this.envSchema.safeParse(process.env)
      if (result?.error) {
        console.error(
          `❌ Invalid environment variables: ${JSON.stringify(result.error.format())}`,
        )
        throw new Error('Invalid Environment variables')
      }
      Env.envs = result.data
    }
    return Env.envs
  }
}

export const {
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USER,
  FIREBASE_CREDENTIALS,
}: IEnv = Env.getEnvVars()

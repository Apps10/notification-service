import zod from 'zod'

interface IEnv {
  MAIL_HOST: string
  MAIL_PORT: number
  MAIL_USER: string
  MAIL_PASSWORD: string
}

class Env {
  private static envs: IEnv
  private static envSchema = zod.object({
    MAIL_HOST: zod.string(),
    MAIL_PORT: zod.number(),
    MAIL_USER: zod.string(),
    MAIL_PASSWORD: zod.string(),
  })

  private constructor() {}

  public static getEnvVars(): IEnv {
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

export const { MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USER }: IEnv =
  Env.getEnvVars()

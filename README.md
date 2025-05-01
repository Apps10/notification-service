# NotifyX - Sistema de Notificaciones

NotifyX es una plataforma de notificaciones desarrollada con **NestJS** que permite el envío de mensajes a través de distintos canales como **WebSockets**, **Email (SMTP con Nodemailer)** y anteriormente **Firebase Cloud Messaging (FCM)**.

## 🧰 Tecnologías Utilizadas

- **NestJS**: Framework backend basado en Node.js.
- **Socket.IO**: Comunicación en tiempo real con clientes mediante WebSockets.
- **Nodemailer**: Envío de correos electrónicos.
- **TypeScript**: Lenguaje de desarrollo principal.
- **Arquitectura hexagonal**: Separación de lógica de negocio y puertos/adaptadores.

## 🔌 Canales de notificación implementados

- **WebSocket**: Envío de mensajes en tiempo real a clientes conectados.
- **Email (SMTP)**: Notificaciones enviadas por correo electrónico.
- **Push Notifications (FCM)**: Notificaciones enviadas a travez de firebase cloud push.

## 🚀 Cómo correr el proyecto en local

1. Clonar el repositorio:

```bash
git clone https://github.com/tu_usuario/notifyx.git
cd notifyx
```

2. Instalar dependencias:

```bash
yarn install
```

3. Configurar variables de entorno en `.env`:

```env
MAIL_HOST=smtp.freesmtpservers.com
MAIL_PORT=25
MAIL_USER=notifyx@gmail.com
MAIL_PASSWORD=
FIREBASE_CREDENTIALS= //debe generar desde firebase #https://firebase.google.com/docs/auth/admin/create-custom-tokens?hl=es-419
//se debe pegar el contenido del archivo json en formato de texto
//eje: 
FIREBASE_CREDENTIALS ='{"type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}'}'
```

4. Ejecutar el servidor NestJS:

```bash
yarn start:dev
```



## 🐋 Cómo correr el proyecto en docker

1. Clonar el repositorio:

```bash
git clone https://github.com/tu_usuario/notifyx.git
cd notifyx
```

2. ejecutar el comando:

```bash
docker compose up -d
```


## 📁 Estructura del Proyecto

```
src/
├── adapters/
│   ├── email/
│   └── socket/
├── controller/
├── domain/
│   ├── entities/
│   └── ports/
├── gateway/
├── application/
│   └── useCases/
└── notification.module.ts
```

## 🧪 Probar las distintas notificaciones

### 💻 Cliente WebSocket (Node.js)

Para probar el canal WebSocket:

1. Ejecutamos el cliente

```bash
tsx ./src/scripts/socketClient.ts
```

2. Enviamos el payload del tipo socket:
(POST) http://localhost:3000/notification

```json
{
  "type": "socket",
  "message": "mensaje de bienvenida",
}
```

3. revisa la salida del socketClient




### ✉️ Envio de correo

Se usa un servidor SMTP gratuito sin necesidad de autenticación.

Servidor utilizado:
WPOven SMTP - https://www.wpoven.com/tools/free-smtp-server

![alt text](/docs/image.png)

Para probar el envio de correo:

 ### nota: puedes saltar directo al paso 4 si pusiste las credenciales de tu servidor SMTP
 

 1. ingresa a la pagina de WPOVEN
 2. en la casilla de email coloca el correo destino que deseas y dale click en Access Inbox
 ![alt text](/docs/image-1.png)
 3. te aparecera esta ventanada con todos los correos que te hayan llegado.
![alt text](/docs/image-2.png)
  4. Enviamos el payload del tipo email:
(POST) http://localhost:3000/notification

```json
{
  "type": "email",
  "recipient": "micorreo@gmail.com",
  "message": "mensaje de bienvenida",
  "subject": "Hola mundo"
}
```
  5. revisamos si nos llego en la plataforma

  ![alt text](/docs/image-4.png)




 ### 📲 Cómo probar el envío de notificaciones push (Firebase)
Obtén las credenciales del tipo Service Account desde la consola de Firebase.

Pega el JSON completo en la variable de entorno FIREBASE_CREDENTIALS como string.

Variable de entorno:

```env
{
  FIREBASE_CREDENTIALS='{
    "type": "service_account",
    ...
  }'
}
```

Necesitas un FCM token válido para probar. Puedes obtenerlo desde una app móvil (Android/iOS) que use Firebase.

1. Realiza un POST al endpoint de notificación con el token.
```json
{
  "type": "push",
  "recipient": "token firebase",
  "message": "mensaje de bienvenida",
}
```

2. revisar en tu cliente de firebase si lo recibiste

## ✨ Contribuciones

Este proyecto está en desarrollo y puede ser extendido con nuevos canales de notificación (SMS, Telegram, WhatsApp, etc.).

---

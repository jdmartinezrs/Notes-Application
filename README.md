**Notes application**



La ***\*Aplicación de Notas\**** es una plataforma diseñada para facilitar la gestión de notas personales de los usuarios. Su principal objetivo es proporcionar un entorno sencillo y accesible donde los usuarios puedan crear, editar, visualizar y eliminar sus notas de manera eficiente. La aplicación cuenta con funcionalidades como la búsqueda de notas, autenticación de usuario y un historial de cambios, lo que permite a los usuarios organizar sus pensamientos y mantener un registro de sus ideas de forma segura y privada. La aplicación está desarrollada con una arquitectura que incluye tanto un frontend intuitivo como un backend sencillo, asegurando una experiencia de usuario fluida. Además, el uso de un token JWT para la autenticación garantiza que solo los usuarios autorizados puedan acceder a sus notas, protegiendo así la privacidad y seguridad de la información.



MongoDB conecction

```
mongodb://rojas:developerOne@junction.proxy.rlwy.net:19262/backendPush-up

Variables de entorno "Archivo .env"

EXPRESS_PORT=3000

EXPRESS_HOST="localhost"

EXPRESS_EXPIRE=50000

JWT_SECRET="davidR10"

MONGO_ACCESS=

MONGO_USER=

MONGO_PWD=

MONGO_HOST=

MONGO_PORT=

MONGO_DB_NAME=
```

```js
Npm version 10.8.2  
```

## Tecnologías usadas

```js
FrontEnd: React, Tailwind
BackEnd: Node.js, Express.js, MongoDB, Jsonwebtoken, Cors
```

## Instalación

```
git clone https://github.com/jdmartinezrs/Notes-Application.git
```

```
npm i
```

## Ejecución

```
npm run dev:server (Backend)
npm run dev:client (Frontend)
npm run dev (Backend/Frontend)
```

## Estructura de carpetas Arquitectura Hexagonal

```js
Notes-Application-1
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│
├───client
│   │   .gitignore
│   │   eslint.config.js
│   │   index.html
│   │   package-lock.json
│   │   package.json
│   │   postcss.config.js
│   │   README.md
│   │   tailwind.config.js
│   │   vite.config.js
│   │
│   ├───public
│   │   │   vite.svg
│   │   │
│   │   ├───fonts
│   │   │   └───Nunito
│   │   │       │   Nunito-Black.ttf
│   │   │       │   Nunito-BlackItalic.ttf
│   │   │       │   ...
│   │   │
│   │   └───img
│   │       │   add.png
│   │       │   brand.png
│   │       │   ...
│   │
│   └───src
│       │   App.css
│       │   App.jsx
│       │   index.css
│       │   main.jsx
│       │
│       ├───assets
│       │       react.svg
│       │
│       ├───components
│       │       SaveDialog.jsx
│       │       SearchBar.jsx
│       │       SearchInput.jsx
│       │
│       └───pages
│               CreateFirstNote.jsx
│               CreateNotes.jsx
│               InsideNotes.jsx
│               LoggInCampusNotes.jsx
│               SingInCampusNotes.jsx
│               StartScreen.jsx
│
└───server
    │   app.js
    │   package-lock.json
    │   package.json
    │
    ├───adapters
    │       noteHistorySchema.js
    │       noteSchema.js
    │       usuarioSchema.js
    │
    ├───application
    │   ├───controllers
    │   │       noteController.js
    │   │       noteHistoryController.js
    │   │       usuarioController.js
    │   │
    │   ├───middleware
    │   │       authenticateToken.js
    │   │       token.js
    │   │
    │   ├───routes
    │   │       noteHistoryRoutes.js
    │   │       noteRoutes.js
    │   │       usuarioRoutes.js
    │   │
    │   ├───services
    │   │       noteHistoryService.js
    │   │       noteService.js
    │   │       usuarioServices.js
    │   │
    │   └───validator
    │           noteHistoryValidator.js
    │           noteValidator.js
    │           usuarioValidator.js
    │
    ├───domain
    │   ├───models
    │   │       noteHistoryModel.js
    │   │       noteModel.js
    │   │       usuariosModel.js
    │   │
    │   └───repositories
    │           noteHistoryRepository.js
    │           noteRepository.js
    │           usuariosRepository.js
    │
    └───infraestructure
            ...

```

A continuación, se presenta la documentación de los endpoints de la API para la gestión de usuarios.

```js
1. Usuarios
Crear Usuario
Método: POST
Endpoint: http://localhost:3000/user/usuarios
Descripción: Crea un nuevo usuario.
Body: {
  "nombre_usuario": "example",
  "email": "instance@ejemplo.com",
  "contrasena_hash": "test1" //cinco carácteres
}
returns:
{
  "nombre_usuario": "example",
  "email": "instance@ejemplo.com",
  "contrasena_hash": "$2a$10$UIOjJIHFZH2TS9EGqwBX2OMDKDOupO0RQfbsUL3yM.LXzatzREs/S",
  "_id": "67230c806d38617f213d9b46",
  "createdAt": "2024-10-31T04:50:08.270Z",
  "updatedAt": "2024-10-31T04:50:08.270Z",
  "__v": 0
}
```

```js
Iniciar Sesión
Método: POST
Endpoint:http://localhost:3000/user/usuarios/login
Descripción: Obtiene la información del usuario excluyendo contrasena_hash y el campo fecha_de_creacion. Retorna la fecha y hora actual del inicio de sesión.
Body:
{
  "nombre_usuario": "example",
  "contrasena_hash": "test1"
}

returns:
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVfdXN1YXJpbyI6ImV4YW1wbGUiLCJjb250cmFzZW5hX2hhc2giOiIkMmEkMTAkVUlPakpJSEZaSDJUUzlFR3F3QlgyT01ES0RPdXBPMFJRZmJzVUwzeU0uTFh6YXR6UkVzL1MiLCJmZWNoYV95X2hvcmFfZGVfaW5pY2lvX2RlX3Nlc2lvbiI6IjIwMjQtMTAtMzFUMDQ6NTA6MDguMjY0WiIsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMzFUMDQ6NTA6MDguMjcwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMzFUMDQ6NTA6MDguMjcwWiIsIl9fdiI6MCwiaWF0IjoxNzMwMzUxMDAyLCJleHAiOjE3MzAzNTE5MDJ9.KSKGp10uFw4LlBSer0k6HIZAL43l8uEi6U-GuMPe6X0"
```

### 2. Notas

```js
#### Crear Nota

Método: POST
Endpoint:localhost:3000/note/create
Descripción:Crea una nueva nota.

Body:
{
    "title": "Title example ",
    "content": "Note body description ."
}

returns:
{
  "title": "Title example ",
  "content": "Note body description .",
  "_id": "6723113a8f31bb86d9549db0",
  "createdAt": "2024-10-31T05:10:18.011Z",
  "updatedAt": "2024-10-31T05:10:18.011Z",
  "__v": 0
}
```

```js
Obtener Todas las Notas
Método: GET
Endpoint: http://localhost:3000/note/notes
Descripción: Obtiene todas las notas del usuario autenticado.
returns:
[
  {
    "_id": "6723113a8f31bb86d9549db0",
    "title": "Title example ",
    "content": "Note body description .",
    "createdAt": "2024-10-31T05:10:18.011Z",
    "updatedAt": "2024-10-31T05:10:18.011Z",
    "__v": 0
  },
  {
    "_id": "6720d1102df4c592c306ee13",
    "title": "nuevo",
    "content": "sjnvldsvm",
    "createdAt": "2024-10-29T12:12:00.285Z",
    "updatedAt": "2024-10-29T12:12:00.285Z",
    "__v": 0
  },
  {
    "_id": "671f5dd61684cfcf69787218",
    "title": "bboy deejay mc ",
    "content": "i any form of expressiom .",
    "createdAt": "2024-10-28T09:48:06.299Z",
    "updatedAt": "2024-10-29T08:02:00.509Z",
    "__v": 0
  },
  {
    "_id": "671dd427f18bef388d609eac",
    "title": "Ready for breaking",
    "content": "This days but even back in the days here in latin breaks are the thing .",
    "createdAt": "2024-10-27T05:48:23.480Z",
    "updatedAt": "2024-10-28T08:47:33.717Z",
    "__v": 0
  },
  {
    "_id": "671dbcac30c98ac17ccfcce4",
    "title": "ready to rock and breaking",
    "content": "this was said in new yok back in the days but even here in latin .",
    "createdAt": "2024-10-27T04:08:12.497Z",
    "updatedAt": "2024-10-27T05:20:15.655Z",
    "__v": 0
  }
]
```

```js
#### Obtener Nota por ID

- **Método:** `GET`
- **Endpoint:** http://localhost:3000/note/notes/6723113a8f31bb86d9549db0
- **Descripción:** Obtiene una nota específica por su ID.

#### Parámetros:
- `id`: ID de la nota a obtener.

returns: 
{
  "_id": "6723113a8f31bb86d9549db0",
  "title": "Title example ",
  "content": "Note body description .",
  "createdAt": "2024-10-31T05:10:18.011Z",
  "updatedAt": "2024-10-31T05:10:18.011Z",
  "__v": 0
}
```

```js
- **Método:** `PUT`
- **Endpoint:** /localhost:3000/note/notes/6723113a8f31bb86d9549db0
- **Descripción:** Actualiza una nota específica por su ID.

#### Campos para el Body:
{
    "title": "New data ",
    "content": "The description was updated"
}

returns:
{
  "_id": "6723113a8f31bb86d9549db0",
  "title": "New data ",
  "content": "The description was updated",
  "createdAt": "2024-10-31T05:10:18.011Z",
  "updatedAt": "2024-10-31T05:26:39.881Z",
  "__v": 0
}
```

**Obtener Historial**

```js
**Método:** `Get`

- **Endpoint:** http://localhost:3000/history/notes/:id/history

- **Descripción:** Obtener el historial de una nota 

  returns:

  [
    {
      "_id": "672315438f31bb86d9549dbb",
      "noteId": "6723113a8f31bb86d9549db0",
      "title": "New data ",
      "content": "The description was updated",
      "updatedAt": "2024-10-31T05:26:39.881Z",
      "__v": 0
    },
    {
      "_id": "6723150f8f31bb86d9549db7",
      "noteId": "6723113a8f31bb86d9549db0",
      "title": "Title example ",
      "content": "Note body description .",
      "updatedAt": "2024-10-31T05:10:18.011Z",
      "__v": 0
    }
  ]
```

#### Eliminar Nota

```js
- **Método:** `DELETE`
- **Endpoint:** http://localhost:3000/note/notes/:id
- **Descripción:** Elimina una nota específica por su ID.

#### Parámetros:
- `id`: ID de la nota a eliminar.
```


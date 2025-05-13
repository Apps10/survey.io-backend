# 🧠 Survey.io - Backend

Survey.io es una plataforma de encuestas en tiempo real construida con **NestJS**, siguiendo principios de **arquitectura hexagonal**. Soporta autenticación JWT, roles, votación en tiempo real con WebSockets y Redis, y persistencia con Prisma + PostgreSQL.

tambien puedes probar el frontend, descargalo desde aqui 
Frontend: [@survey.io-frontend](https://github.com/apps10/survey.io-frontend)

## 🚀 Tecnologías principales

- NestJS + arquitectura hexagonal
- Prisma ORM + PostgreSQL
- Redis para cache y rate-limit
- WebSockets
- JWT Auth + Roles
- TypeScript
- Docker (opcional)

## 📁 Estructura del proyecto

```
├───application
│ ├───dtos                  # Data Transfer Objects
│ ├───factories             # Fábricas para crear objetos y servicios
│ ├───interfaces            # Interfaces para casos de uso y servicios
│ └───useCases              # Casos de uso o lógica de negocio
├───domain
│ ├───entities              # Entidades de dominio (modelos)
│ ├───exceptions            # Excepciones del dominio
│ ├───interfaces            # Interfaces del dominio
│ ├───mappers               # Mapeo entre entidades y DTOs
│ ├───repositories          # Repositorios que interactúan con la base de datos
│ └───services              # Servicios del dominio
├───infraestructure
│ ├───adapter               # Adaptadores para servicios
│ ├───api                   # Controladores y rutas API NestJs
│ │ ├───controllers         # Controladores para manejar rutas
│ │ ├───exceptionHandlers   # Manejadores de excepciones
│ │ └───http-dtos           # DTOs específicos con validaciones para la capa HTTP
│ ├───decorators            # Decoradores personalizados
│ ├───factories             # Fábricas para crear objetos complejos (usecases, etc)
│ ├───gateway               # Puertas de entrada (gateways)
│ ├───guards                # Guardias de autorización y validación
│ ├───mappers               # Mapeo entre entidades y DTOs
│ ├───provider              # Proveedores externos (redis)
│ ├───repositories          # Repositorios de base de datos
│ └───services              # Servicios Varios
└───shared
├───config                  # Archivos de configuración
├───decorators              # Decoradores compartidos
├───exceptions              # Excepciones comunes
└───services                # Servicios compartidos
```

## ⚙️ Instalación

```bash
npm install
```

### Variables de entorno

Crea una copia del archivo `.env.example` con el nombre de `.env` en la raíz del proyecto:

```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/surveyio
JWT_SECRET=clave_secreta
REDIS_URL=redis://localhost:6379
```

## 🛠️ Comandos útiles

- Generar cliente Prisma:

```bash
npx prisma generate
```

- Migrar base de datos:

```bash
npx prisma migrate dev --name init
```


- Levantar servidor:

```bash
npm run start:dev
```

## 🔒 Autenticación

- Login y registro con email + contraseña
- JWT + Roles (`user`, `admin`)
- Guards y decorators personalizados

## 📡 Encuestas en tiempo real

- WebSocket Gateway para eventos de votos
- Redis Pub/Sub para múltiples instancias
- Actualización en vivo de votos

## 🔌 Endpoints principales

| Método | Ruta                  | Descripción                  |
|--------|-----------------------|------------------------------|
| POST   | `/user/register`      | Registro de usuario          |
| POST   | `/user/login`         | Login y obtención de token   |
| GET    | `/surveys`            | Listar encuestas             |
| POST   | `/surveys/vote`       | Votar por una opción         |
| POST   | `/surveys`            | Crear nueva encuesta (admin) |

> Algunos endpoints requieren token JWT.


## 🐳 Docker (opcional)

Si deseas usar Docker:

```bash
docker-compose up --build
```

Asegúrate de tener `Dockerfile` y `docker-compose.yml` configurados.

## 👨‍💻 Autor

**Alfonso Contreras Vergara**  
Backend Developer  
GitHub: [@Apps10](https://github.com)

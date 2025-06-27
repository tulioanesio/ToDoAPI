<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# NestJS To-Do API

This is a RESTful API project for managing tasks (To-Dos), built using the **NestJS** framework as a learning exercise. The application uses **Prisma ORM** for data persistence with a **PostgreSQL** database, includes **JWT-based authentication**, and offers interactive API documentation through **Swagger**. It also integrates **Scalar** to enhance data validation and schema typing.  
The project uses **`pnpm`** as the package manager for improved performance and consistency.


## Technologies Used

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT (JSON Web Tokens)](https://jwt.io/)
- [Swagger](https://swagger.io/tools/swagger-ui/)
- [Scalar](https://scalar.com/)
- [pnpm](https://pnpm.io/)

## Installation & Setup

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd <project-folder>

# 2. Install dependencies using pnpm
pnpm install

# 3. Create a .env file and configure the following environment variables
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret_key"

# 4. Generate Prisma client and sync schema to the database
npx prisma migrate dev
npx prisma generate
npx prisma db push

# 5. Start the development server
pnpm run start:dev
```

---

## API Documentation

Once the server is running, access the API docs at:

```
http://localhost:3000/docs
```

---

## Main Endpoints

### Authentication

- `POST /register` — Register a new user
- `POST /login` — Log in and receive a JWT token

### To-Do Tasks

> ⚠️ All To-Do endpoints require a valid JWT token in the `Authorization` header:  
> `Authorization: Bearer <token>`

- `GET /task` — Retrieve all to-dos for the authenticated user
- `POST /task` — Create a new to-do item
- `PUT /task/:id` — Update a to-do item
- `DELETE /task/:id` — Delete a to-do item

---

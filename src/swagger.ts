import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('To-Do API')
    .setDescription('Complete task management API with JWT authentication')
    .setVersion('1.0')
    .setContact(
      'Tulio Anesio',
      'https://github.com/tulioanesio',
      'tulioluv@gmail.com',
    )
    .addServer('http://localhost:3000', 'Servidor Local')
    .addTag('Auth', 'User registration and login operations')
    .addTag('Task', 'CRUD operations for task management')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'To-Do API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      docExpansion: 'list',
      displayRequestDuration: true,
      filter: true,
    },
  });

  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'bluePlanet',
      layout: 'modern',
      darkMode: true,
      metaData: {
        title: 'To-Do API Reference',
        description: 'Interactive documentation for the Task Management API',
      },
    }),
  );
}

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

const SWAGGER_DOCS_USER = process.env.SWAGGER_DOCS_USER as string;
const SWAGGER_DOCS_PASSWORD = process.env.SWAGGER_DOCS_PASSWORD as string;

export function swaggerConfig(app: INestApplication) {
  app.use(
    '/api/docs',
    basicAuth({
      challenge: true,
      users: {
        [SWAGGER_DOCS_USER]: SWAGGER_DOCS_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('CarOnApp API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'CarOnApp API',
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
}

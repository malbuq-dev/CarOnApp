import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './application/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RideModule } from './application/ride/ride.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('JWT_SECRET'),
      }),
      global: true,
      inject: [ConfigService],
    }),
  DatabaseModule,
  AuthModule,
  RideModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

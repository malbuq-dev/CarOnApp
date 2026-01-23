import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { LoginUseCase } from './use-cases/login.use-case';
import { ChangePasswordUseCase } from './use-cases/change-password.use-case';
import { TokenService } from './services/tokens.service';
import { RefreshTokensUseCase } from './use-cases/refresh-token.use-case';
import { LogoutUseCase } from './use-cases/logout-use-case';

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthController],
  providers: [
    CreateUserUseCase,
    LoginUseCase,
    LogoutUseCase,
    ChangePasswordUseCase,
    RefreshTokensUseCase,
    TokenService,
  ],
})
export class AuthModule {}

import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateuserDto } from './dtos/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { AuthPresenter } from './auth.presenter';
import { LoginDto } from './dtos/login.dto';
import { LoginUseCase } from './use-cases/login.use-case';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { ChangePasswordUseCase } from './use-cases/change-password.use-case';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { RefreshTokensDto } from './dtos/refresh-tokens.dto';
import { RefreshTokensUseCase } from './use-cases/refresh-token.use-case';
import { TokensPresenter } from './tokens.presenter';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RESPONSES } from 'src/core/response/response.messages';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly refreshTokensUseCase: RefreshTokensUseCase,
  ) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Cria um usuário na aplicação',
  })
  async create(@Body() createUserDto: CreateuserDto) {
    const result = await this.createUserUseCase.execute(createUserDto);

    const user = AuthPresenter.toHTTP(result.user);
    return {
      message: RESPONSES.USERS.CREATED_SUCCESSFULLY,
      data: {
        user,
      },
    };
  }

  @Post('login')
  @ApiOperation({
    summary: 'Cria um refresh token e um access token',
  })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.loginUseCase.execute(loginDto);

    const user = AuthPresenter.toHTTP(result.user);

    return {
      message: RESPONSES.AUTH.AUTHENTICATED_SUCCESSFULLY,
      data: {
        user,
        tokens: TokensPresenter.toHTTP(result.tokens),
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  @ApiOperation({
    summary: 'Permite que usuário altere sua senha',
  })
  async changePassword(
    @Body() changePasswordData: ChangePasswordDto,
    @Req() req,
  ) {
    await this.changePasswordUseCase.execute({
      oldPassword: changePasswordData.oldPassword,
      newPassword: changePasswordData.newPassword,
      userId: req.userId,
    });

    return {
      message: RESPONSES.USERS.PASSWORD_MODIFIED_SUCCESSFULLY,
    };
  }

  @Post('refresh')
  @ApiOperation({
    summary:
      'Permite que usuário restaure seu token de acesso por um período pre-definido de tempo',
  })
  async refreshTokens(@Body() refreshTokensDto: RefreshTokensDto) {
    const result = await this.refreshTokensUseCase.execute(refreshTokensDto);

    return {
      message: RESPONSES.AUTH.TOKENS_REFRESHED_SUCCESSFULLY,
      data: TokensPresenter.toHTTP(result.tokens),
    };
  }
}

import { Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateuserDto } from "./dtos/create-user.dto";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { AuthPresenter } from "./auth.presenter";
import { LoginDto } from "./dtos/login.dto";
import { LoginUseCase } from "./use-cases/login.use-case";
import { AuthenticationGuard } from "src/core/guard/auth.guard";
import { ChangePasswordUseCase } from "./use-cases/change-password.use-case";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { RefreshTokensDto } from "./dtos/refresh-tokens.dto";
import { RefreshTokensUseCase } from "./use-cases/refresh-token.use-case";
import { TokensPresenter } from "./tokens.presenter";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly changePasswordUseCase: ChangePasswordUseCase,
        private readonly refreshTokensUseCase: RefreshTokensUseCase,
    ) {}
    
    @Post('signup')
    async create(@Body() createUserDto: CreateuserDto) {
        const result = await this.createUserUseCase.execute(createUserDto);

        const user = AuthPresenter.toHTTP(result.user);
        return {
            message: "Usuário criado com sucesso",
            data: {
                user,
            },
        };
    }
    
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const result = await this.loginUseCase.execute(loginDto);
        
        const user = AuthPresenter.toHTTP(result.user);
        
        return {
            message: 'Usuário autenticado com sucesso',
            data: {
                user,
                tokens: TokensPresenter.toHTTP(result.tokens)
            }
        }
    }   

    @UseGuards(AuthenticationGuard)
    @Put('change-password')
    async changePassword(@Body() changePasswordData: ChangePasswordDto, @Req() req) {
        await this.changePasswordUseCase.execute({
            oldPassword: changePasswordData.oldPassword,
            newPassword: changePasswordData.newPassword,
            userId: req.userId
        });
        
        return {
            message: 'A senha foi alterada com sucesso'
        }
    }

    @Post('refresh')
    async refreshTokens(@Body() refreshTokensDto: RefreshTokensDto) {
        const result = await this.refreshTokensUseCase.execute(refreshTokensDto);

        return {
            message: 'Tokens restaurados com sucesso',
            data: TokensPresenter.toHTTP(result.tokens)
        }
    }
}
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { USERS_REPOSITORY } from "src/domain/repositories/repository.tokens";
import * as bcrypt from 'bcrypt';
import type { UsersRepository } from "src/domain/repositories/users.repository";
import { PASSWORD_HASHER } from "src/domain/security/security.tokens";
import type { PasswordHasher } from "src/domain/security/password-hasher";

export interface ChangePasswordRequest {
    userId: string;
    oldPassword: string;
    newPassword: string;
}

@Injectable()
export class ChangePasswordUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRespository: UsersRepository,
        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasher,
    ) {}

    async execute(changePasswordData: ChangePasswordRequest): Promise<void> {
        const user = await this.usersRespository.findById(changePasswordData.userId);
        
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        
        const isValid = await this.passwordHasher.compare(
        changePasswordData.oldPassword,
        user?.password,
        );

        if (!isValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const newPasswordHash = await this.passwordHasher.hash(changePasswordData.newPassword);

        user.changePassword(newPasswordHash);

        await this.usersRespository.save(user);
    }
}
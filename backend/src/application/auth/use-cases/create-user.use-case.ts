import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { USERS_REPOSITORY } from "src/domain/repositories/repository.tokens";
import * as bcrypt from 'bcrypt';
import type { UsersRepository } from "src/domain/repositories/users.repository";
import type { PasswordHasher } from "src/domain/security/password-hasher";
import { PASSWORD_HASHER } from "src/domain/security/security.tokens";

export interface CreateUserUseCaseRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: UsersRepository,
        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasher,
    ) {}
    
    async execute(createUserUseCaseRequest: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const existingUser = await this.usersRepository.findByEmail(createUserUseCaseRequest.email);

        if (existingUser) {
            throw new ConflictException("O e-mail informado já está em uso");
        }
        
        const hashedPassword = await this.passwordHasher.hash(createUserUseCaseRequest.password);

        const user = new User(
            createUserUseCaseRequest.firstName,
            createUserUseCaseRequest.lastName,
            createUserUseCaseRequest.email,
            hashedPassword
        );

        await this.usersRepository.save(user);

        return { user };
    }
}
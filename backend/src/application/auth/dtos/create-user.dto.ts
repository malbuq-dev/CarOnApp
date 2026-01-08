import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsStrongPassword } from "class-validator";

export class CreateuserDto {
    @ApiProperty({
        description: 'Primeiro nome do usuário',
        example: 'Michael'
    })
    @IsAlpha()
    firstName: string;
    
    @ApiProperty({
        description: 'Sobrenome do usuário',
        example: 'Albuquerque'
    })
    @IsAlpha()
    lastName: string;
    
    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'usuario@exemplo.com'
    })
    @IsEmail()
    email: string;
    
    @ApiProperty({
        description: 'Senha do usuário',
        example: 'Javascript1!'
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;
}
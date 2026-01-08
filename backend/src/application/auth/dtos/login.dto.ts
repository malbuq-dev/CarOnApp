import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'usuario@exemplo.com'
    })
    @IsEmail() 
    email: string;
    
    @ApiProperty({
        description: 'Senha do usuário',
        example: 'Javascript1!'
    })
    @IsString()
    password: string;
}
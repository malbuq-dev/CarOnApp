import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({
        description: 'Nova senha do usuário',
        example: 'Javascript1!'
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    newPassword: string;
    
    @ApiProperty({
        description: 'Antiga senha do usuário',
        example: 'Javascript1!'
    })
    @IsString()
    oldPassword: string;
}
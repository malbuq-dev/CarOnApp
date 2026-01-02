import { IsString, IsStrongPassword } from "class-validator";

export class ChangePasswordDto {
    @IsStrongPassword()
    newPassword: string;
    
    @IsString()
    oldPassword: string;
}
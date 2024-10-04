import { IsEmail, IsNumber, IsOptional } from "class-validator";

export class FindUserDto {
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNumber()
    number?: number;
}
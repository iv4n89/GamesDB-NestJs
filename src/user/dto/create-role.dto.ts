import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    isAdmin: 0 | 1;
}
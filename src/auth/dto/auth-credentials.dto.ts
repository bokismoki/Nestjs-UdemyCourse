import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator"

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    username: string

    @MinLength(8)
    @MaxLength(30)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password is too weak'})
    password: string
}
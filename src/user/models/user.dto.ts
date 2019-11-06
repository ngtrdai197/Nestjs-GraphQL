import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiModelProperty({ required: true })
  username: string;

  @IsString()
  @ApiModelProperty({ required: true })
  password: string;

  @IsString()
  @ApiModelProperty({ required: true })
  fullName: string;

  @IsString()
  address?: string;
}

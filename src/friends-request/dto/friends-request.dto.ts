import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateFriendsRequestDto {
  @IsString()
  @ApiModelProperty({ required: true })
  readonly user: string;

  @IsString()
  @ApiModelProperty({ required: true })
  readonly toUser: string;

  @IsString()
  @ApiModelProperty()
  @IsOptional()
  readonly notification?: string;

  @IsNumber()
  @ApiModelProperty({ required: true })
  readonly status: number;
}

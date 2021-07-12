import { IsNumber, IsNotEmpty, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  readonly mesa: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly dishId: number;

  @IsNotEmpty()
  readonly createdAt: string;
}

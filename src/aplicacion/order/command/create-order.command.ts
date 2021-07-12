import { IsNumber, IsPositive, Min, IsDateString  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommandCreateOrder {
  @IsNumber()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  public amount: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  public price: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  public mesa: number;

  @IsPositive()
  @ApiProperty()
  public dishId: number;

  @IsDateString()
  public createdAt: string;
}

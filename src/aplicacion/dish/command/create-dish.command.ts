import { IsString, IsNumber, IsPositive, Min, IsUrl  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoCreateDish {
  @IsString()
  @ApiProperty()
  public title: string;

  @IsString()
  @ApiProperty()
  public description: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  public price: number;

  @IsUrl()
  @ApiProperty()
  public image: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  public group: number;
}

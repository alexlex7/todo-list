import { IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({
    type: Number,
    required: false,
    description: 'Set quantity of results will be returned',
  })
  limit: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({
    type: Number,
    required: false,
    description: 'Set quantity items in collection should be omitted',
  })
  offset: number;
}

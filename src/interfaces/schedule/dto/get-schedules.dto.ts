import { IsString } from 'class-validator';

export class GetSchedulesDto {
  @IsString()
  yearMonth: string;
}

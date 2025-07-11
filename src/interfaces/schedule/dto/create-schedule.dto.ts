import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateScheduleCommand } from 'src/domain/schedule/command/create-schedule.command';
import { COLOR } from 'src/domain/schedule/schedule.entity';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsIn(Object.values(COLOR))
  @IsOptional()
  color: COLOR;

  toCommand(coupleId: number, userId: number): CreateScheduleCommand {
    return {
      coupleId,
      creatorId: userId,
      title: this.title,
      description: this.description,
      date: this.date,
      color: this.color,
    };
  }
}

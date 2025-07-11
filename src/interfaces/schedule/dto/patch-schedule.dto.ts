import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import { UpdateScheduleCommand } from 'src/domain/schedule/command/update-schedule.command';
import { COLOR } from 'src/domain/schedule/schedule.entity';

export class UpdateScheduleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date?: Date;

  @IsIn(Object.values(COLOR))
  @IsOptional()
  color?: COLOR;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  toCommand(): UpdateScheduleCommand {
    return {
      title: this.title,
      description: this.description,
      date: this.date,
      color: this.color,
      isCompleted: this.isCompleted,
    };
  }
}

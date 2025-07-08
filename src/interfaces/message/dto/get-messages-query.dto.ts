import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { GetMessagesCommand } from 'src/domain/message/command/get-messages.command';

export class GetMessagesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cursor?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number;

  toCommand(coupleId: number): GetMessagesCommand {
    return {
      coupleId,
      cursor: this.cursor,
      limit: this.limit,
    };
  }
}

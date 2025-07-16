import { MessageType } from '@prisma/client';
import { IsIn, IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  content: string;

  @IsIn(Object.values(MessageType))
  type: MessageType;
}

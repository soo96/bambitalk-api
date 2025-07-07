import { IsNumber, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNumber()
  coupleId: number;

  @IsNumber()
  senderId: number;

  @IsString()
  content: string;
}

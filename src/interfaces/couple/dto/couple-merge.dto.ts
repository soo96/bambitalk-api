import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CoupleMergeDto {
  @Length(6, 6)
  @IsString()
  @IsNotEmpty()
  inviteCode: string;
}

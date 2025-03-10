import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Exclude()
    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    updatedAt: Date = new Date();
}

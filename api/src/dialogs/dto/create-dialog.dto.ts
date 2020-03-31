import { IsEnum } from 'class-validator';
import { UpdateDialogDto } from './update-dialog.dto';
import { DialogType } from '../schemas/dialog.schema';

export class CreateDialogDto extends UpdateDialogDto {
  @IsEnum(DialogType)
  type: DialogType = DialogType.private;
}

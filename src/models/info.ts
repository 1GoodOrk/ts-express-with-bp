import { IsDefined } from 'class-validator';

export class Info {
  @IsDefined()
  static country: string;

  @IsDefined()
  static city: string;
}

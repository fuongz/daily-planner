import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  id: string;

  @Prop({
    required: true,
  })
  iss: string;

  @Prop({
    required: true,
  })
  org_code: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

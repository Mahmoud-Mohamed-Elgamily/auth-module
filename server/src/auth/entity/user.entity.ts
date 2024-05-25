import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

@Schema()
export class UserEntity {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop({ select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.pre<UserEntity>('save', async function (next) {
  this.password = await hash(this.password, 10);
  next();
});

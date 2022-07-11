import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserUrlDocument = UserUrl & Document;
export type UrlDocument = Url_entity & Document;

@Schema()
export class Url_entity {
  @Prop()
  short_link: string;

  @Prop()
  long_link: string;

  @Prop()
  title: string;

  @Prop()
  clicks: number;
  @Prop()
  tags: string[];
}

@Schema()
export class UserUrl {
  @Prop()
  _id: number;

  @Prop([Url_entity])
  urls: Url_entity[];
}

export const UserUrlSchema = SchemaFactory.createForClass(UserUrl);
export const UrlSchema = SchemaFactory.createForClass(Url_entity);

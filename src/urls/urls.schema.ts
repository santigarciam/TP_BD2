import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type URLDocument = userUrl & Document;

@Schema()
export class userUrl {
  @Prop()
  _id: number;

  @Prop()
  urls: Url_entity[];
}

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

export const UrlSchema = SchemaFactory.createForClass(userUrl);

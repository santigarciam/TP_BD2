import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  UserUrlDocument,
  UserUrl,
  Url_entity,
  UrlDocument,
} from './urls.schema';

@Injectable()
export class UserUrlRepository {
  constructor(
    @InjectModel(UserUrl.name) private userUrlModel: Model<UserUrlDocument>,
  ) {}

  async create(userUrl: UserUrl): Promise<UserUrl> {
    const createUrl = new this.userUrlModel(userUrl);
    return createUrl.save();
  }

  async findOneAndUpdate(
    urlFilterQuery: FilterQuery<UserUrl>,
    url: Url_entity,
  ): Promise<UserUrl> {
    const user = await this.userUrlModel.findById(urlFilterQuery);
    if (!user) {
      return null;
    }
    // Buscamos si ya existe ese short link para ese usuario, en caso de que exista actualizamos su info
    const index = user.urls.findIndex(
      (element) => element.short_link == url.short_link,
    );

    if (index >= 0) {
      user.urls[index] = url;
    } else {
      user.urls.push(url);
    }

    return user.save();
  }

  async findOne(urlFilterQuery: FilterQuery<UserUrl>): Promise<UserUrl> {
    return this.userUrlModel.findOne(urlFilterQuery);
  }

  async createUserCollection(userId: number) {
    return this.userUrlModel.create(userId);
  }

  async list(urlFilterQuery: FilterQuery<UserUrl>): Promise<UserUrl[]> {
    return this.userUrlModel.find(urlFilterQuery);
  }
}

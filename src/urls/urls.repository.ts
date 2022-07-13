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

  async deleteUrlFromUser(
    urlFilterQuery: FilterQuery<UserUrl>,
    short_link: string,
  ): Promise<boolean> {
    const user = await this.userUrlModel.findById(urlFilterQuery);
    if (!user) {
      return false;
    }
    const index = user.urls.findIndex(
      (element) => element.short_link == short_link,
    );
    if (index >= 0) {
      user.urls.splice(index);
      user.save();
      return true;
    }

    return false;
  }

  async findOneAndAddUrl(
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

  async findById(urlFilterQuery: FilterQuery<UserUrl>): Promise<UserUrl> {
    return this.userUrlModel.findById(urlFilterQuery);
  }

  async createUserCollection(userId: number) {
    return this.userUrlModel.create(userId);
  }

  async list(urlFilterQuery: FilterQuery<UserUrl>): Promise<UserUrl[]> {
    return this.userUrlModel.find(urlFilterQuery);
  }
}

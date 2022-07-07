import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { urlDto } from './urls.dto';
import { URLDocument, userUrl, Url_entity, UrlSchema } from './urls.schema';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(userUrl.name) private urlModel: Model<URLDocument>,
  ) {}

  async create(urlDto: urlDto): Promise<string> {
    const createUrl = new this.urlModel(urlDto);
    createUrl._id = urlDto.user_id;
    createUrl.save();
    console.log(createUrl);

    return '';
  }

  async createUserCollection(userId: number) {
    return this.urlModel.create(userId);
  }

  async findUserCollection(id: number): Promise<userUrl> {
    return this.urlModel.findById(id).exec();
  }
}

import { Injectable } from '@nestjs/common';
import { urlDto } from './urls.dto';
import { Url_entity, UserUrl } from './urls.schema';
import { UserUrlRepository } from './urls.repository';

@Injectable()
export class UserUrlService {
  constructor(private readonly userUrlRepository: UserUrlRepository) {}

  async getUserUrlsById(userId: number): Promise<UserUrl> {
    return this.userUrlRepository.findOne({ userId });
  }

  async createUserUrl(userId: number): Promise<UserUrl> {
    return this.userUrlRepository.create({
      _id: userId,
      urls: [],
    });
  }

  async addUrlToUser(userId: number, urlDto: urlDto): Promise<UserUrl> {
    const url = new Url_entity();
    url.clicks = 0;
    url.long_link = urlDto.long_link;
    url.short_link = urlDto.short_link;
    url.title = urlDto.title;
    url.tags = [];
    return this.userUrlRepository.findOneAndUpdate({ _id: userId }, url);
  }
}

import { Injectable } from '@nestjs/common';
import { Client, Entity, Schema, Repository } from 'redis-om';
import Result from '../Result';

interface ShortUrl {
  shortUrl: string;
  longUrl: string;
}

class ShortUrl extends Entity {}

let schema = new Schema(
  ShortUrl,
  {
    shortUrl: { type: 'text', indexed: true },
    longUrl: { type: 'string' },
  },
  { dataStructure: 'HASH' },
);

@Injectable()
export class RedisService {
  public client = new Client();

  public async connect() {
    if (!this.client.isOpen()) {
      await this.client.open(process.env.REDIS_URL);
    }
  }

  public async createUrlKeyValue(
    shortUrl: string,
    longUrl: string,
  ): Promise<boolean> {
    await this.connect();

    let alreadyCreated = await this.client.get(shortUrl);

    if (!alreadyCreated) {
      this.client.set(shortUrl, longUrl);
      return true;
    } else {
      return false;
    }
  }

  public async getUrlByHash(shortUrl: string): Promise<string> {
    await this.connect();
    return this.client.get(shortUrl);
  }

  public async deleteKeyValue(shortUrl: string): Promise<void> {
    await this.connect();

    this.client.execute(['DEL', shortUrl]);
  }
}

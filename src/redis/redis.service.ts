import { Injectable } from '@nestjs/common';
import { Client, Entity, Schema, Repository } from 'redis-om';

interface ShortUrl {
    shortUrl: string;
    longUrl: string;
}

class ShortUrl extends Entity { }

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

        if (!(await this.shortUrlExist(shortUrl))) {
            this.client.set(shortUrl, "0:" + longUrl);
            return true;
        } else {
            return false;
        }
    }

    public async updateUrlKeyValue(
        shortUrl: string,
        longUrl: string,
    ): Promise<boolean> {
        return await this.createUrlKeyValue(shortUrl, longUrl);
    }

    public async getUrlByHash(shortUrl: string): Promise<string> {
        await this.connect();
        let longLink = await this.client.get(shortUrl);
        if (longLink) {
            let destination = longLink.substring(longLink.indexOf(":") + 1, longLink.length);
            let clicks = Number(longLink.substring(0, longLink.indexOf(":")));
            clicks++;
            this.client.set(shortUrl, String(clicks) + ":" + destination);
            return destination;
        } else {
            return longLink;
        }
    }

    public async getUrlClicks(shortUrl: string): Promise<number> {
        await this.connect();
        let longLink = await this.client.get(shortUrl);
        if (longLink) {
            return Number(longLink.substring(0, longLink.indexOf(":")));
        } else {
            return 0;
        }
    }

    public async shortUrlExist(shortUrl: string): Promise<boolean> {
        let auxUrl = await this.getUrlByHash(shortUrl);

        if (auxUrl) {
            return true;
        } else {
            return false;
        }
    }

    public async deleteKeyValue(shortUrl: string): Promise<void> {
        await this.connect();
        this.client.execute(['DEL', shortUrl]);
    }
}

import { Injectable } from "@nestjs/common";
import { Client, Entity, Schema, Repository } from 'redis-om';
import Result from "../Result";

interface ShortUrl {
    shortUrl: string;
    longUrl: string;
}

class ShortUrl extends Entity { }

let schema = new Schema(ShortUrl, {
    shortUrl: { type: 'text', indexed: true },
    longUrl: { type: 'string' }
}, { dataStructure: 'HASH' });

@Injectable()
export class RedisService {

    public client = new Client();

    public async connect() {
        if (!this.client.isOpen()) {
            await this.client.open(process.env.REDIS_URL);
        }
    }

    public async createUrlObject(shortUrl: string, longUrl: string): Promise<ShortUrl> {

        await this.connect();

        const repository = this.client.fetchRepository(schema);

        let newUrl: ShortUrl = repository.createEntity();

        newUrl.shortUrl = shortUrl;
        newUrl.longUrl = longUrl;

        const id = await repository.save(newUrl);

        await repository.createIndex();

        return await repository.fetch(id);

    }

    public async createUrlKeyValue(shortUrl: string, longUrl: string) {

        await this.connect();

        this.client.set(shortUrl, longUrl);

    }

    public async getUrlByText(shortUrl: string): Promise<ShortUrl[]> {

        await this.connect();

        const repository = this.client.fetchRepository(schema);

        const url = await repository
            .search()
            .where('shortUrl')
            .match(shortUrl + '*')
            .returnAll();

        return url;

    }

    public async getUrlByHash(shortUrl: string): Promise<string> {

        await this.connect();

        return this.client.get(shortUrl);

    }
}
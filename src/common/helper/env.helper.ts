import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
    const env: string | undefined = process.env.NODE_ENV;
    const fallback: string = resolve(`${dest}/.env`);
    const filename: string = env ? `${env}.env` : 'development.env';
    let filePath: string = resolve(`${dest}/${filename}`);

    if (!existsSync(filePath)) {
        filePath = fallback;
    }

    //TODO: ver por que me rompe (tomas) sin esto
    const aux: string = resolve(`${dest}/.env`)
    console.log(aux)

    return aux;
}
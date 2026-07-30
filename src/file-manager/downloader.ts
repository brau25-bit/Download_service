import { access, mkdir } from "node:fs/promises";
import { constants, createWriteStream } from 'node:fs'
import path from 'node:path'
import { Readable } from "node:stream";
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import {pipeline} from 'node:stream/promises'

export class Downloader {
    static async createDir(current_path: string, name: string): Promise<string> {
        const sys_path = path.join(current_path, name);
        
        try {
            await access(sys_path, constants.F_OK)
        } catch (error) {
            await mkdir(
                sys_path, 
                {
                    recursive: true,
                    mode: 0o755
                })
        }

        return sys_path;
    }

    static async downloadImages(path: string, images: string, img_num: number){
        await mkdir(path, {recursive: true});

        const response = await fetch(images);

        if(!response.ok) throw new Error("failed to download");

        const body = response.body

        if(body === null) throw new Error("body is empty")

        try {
            await pipeline(
                Readable.fromWeb(
                    body as unknown as NodeReadableStream<Uint8Array>
                ),
                createWriteStream(`${path}/${img_num}.jpg`)
            )
        } catch (error) {
            throw new Error("failed to download images")
        }
    }
}
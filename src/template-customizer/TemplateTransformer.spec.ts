import {describe, it, expect} from 'vitest'
import {Readable} from 'stream'

import TemplateTransformer from './TemplateTransformer'
import packageJson from '../../package.json'


describe("TemplateTransformer", () => {
    const generateStringStream = (stringToStream: string) => {
        const readable = new Readable()
        readable.push(stringToStream)
        readable.push(null)

        return readable
    }

    const streamToString = (stream): Promise<string> => {
        const chunks: Buffer[] = [];
        return new Promise((resolve, reject) => {
          stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
          stream.on("error", (err) => reject(err));
          stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });
      };

    it("transforms correctly", async () => {
        const stream = generateStringStream(JSON.stringify(packageJson))
        const transformer = new TemplateTransformer("MIT", "my-react-mfe")

        const transformStream = stream.pipe(transformer)

        const result: string = await streamToString(transformStream)

        expect(result).toContain('"license":"my-react-mfe"')
        expect(() => JSON.parse(result)).not.toThrow()
    })
})
import {Transform, TransformCallback} from 'stream'
import os from 'os'

export default class TemplateTransformer extends Transform {
    private lastUnfinishedLine?: string = ''

    constructor(private templateName: string, private projectName: string) {
        super()
    }

    private stringReplacer(toReplace: string) {
        this.push(toReplace.replace(this.templateName, this.projectName))
    }

    _transform(chunk: any, _encoding: BufferEncoding, callback: TransformCallback): void {
        const newData = this.lastUnfinishedLine + chunk.toString()
        const finishedLines: string[] = newData.split(os.EOL)

        this.lastUnfinishedLine = finishedLines.pop()

        finishedLines.forEach(this.stringReplacer.bind(this))

        callback()
    }

    _flush(callback: TransformCallback) {
        if(this.lastUnfinishedLine) {
            this.stringReplacer(this.lastUnfinishedLine)
        }

        callback()
    }
}
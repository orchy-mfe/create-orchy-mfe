import {Command} from 'commander'
import packageJson from '../../package.json'

export interface Arguments {
    name?: string,
    directory?: string,
    template?: string,
    ts?: boolean
}

const argsParser = (): Arguments => {
    const program = new Command()
    program
        .name(packageJson.name)
        .description(packageJson.description)
        .version(packageJson.version, '-v --version')
        .option('-n --name <type>', 'The name of your new micro-frontend')
        .option('-d --directory <type>', 'The directory where your micro-frontend will be located')
        .option('-t --template <type>', 'The template that will be used generate your micro-frontend')
        .option('-T --ts', 'Use the TypeScript variant of the template')

    program.parse()

    return program.opts()
}

export default argsParser
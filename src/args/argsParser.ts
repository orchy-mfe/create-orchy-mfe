import args from 'args'

export interface Arguments {
    name?: string,
    directory?: string,
    template?: string,
    ts?: boolean
}

const manageBooleanValue = (value = '') => {
    const lowerCaseValue = `${value}`.toLowerCase()
    return ['true', 'false'].includes(lowerCaseValue) ? JSON.parse(lowerCaseValue) : undefined
}

const argsParser = (): Arguments => {
    args
        .option('name', 'The name of your new micro-frontend')
        .option('directory', 'The directory where your micro-frontend will be located')
        .option('template', 'The template that will be used generate your micro-frontend')
        .option('ts', 'Use the TypeScript variant of the template', undefined, manageBooleanValue)


    return args.parse(process.argv)
}

export default argsParser
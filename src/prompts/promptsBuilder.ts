import chalk from 'chalk'
import prompts from 'prompts'

import {Arguments} from '../args/argsParser'
import {GroupedRepositories} from '../git/gitFacade'

const PACKAGE_JSON_NAME_REGEX = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

const isValidPackageName = (projectName: string) => PACKAGE_JSON_NAME_REGEX.test(projectName)

const colorFunctions = [
  chalk.black,
  chalk.red,
  chalk.green,
  chalk.yellow,
  chalk.blue,
  chalk.magenta,
  chalk.cyan,
  chalk.white,
]

const choicesMapper = (name: string, index: number) => {
  const color = colorFunctions[index % colorFunctions.length]
  return {
    title: color(name),
    value: name
  }
}

const promptsBuilder = (groupedRepositories: GroupedRepositories, parsedArgs: Arguments): Array<prompts.PromptObject> => {
  console.clear()

  const groupedRepositoriesNames = Object.keys(groupedRepositories)
  const indexOfTemplate = parsedArgs.template ? groupedRepositoriesNames.indexOf(parsedArgs.template) : -1

  return [
    {
      type: parsedArgs.name ? null : 'text',
      name: 'name',
      message: chalk.green('Project name:'),
      initial: parsedArgs.name || 'orchy-mfe',
      validate: (name: string) => isValidPackageName(name) || 'Invalid package.json name'
    },
    {
      type: parsedArgs.directory ? null : 'text',
      name: 'directory',
      message: chalk.cyan('Target directory:'),
      initial: parsedArgs.directory || './',
    },
    {
      type: indexOfTemplate >= 0 ? null : 'select',
      name: 'template',
      message: chalk.magenta('Choose a template:'),
      initial: Math.max(indexOfTemplate, 0),
      choices: groupedRepositoriesNames.map(choicesMapper)
    },
    {
      type: (_, {template = parsedArgs.template}) => parsedArgs.ts !== undefined || !groupedRepositories[template].true ? null : 'confirm',
      name: 'ts',
      initial: parsedArgs.ts,
      message: chalk.blue('Use TypeScript variant?'),
    },
  ]
}


export default promptsBuilder
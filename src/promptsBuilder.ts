import chalk from "chalk"
import prompts from "prompts"

import { Arguments } from "./argsParser"
import { GroupedRepositories } from "./gitFacade"

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

const randomColor = () => colorFunctions[Math.floor(Math.random() * colorFunctions.length)]

const choicesMapper = (name: string) => {
  return {
    title: randomColor()(name),
    value: name
  }
}

const promptsBuilder = (groupedRepositories: GroupedRepositories, parsedArgs: Arguments): Array<prompts.PromptObject> => {
  console.clear()

  const groupedRepositoriesNames = Object.keys(groupedRepositories)

  return [
    {
      type: parsedArgs.name ? null : 'text',
      name: 'name',
      message: chalk.green('Project name:'),
      initial: 'orchy-mfe',
      validate: (name: string) => isValidPackageName(name) || 'Invalid package.json name'
    },
    {
      type: parsedArgs.directory ? null : 'text',
      name: 'directory',
      message: chalk.cyan('Target directory:'),
      initial: './',
    },
    {
      type: parsedArgs.template && groupedRepositoriesNames.includes(parsedArgs.template) ? null : 'select',
      name: 'template',
      message: chalk.grey('Choose a template:'),
      initial: 0,
      choices: groupedRepositoriesNames.map(choicesMapper)
    },
    {
      type: parsedArgs.ts ? null : 'confirm',
      name: 'ts',
      initial: false,
      message: chalk.blue('Use TypeScript variant?'),
    },
  ]
}


export default promptsBuilder
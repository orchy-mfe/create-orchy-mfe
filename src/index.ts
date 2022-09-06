import chalk from 'chalk'
import prompts from 'prompts'
import fs from 'fs/promises'
import path from 'path'

import argsParser, { Arguments } from './argsParser'
import GitFacade, { GroupedRepositories } from "./gitFacade"
import promptsBuilder from './promptsBuilder'

const retrieveChoises = async (groupedRepositories: GroupedRepositories, retrievedArgs: Arguments) => {
    try {
        return await prompts<any>(promptsBuilder(groupedRepositories, retrievedArgs), {
            onCancel: () => {
                throw new Error(chalk.red('Operation cancelled'))
            }
        })
    } catch (error: any) {
        console.log(error.message)
        return
    }
}

const main = async () => {
    const retrievedArgs = argsParser()

    console.log(chalk.blue("Retrieving available templates..."));
    const groupedRepositories = await new GitFacade().retrieveGroupedRepositories()

    const choises = await retrieveChoises(groupedRepositories, retrievedArgs) as Required<Arguments> | undefined
    if (!choises) {
        return
    }

    await fs.mkdir(path.join(choises.directory, choises.name), {recursive: true})
}

main()
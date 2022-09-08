#!/usr/bin/env node
import chalk from 'chalk'
import prompts from 'prompts'

import argsParser, { Arguments } from './argsParser'
import GitFacade, { GroupedRepositories } from "./gitFacade"
import promptsBuilder from './promptsBuilder'

const PROMPTS_OPTIONS = {
    onCancel: () => {
        throw new Error(chalk.red('✖ Operation cancelled'))
    }
}

const retrieveChoises = async (groupedRepositories: GroupedRepositories, retrievedArgs: Arguments) => {
    try {
        return {
            ...retrievedArgs,
            ...await prompts<any>(promptsBuilder(groupedRepositories, retrievedArgs), PROMPTS_OPTIONS)
        }
    } catch (error: any) {
        console.log(error.message)
    }
}

const main = async () => {
    const retrievedArgs = argsParser()

    console.log(chalk.blue("Retrieving available templates..."));
    const gitFacade = new GitFacade()
    const groupedRepositories: GroupedRepositories = await gitFacade.retrieveGroupedRepositories()

    const choises = await retrieveChoises(groupedRepositories, retrievedArgs) as Required<Arguments> | undefined
    if (!choises) {
        return
    }

    await gitFacade.downloadTemplate(choises)

    console.log(chalk.green("Operation completed successfully!"))
}

main()
#!/usr/bin/env node
import chalk from 'chalk'
import prompts from 'prompts'
import fs from 'fs/promises'
import path from 'path'
import gitly from 'gitly'

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

const downloadTemplate = async (choises: Required<Arguments>, groupedRepositories: GroupedRepositories) => {
    const destinationPath = path.join(choises.directory, choises.name)

    const repositoryToDownload = groupedRepositories[choises.template][`${choises.ts}`]

    // @ts-ignore
    const [gitlyDownloadPath] = await gitly.default(repositoryToDownload, destinationPath, {})

    await fs.rm(gitlyDownloadPath)
}

const main = async () => {
    const retrievedArgs = argsParser()

    console.log(chalk.blue("Retrieving available templates..."));
    const groupedRepositories: GroupedRepositories = await new GitFacade().retrieveGroupedRepositories()

    const choises = await retrieveChoises(groupedRepositories, retrievedArgs) as Required<Arguments> | undefined
    if (!choises) {
        return
    }

    await downloadTemplate(choises, groupedRepositories)
}

main()
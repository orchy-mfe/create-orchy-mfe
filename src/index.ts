import chalk from 'chalk'
import prompts from 'prompts'
import fs from 'fs/promises'
import path from 'path'
import {DownloaderHelper} from 'node-downloader-helper'
import unzipper from 'unzipper'
import os from 'os'

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

const downloadTemplate = async(choises: Required<Arguments>, groupedRepositories: GroupedRepositories) => {
    const destinationPath = path.join(choises.directory, choises.name)

    const archiveToDownload = groupedRepositories[choises.template][`${choises.ts}`]

    const tmpFolder = await fs.mkdtemp(`${os.tmpdir()}${path.sep}`)

    const downloaderHelper = new DownloaderHelper(archiveToDownload, tmpFolder, {headers: {'user-agent': 'create-orchy-mfe'}})

    downloaderHelper.pipe(unzipper.Extract({ path: destinationPath }))

    await downloaderHelper.start()
    await fs.rmdir(tmpFolder)
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
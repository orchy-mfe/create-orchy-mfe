import path from 'path'
import fs from 'fs/promises'
import gitly from 'gitly'

import { Arguments } from "../args/argsParser";
import GitClient, { GitTemplateRepositories } from "./gitClient";

export type GroupedRepositories = Record<string, Partial<Record<'true' | 'false', string>>>

const stripNamePrefixSuffix = (repository: GitTemplateRepositories) => ({ ...repository, name: repository.name.split('-').slice(1, -1).join('-') })

const groupRepositoriesByFramework = (repositories: GitTemplateRepositories[]) => {
    return repositories
        .map(stripNamePrefixSuffix)
        .reduce((acc, {name, downloadUrl}) => {
            const nameWithoutTypescript = name.replace('-typescript', '')
            const isTypeScript = name !== nameWithoutTypescript
            const templateKind = nameWithoutTypescript.split('-').at(0) as string

            acc[templateKind] = acc[templateKind] || {}
            acc[templateKind][`${isTypeScript}`] = downloadUrl

            return acc
        }, {} as GroupedRepositories)
}

export default class GitFacade {
    private gitClient = new GitClient()
    private groupedRepositories?: GroupedRepositories

    async retrieveGroupedRepositories(): Promise<GroupedRepositories> {
        const repositories = await this.gitClient.retrieveRepositories()
        return this.groupedRepositories = groupRepositoriesByFramework(repositories)
    }

    async downloadTemplate (choises: Required<Arguments>) {
        const destinationPath = path.join(choises.directory, choises.name)
        
        const template = this.groupedRepositories![choises.template]
        const repositoryToDownload = template[`${choises.ts}`] || template['false']
    
        // @ts-ignore
        const [gitlyDownloadPath] = await gitly.default(repositoryToDownload, destinationPath, {})
    
        await fs.rm(gitlyDownloadPath)
    }
}
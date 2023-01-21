import fs from 'fs/promises'
import gitly from 'gitly'
import path from 'path'

import {Arguments} from '../args/argsParser'
import replaceTemplateName from '../template-customizer/ReplaceTemplateName'
import GitClient, {GitTemplateRepositories} from './gitClient'

export type GroupedRepositories = Record<string, Partial<Record<'true' | 'false', GitTemplateRepositories>>>

const stripNamePrefixSuffix = (repository: GitTemplateRepositories) => ({...repository, templateName: repository.name.split('-').slice(1, -1).join('-')})

const groupRepositoriesByFramework = (repositories: GitTemplateRepositories[]) => {
    return repositories
        .map(stripNamePrefixSuffix)
        .reduce((acc, repository) => {
            const nameWithoutTypescript = repository.templateName.replace('-typescript', '')
            const isTypeScript = repository.templateName !== nameWithoutTypescript
            const templateKind = nameWithoutTypescript.split('-').at(0) as string

            acc[templateKind] = acc[templateKind] || {}
            acc[templateKind][`${isTypeScript}`] = repository

            return acc
        }, {} as GroupedRepositories)
}

export default class GitFacade {
    private gitClient = new GitClient()
    private groupedRepositories: GroupedRepositories = {}

    async retrieveGroupedRepositories(): Promise<GroupedRepositories> {
        const repositories = await this.gitClient.retrieveRepositories()
        return this.groupedRepositories = groupRepositoriesByFramework(repositories)
    }

    async downloadTemplate (choises: Required<Arguments>) {
        const destinationPath = path.join(choises.directory, choises.name)

        const template = this.groupedRepositories[choises.template]
        const repositoryToDownload = (template[`${choises.ts}`] || template['true'] || template['false']) as GitTemplateRepositories

        // @ts-ignore
        const [gitlyDownloadPath] = await (gitly.default || gitly)(repositoryToDownload.downloadUrl, destinationPath, {})

        await replaceTemplateName(choises, repositoryToDownload)

        await fs.rm(gitlyDownloadPath)
    }
}
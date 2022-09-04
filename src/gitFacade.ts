import GitClient, { GitTemplateRepositories } from "./gitClient";

export type GroupedRepositories = Record<string, Record<'true' | 'false', GitTemplateRepositories>>

const stripNamePrefixSuffix = (repository: GitTemplateRepositories) => ({ ...repository, name: repository.name.split('-').slice(1, -1).join('-') })

const groupRepositoriesByFramework = (repositories: GitTemplateRepositories[]) => {
    return repositories
        .map(stripNamePrefixSuffix)
        .reduce((acc, repository) => {
            const nameWithoutTypescript = repository.name.replace('-typescript', '')
            const isTypeScript = repository.name !== nameWithoutTypescript
            const templateKind = nameWithoutTypescript.split('-').at(0) as string

            acc[templateKind] = acc[templateKind] || {}
            acc[templateKind][`${isTypeScript}`] = repository

            return acc
        }, {} as GroupedRepositories)
}

export default class GitFacade {
    private gitClient = new GitClient()

    async retrieveGroupedRepositories() {
        const repositories = await this.gitClient.retrieveRepositories()
        groupRepositoriesByFramework(repositories)
    }
}
import {Octokit, RestEndpointMethodTypes} from '@octokit/rest'

export type GitTemplateRepositories = {
    downloadUrl: string
    name: string
}

const ORGANIZATION_NAME = 'orchy-mfe'

type UserRepositoriesResponse = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0]

const isTemplateRepository = (repository: UserRepositoriesResponse) => repository.name.startsWith('orchy') && repository.name.endsWith('template')

export default class GitClient {
    private octokit: Octokit = new Octokit({auth: process.env.GITHUB_AUTH_TOKEN})

    async retrieveRepositories(): Promise<GitTemplateRepositories[]> {
        const repositoriesList = await this.octokit.rest.repos.listForUser({username: ORGANIZATION_NAME})

        return repositoriesList.data
            .filter(isTemplateRepository)
            .map(repository => ({
                name: repository.name,
                downloadUrl: repository.html_url
            }))
    }


}
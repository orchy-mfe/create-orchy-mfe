import GitClient from "./gitClient"

const main = async () => {
    const gitClient = new GitClient()

    const repositories = await gitClient.retrieveRepositories()

}
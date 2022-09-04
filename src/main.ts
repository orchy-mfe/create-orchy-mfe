import GitFacade from "./gitFacade"

const main = async () => {
    const gitFacade = new GitFacade()

    const groupedRepositories = await gitFacade.retrieveGroupedRepositories()

}

main()
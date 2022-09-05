import chalk from 'chalk'
import GitFacade from "./gitFacade"

const main = async () => {

    console.log(chalk.blue("Retrieving available templates..."));
    

    const groupedRepositories = await new GitFacade().retrieveGroupedRepositories()

}

main()
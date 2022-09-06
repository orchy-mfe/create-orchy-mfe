import chalk from 'chalk'

import argsParser from './argsParser'
import GitFacade from "./gitFacade"

const main = async () => {
    const retrievedArgs = argsParser()
    
    console.log(chalk.blue("Retrieving available templates..."));
    const groupedRepositories = await new GitFacade().retrieveGroupedRepositories()


}

main()
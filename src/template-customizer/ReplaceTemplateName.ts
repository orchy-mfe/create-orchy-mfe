import path from 'path'
import fs from 'fs'

import {Arguments} from '../args/argsParser'
import {GitTemplateRepositories} from '../git/gitClient'

const FILES_TO_REPLACE = [
    'package.json',
    'vite.config.js',
    'vite.config.ts',
]

const replaceTemplateName = async (choises: Required<Arguments>, gitTemplateRepositories: GitTemplateRepositories) => {
    const destinationPath = path.join(choises.directory, choises.name)

    FILES_TO_REPLACE
        .map(file => path.join(destinationPath, file))
        .filter(fs.existsSync)
        .forEach(path => {
            const newFileContent = fs.readFileSync(path).toString().replaceAll(gitTemplateRepositories.name, choises.name)
            fs.writeFileSync(path, newFileContent)
        })
}

export default replaceTemplateName
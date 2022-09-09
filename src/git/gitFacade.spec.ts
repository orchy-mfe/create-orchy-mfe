import { describe, it, vi, expect } from 'vitest'
import fs from 'fs/promises'

import GitClient from './gitClient'
import GitFacade from './gitFacade'
import repositoriesExtracted from '../repositories-extracted.json'
import { Arguments } from '../args/argsParser'

vi.mock('gitly', () => ({
    default: {
        // @ts-ignore
        default: (repositoryToDownload, destinarionPath) => {
            const hasRightParams = destinarionPath === '/a/b' && repositoryToDownload === "https://github.com/orchy-mfe/orchy-react-js-template"
            return hasRightParams ? Promise.resolve(['foo']) : Promise.reject()
        }
    }
}))

describe('gitFacade', () => {
    vi.spyOn(GitClient.prototype, 'retrieveRepositories').mockImplementation(() => Promise.resolve(repositoriesExtracted))

    const gitFacade = new GitFacade()

    describe("retrieveGroupedRepositories", () => {
        it('correctly aggregate git response', async () => {
            const groupedRepositories = await gitFacade.retrieveGroupedRepositories()

            expect(groupedRepositories).toEqual({
                "preact": {
                    "false": "https://github.com/orchy-mfe/orchy-preact-js-template",
                    "true": "https://github.com/orchy-mfe/orchy-preact-js-typescript-template"
                },
                "react": {
                    "false": "https://github.com/orchy-mfe/orchy-react-js-template",
                    "true": "https://github.com/orchy-mfe/orchy-react-js-typescript-template"
                },
                "svelte": {
                    "false": "https://github.com/orchy-mfe/orchy-svelte-template",
                    "true": "https://github.com/orchy-mfe/orchy-svelte-typescript-template"
                },
                "vanilla": {
                    "false": "https://github.com/orchy-mfe/orchy-vanilla-template",
                    "true": "https://github.com/orchy-mfe/orchy-vanilla-typescript-template"
                },
                "vue": {
                    "false": "https://github.com/orchy-mfe/orchy-vue-js-template",
                    "true": "https://github.com/orchy-mfe/orchy-vue-js-typescript-template"
                }
            })
        })
    })

    describe("downloadTemplate", () => {
        const choises: Required<Arguments> = {
            directory: '/a',
            name: 'b',
            template: 'react',
            ts: false
        }

        // @ts-ignore
        vi.spyOn(fs, 'rm').mockImplementation((path: string) => path === 'foo' ? Promise.resolve() : Promise.reject())

        it("correctly downloads template", async () => {
            await expect(gitFacade.downloadTemplate(choises)).resolves.not.toThrow()
        })
    })
})
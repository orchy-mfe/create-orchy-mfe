import {describe, it, vi, expect} from 'vitest'
import fs from 'fs/promises'

import GitClient from './gitClient'
import GitFacade from './gitFacade'
import repositoriesExtracted from '../repositories-extracted.json'
import {Arguments} from '../args/argsParser'

vi.mock('gitly', () => ({
    default: {
        // @ts-ignore
        default: (repositoryToDownload, destinarionPath) => {
            const hasRightParams = destinarionPath === '/a/b' && repositoryToDownload === 'https://github.com/orchy-mfe/orchy-react-js-template'
            return hasRightParams ? Promise.resolve(['foo']) : Promise.reject()
        }
    }
}))

describe('gitFacade', () => {
    vi.spyOn(GitClient.prototype, 'retrieveRepositories').mockImplementation(() => Promise.resolve(repositoriesExtracted))

    const gitFacade = new GitFacade()

    describe('retrieveGroupedRepositories', () => {
        it('correctly aggregate git response', async () => {
            const groupedRepositories = await gitFacade.retrieveGroupedRepositories()

            expect(groupedRepositories).toEqual({
                preact: {
                  false: {
                    name: 'orchy-preact-js-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-preact-js-template',
                    templateName: 'preact-js'
                  },
                  true: {
                    name: 'orchy-preact-js-typescript-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-preact-js-typescript-template',
                    templateName: 'preact-js-typescript'
                  }
                },
                react: {
                  false: {
                    name: 'orchy-react-js-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-react-js-template',
                    templateName: 'react-js'
                  },
                  true: {
                    name: 'orchy-react-js-typescript-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-react-js-typescript-template',
                    templateName: 'react-js-typescript'
                  }
                },
                svelte: {
                  false: {
                    name: 'orchy-svelte-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-svelte-template',
                    templateName: 'svelte'
                  },
                  true: {
                    name: 'orchy-svelte-typescript-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-svelte-typescript-template',
                    templateName: 'svelte-typescript'
                  }
                },
                vanilla: {
                  false: {
                    name: 'orchy-vanilla-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-vanilla-template',
                    templateName: 'vanilla'
                  },
                  true: {
                    name: 'orchy-vanilla-typescript-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-vanilla-typescript-template',
                    templateName: 'vanilla-typescript'
                  }
                },
                vue: {
                  false: {
                    name: 'orchy-vue-js-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-vue-js-template',
                    templateName: 'vue-js'
                  },
                  true: {
                    name: 'orchy-vue-js-typescript-template',
                    downloadUrl: 'https://github.com/orchy-mfe/orchy-vue-js-typescript-template',
                    templateName: 'vue-js-typescript'
                  }
                }
              })
        })
    })

    describe('downloadTemplate', () => {
        const choises: Required<Arguments> = {
            directory: '/a',
            name: 'b',
            template: 'react',
            ts: false
        }

        // @ts-ignore
        vi.spyOn(fs, 'rm').mockImplementation((path: string) => path === 'foo' ? Promise.resolve() : Promise.reject())

        it('correctly downloads template', async () => {
            await expect(gitFacade.downloadTemplate(choises)).resolves.not.toThrow()
        })
    })
})
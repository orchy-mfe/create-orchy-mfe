import {describe, it, vi, expect} from 'vitest'

import GitClient from './gitClient'
import GitFacade from './gitFacade'
import repositoriesExtracted from './repositories-extracted.json'

describe('gitFacade', () => {
    vi.spyOn(GitClient.prototype, 'retrieveRepositories').mockImplementation(() => Promise.resolve(repositoriesExtracted))

    const gitFacade = new GitFacade()

    it('correctly aggregate git response', async () => {
        const groupedRepositories = await gitFacade.retrieveGroupedRepositories()

        expect(groupedRepositories).toEqual({
            "preact": {
                "false": "https://api.github.com/repos/orchy-mfe/orchy-preact-js-template/zipball",
                "true": "https://api.github.com/repos/orchy-mfe/orchy-preact-js-typescript-template/zipball"
            },
            "react": {
                "false": "https://api.github.com/repos/orchy-mfe/orchy-react-js-template/zipball",
                "true": "https://api.github.com/repos/orchy-mfe/orchy-react-js-typescript-template/zipball"
            },
            "svelte": {
                "false": "https://api.github.com/repos/orchy-mfe/orchy-svelte-template/zipball",
                "true": "https://api.github.com/repos/orchy-mfe/orchy-svelte-typescript-template/zipball"
            },
            "vanilla": {
                "false": "https://api.github.com/repos/orchy-mfe/orchy-vanilla-template/zipball",
                "true": "https://api.github.com/repos/orchy-mfe/orchy-vanilla-typescript-template/zipball"
            },
            "vue": {
                "false": "https://api.github.com/repos/orchy-mfe/orchy-vue-js-template/zipball",
                "true": "https://api.github.com/repos/orchy-mfe/orchy-vue-js-typescript-template/zipball"
            }
        })
    })
})
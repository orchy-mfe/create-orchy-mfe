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
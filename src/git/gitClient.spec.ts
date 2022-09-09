import { describe, it, vi, expect } from 'vitest'

import GitClient from './gitClient'
import repositoriesResponse from '../repositories-response.json'
import repositoriesExtracted from '../repositories-extracted.json'

describe('gitClient', () => {
    vi.mock('@octokit/rest', () => ({
        Octokit: vi.fn().mockImplementation(() => ({
            rest: {
                repos: {
                    listForUser: () => Promise.resolve({ data: repositoriesResponse })
                },
            }
        }))
    }))

    const gitClient = new GitClient()

    describe('retrieveRepositories', () => {
        it('should retrieve all repositories', async () => {
            const repositories = await gitClient.retrieveRepositories()

            expect(repositories).toHaveLength(10)

            expect(repositories).toEqual(repositoriesExtracted)
        })
    })
})
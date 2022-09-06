import { describe, it, expect } from 'vitest'
import { Arguments } from './argsParser'
import { GroupedRepositories } from './gitFacade'

import promptsBuilder from './promptsBuilder'

describe('promptsBuilder', () => {
    const groupedRepositories: GroupedRepositories = {
        "react": {
            "true": "https://test.react",
            "false": "https://test.react"
        },
        "vue": {
            "true": "https://test.vue",
            "false": "https://test.vue"
        }
    }

    const retrievePromptsTypes = (parsedArgs: Arguments) => {
        const prompts = promptsBuilder(groupedRepositories, parsedArgs)

        return prompts.map(({type}) => type)
    }

    it('correctly build without args', () => {
        const types = retrievePromptsTypes({})

        expect(types).toMatchObject(['text', 'text', 'select', 'confirm'])
    })

    it('correctly build with only name arg', () => {
        const types = retrievePromptsTypes({name: 'test'})

        expect(types).toMatchObject([null, 'text', 'select', 'confirm'])
    })

    it('correctly build with only directory arg', () => {
        const types = retrievePromptsTypes({directory: 'test'})

        expect(types).toMatchObject(['text', null, 'select', 'confirm'])
    })

    describe('correctly build with only template arg', () => {
        it('with template in list', () => {
            const types = retrievePromptsTypes({template: 'react'})

            expect(types).toMatchObject(['text', 'text', null, 'confirm'])
        })

        it('with template not in list', () => {
            const types = retrievePromptsTypes({template: 'test'})

            expect(types).toMatchObject(['text', 'text', 'select', 'confirm'])
        })
    })

    it('correctly build with only typescript arg', () => {
        const types = retrievePromptsTypes({ts: true})

        expect(types).toMatchObject(['text', 'text', 'select', null])
    })

    it('correctly build with all args', () => {
        const types = retrievePromptsTypes({ts: true, directory: 'd', name: 'n', template: 'react'})

        expect(types).toMatchObject([null, null, null, null])
    })
})
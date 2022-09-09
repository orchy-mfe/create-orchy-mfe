import {PrevCaller} from 'prompts'
import {describe, it, expect} from 'vitest'
import {Arguments} from '../args/argsParser'
import {GroupedRepositories} from '../git/gitFacade'

import promptsBuilder from './promptsBuilder'

describe('promptsBuilder', () => {
    const groupedRepositories: GroupedRepositories = {
        'react': {
            'true': 'https://test.react',
            'false': 'https://test.react'
        },
        'vue': {
            'true': 'https://test.vue',
            'false': 'https://test.vue'
        },
        'jsOnly': {
            'false': 'http://js.only'
        }
    }

    const retrievePromptsTypes = (parsedArgs: Arguments) => {
        const prompts = promptsBuilder(groupedRepositories, parsedArgs)

        return prompts.map(({type}) => type)
    }

    it('correctly handle ts function', () => {
        const types = retrievePromptsTypes({})

        const tsFunction = types.at(-1) as PrevCaller<string>

        // @ts-ignore
        expect(tsFunction('a', {template: 'jsOnly'}, undefined)).toBe(null)
        // @ts-ignore
        expect(tsFunction('a', {template: 'react'}, undefined)).toBe('confirm')
    })

    it('correctly build without args', () => {
        const types = retrievePromptsTypes({})

        expect(types).toMatchObject(['text', 'text', 'select', expect.any(Function)])
    })

    it('correctly build with only name arg', () => {
        const types = retrievePromptsTypes({name: 'test'})

        expect(types).toMatchObject([null, 'text', 'select', expect.any(Function)])
    })

    it('correctly build with only directory arg', () => {
        const types = retrievePromptsTypes({directory: 'test'})

        expect(types).toMatchObject(['text', null, 'select', expect.any(Function)])
    })

    describe('correctly build with only template arg', () => {
        it('with template in list', () => {
            const types = retrievePromptsTypes({template: 'react'})

            expect(types).toMatchObject(['text', 'text', null, expect.any(Function)])
        })

        it('with template not in list', () => {
            const types = retrievePromptsTypes({template: 'test'})

            expect(types).toMatchObject(['text', 'text', 'select', expect.any(Function)])
        })
    })

    it('correctly build with only typescript arg', () => {
        const types = retrievePromptsTypes({ts: true})

        expect(types).toMatchObject(['text', 'text', 'select', expect.any(Function)])

        const tsFunction = types.at(-1) as PrevCaller<string>

        // @ts-ignore
        expect(tsFunction('a', {template: 'jsOnly'}, undefined)).toBe(null)
        // @ts-ignore
        expect(tsFunction('a', {template: 'react'}, undefined)).toBe(null)
    })

    it('correctly build with all args', () => {
        const types = retrievePromptsTypes({ts: true, directory: 'd', name: 'n', template: 'react'})

        expect(types).toMatchObject([null, null, null, expect.any(Function)])
    })
})
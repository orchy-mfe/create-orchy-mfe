import {describe, it, expect} from 'vitest'

import argsParser from './argsParser'


describe('argsParser', () => {
    it('parse correctly without flags', () => {
        process.argv = ['npx', 'create-orchy-mfe']
        const flags = argsParser()

        expect(flags).toEqual({})
    })

    describe('name flag', () => {
        it('parse correctly long flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--name', 'foo']
            const flags = argsParser()
    
            expect(flags).toEqual({name: 'foo', n: 'foo'})
        })
    
        it('parse correctly short flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-n', 'foos']
            const flags = argsParser()
    
            expect(flags).toEqual({name: 'foos', n: 'foos'})
        })
    })

    describe('directory flag', () => {
        it('parse correctly long flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--directory', 'dir']
            const flags = argsParser()
    
            expect(flags).toEqual({directory: 'dir', d: 'dir'})
        })
    
        it('parse correctly short flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-d', 'dirs']
            const flags = argsParser()
    
            expect(flags).toEqual({d: 'dirs', directory: 'dirs'})
        })
    })

    describe('template flag', () => {
        it('parse correctly long flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--template', 'tpl']
            const flags = argsParser()
    
            expect(flags).toEqual({template: 'tpl', t: 'tpl'})
        })
    
        it('parse correctly short flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-t', 'tpls']
            const flags = argsParser()
    
            expect(flags).toEqual({t: 'tpls', template: 'tpls'})
        })
    })

    describe('ts flag', () => {
        it('parse correctly long flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--ts']
            const flags = argsParser()
    
            expect(flags).toEqual({ts: true, T: true})
        })

        it('parse correctly short flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--T']
            const flags = argsParser()
    
            expect(flags).toEqual({ts: true, T: true})
        })
    })

    describe('all flags', () => {
        it('parse correctly long flags', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--ts', '--template', 'tpl', '--directory', 'dir', '--name', 'foo']
            const flags = argsParser()
    
            expect(flags).toEqual({ts: true, T: true, t: 'tpl', template: 'tpl', d: 'dir', directory: 'dir', name: 'foo', n: 'foo'})
        })

        it('parse correctly short flags', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-T', '-t', 'tpl', '-d', 'dir', '-n', 'foo']
            const flags = argsParser()
    
            expect(flags).toEqual({ts: true, T: true, t: 'tpl', template: 'tpl', d: 'dir', directory: 'dir', name: 'foo', n: 'foo'})
        })
    })
})
import {describe, expect, it, vi} from 'vitest'

import argsParser from './argsParser'


describe('argsParser', () => {
    const defaultFlags = {ts: false}

    it('parse correctly without flags', () => {
        process.argv = ['npx', 'create-orchy-mfe']
        const flags = argsParser()

        expect(flags).toEqual(defaultFlags)
    })

    describe('name flag', () => {
        it('parse correctly long flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--name', 'foo']
            const flags = argsParser()

            expect(flags).toEqual({...defaultFlags, name: 'foo'})
        })

        it('parse correctly short flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-n', 'foos']
            const flags = argsParser()

            expect(flags).toEqual({...defaultFlags, name: 'foos'})
        })
    })

    describe('directory flag', () => {
        it('parse correctly long flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--directory', 'dir']
            const flags = argsParser()

            expect(flags).toEqual({...defaultFlags, directory: 'dir'})
        })

        it('parse correctly short flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-d', 'dirs']
            const flags = argsParser()

            expect(flags).toEqual({...defaultFlags, directory: 'dirs'})
        })
    })

    describe('template flag', () => {
        it('parse correctly long flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--template', 'tpl']
            const flags = argsParser()

            expect(flags).toEqual({...defaultFlags, template: 'tpl'})
        })

        it('parse correctly short flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-t', 'tpls']
            const flags = argsParser()

            expect(flags).toEqual({...defaultFlags, template: 'tpls'})
        })
    })

    describe('ts flag', () => {
        describe('parse correctly long flag', () => {
            it('for true value', () => {
                process.argv = ['npx', 'create-orchy-mfe', '--ts']
                const flags = argsParser()

                expect(flags).toEqual({ts: true})
            })

            it('for false value', () => {
                process.argv = ['npx', 'create-orchy-mfe']
                const flags = argsParser()

                expect(flags).toEqual(defaultFlags)
            })
        })

        describe('parse correctly short flag', () => {
            it('for true value', () => {
                process.argv = ['npx', 'create-orchy-mfe', '-T']
                const flags = argsParser()

                expect(flags).toEqual({ts: true})
            })

            it('for false value', () => {
                process.argv = ['npx', 'create-orchy-mfe']
                const flags = argsParser()

                expect(flags).toEqual(defaultFlags)
            })
        })
    })

    describe('all flags', () => {
        it('parse correctly long flags', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--ts', '--template', 'tpl', '--directory', 'dir', '--name', 'foo']
            const flags = argsParser()

            expect(flags).toEqual({ts: true, template: 'tpl', directory: 'dir', name: 'foo'})
        })

        it('parse correctly short flags', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-T', '-t', 'tpl', '-d', 'dir', '-n', 'foo']
            const flags = argsParser()

            expect(flags).toEqual({ts: true, template: 'tpl', directory: 'dir', name: 'foo'})
        })
    })

    describe('version flag', () => {
        it('parse correctly long flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--version']
            process.exit = vi.fn()

            argsParser()

            expect(process.exit).toHaveBeenCalledWith(0)
        })

        it('parse correctly short flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-v']
            process.exit = vi.fn()

            argsParser()

            expect(process.exit).toHaveBeenCalledWith(0)
        })
    })

    describe('help flag', () => {
        it('parse correctly long flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '--help']
            process.exit = vi.fn()

            argsParser()

            expect(process.exit).toHaveBeenCalledWith(0)
        })

        it('parse correctly short flag', () => {
            process.argv = ['npx', 'create-orchy-mfe', '-h']
            process.exit = vi.fn()

            argsParser()

            expect(process.exit).toHaveBeenCalledWith(0)
        })
    })
})
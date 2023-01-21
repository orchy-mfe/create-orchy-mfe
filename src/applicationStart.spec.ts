import fs from 'fs'
import os from 'os'
import path from 'path'
import {describe, expect, it} from 'vitest'

import {applicationStart} from './applicationStart'

describe('all templates are instantiated', () => {
    const supportedTemplates = ['react', 'preact', 'vue', 'svelte', 'vanilla', 'solid', 'angular']
    const withTypeScript = [true, false]
    const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'create-orchy-templates'))

    supportedTemplates.forEach(template => {
        withTypeScript.forEach(withTypeScript => {
            describe(`${template}`, () => {
                it(`short flags, with TypeScript: ${withTypeScript} works`, async() => {
                    const projectName = `${template}-${withTypeScript}`
                    const destinationPath = path.join(temporaryDirectory, projectName)
                    process.argv = [
                        'npx',
                        'create-orchy-mfe',
                        '-n',
                        projectName,
                        '-d',
                        temporaryDirectory,
                        '-t',
                        template,
                        ...withTypeScript ? ['T'] : []
                    ]

                    await applicationStart()

                    expect(fs.existsSync(destinationPath)).toBeTruthy()
                })

                it(`long flags, with TypeScript: ${withTypeScript} works`, async () => {
                    const projectName = `${template}-${withTypeScript}`
                    const destinationPath = path.join(temporaryDirectory, projectName)
                    process.argv = [
                        'npx',
                        'create-orchy-mfe',
                        '--name',
                        projectName,
                        '--directory',
                        temporaryDirectory,
                        '--template',
                        template,
                        ...withTypeScript ? ['--ts'] : []
                    ]

                    await applicationStart()

                    expect(fs.existsSync(destinationPath)).toBeTruthy()
                })
            })
        })
    })
})

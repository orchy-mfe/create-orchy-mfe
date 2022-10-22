import {describe, expect, it} from 'vitest'
import fs from 'fs'
import path from 'path'
import os from 'os'

import {applicationStart} from './applicationStart'

describe('all templates are instantiated', () => {
    const supportedTemplates = ['react', 'preact', 'vue', 'svelte', 'vanilla', 'solid']
    const withTypeScript = [true, false]
    const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'create-orchy-templates'))

    supportedTemplates.forEach(template => {
        withTypeScript.forEach(withTypeScript => {
            describe(`${template}`, () => {
                it(`with TypeScript: ${withTypeScript} works`, async() => {
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
                        '-T',
                        `${withTypeScript}`
                    ]

                    await applicationStart()

                    expect(fs.existsSync(destinationPath)).toBeTruthy()
                })
            })
        })  
    })
})

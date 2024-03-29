Would you like to scaffold a new Micro Frontend, without leaving the CLI?

The tool `create-orchy-mfe` is what you need!

### Usage

There are multiple ways to run it, e.g.:
- installing it, using the command
```bash 
npm install -g create-orchy-mfe
```
- using `npx`, with the command 
```bash
npx create-orchy-mfe
```
- using `npm`, with the command
```bash 
npm create orchy-mfe
```

The following video is an example of what you can get with `create-orchy-mfe` installed and running.

https://user-images.githubusercontent.com/6383527/213863764-009423ed-cadd-45d8-981a-f2846ff337c8.mp4

## Non-interactive template download

If you prefer, `create-orchy-mfe` can also be invoked in a non-interactive way, using the following CLI arguments:

```bash
Options:
    -d, --directory  The directory where your micro-frontend will be located
    -h, --help       Output usage information
    -n, --name       The name of your new micro-frontend
    -t, --template   The template that will be used generate your micro-frontend
    -T, --ts         Use the TypeScript variant of the template
    -v, --version    Output the version number
```

## Troubleshooting

### Rate limit
If you get an error about GitHub's rate limit, you should define the `GITHUB_AUTH_TOKEN` environment variable, which will be used to access the GitHub APIs' using the `octokit` client.
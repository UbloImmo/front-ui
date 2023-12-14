# @ubloimmo/front-lib-boilerplate

Template repository to create Internal library and private NPM package.

## Prerequisites
- [Bun](https://bun.sh)

## Includes

### Github actions
This template comes with two pre-configured github workflows to your life easier:

- publish.yml :
  - Increments the package revision
  - Builds the package using the `bun run build`
  - Publishes it to the NPM Registry
  - Commits the build and new version to `main`
  - Triggers a release
- release.yml :
  - Bundles the build directory (`/lib`) in a zip file based on the current version
  - Authors a new github release

### Typescript

Bun comes with typescript support out of the box.

Some basic utility types are also included.

### Utils

- Config validator
- Logger

## Getting started

1. Fork this repository or select it as a starting template when creating a new repository.


2. Go to your new repository's secrets settings and add the following values.

- `NPM_TOKEN`: Personal access token generated in your [account settings](https://docs.npmjs.com/creating-and-viewing-access-tokens).

3. Clone and navigate to your new repository.

```bash
git clone <my repository>
cd <my repository name>  
```

4. Edit `package.json` with your package information.

```bash
# nano
nano package.json
# neovim
nvim package.json
# vscode
code package.json
# webstorm
webstorm package.json
```
- `name`: your package's name
- `description`: your package description
- `author`: your name and npm email
- `homepage`: your repository's URL
- `repository.url`: your repository's URL
- `scripts.build`: a script to build your package before publishing it

5. **Start writing your package !** :rocket:

## Publishing your package

### Before publishing your package

Make sure to replace this README.md file with documentation about your package.

### Triggering the publishing workflow

Once you're satisfied with the current state of your package and have committed it to / merged it onto the `main` branch, you'll want to publish it.

To publish your package to the NPM registry:
1. Navigate to the *Actions* tab of your repository
2. Select `NPM Publish` in the side menu
3. Click on `Run workflow` in the dark blue banner
4. Wait for it to finish

**Note**: Upon successful publishing to NPM, the `Relase create` workflow will automatically run.
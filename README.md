# Next.js Modern Template

This is a [Next.js](https://nextjs.org/) project template set up with TypeScript, ESLint, StyleLint,
SASS/SCSS, and Prettier developed by ACM UCSD.

We have found this combination of tools to provide a high-quality developer experience to write
clean code quickly and easily in a modular

## Upgrading to the Latest Versions

If you are using this repo as a template for your project, here are a couple things you should do
before you begin.

- Install the latest release of Next.js and update the version in your `package.json`.
- Install the latest version of `node` and update the details to match in your `package.json` and
  `.nvmrc`. If you use `nvm`, run `nvm use` to quickly switch to the correct version.

## Installation

- Confirm your node version matches the one listed in your `.nvmrc` file (v18.15.0 when last
  updated). You may check with `node -v`.
- Confirm your yarn version matches the package manager listed in your `package.json` file (v1.22.19
  when last updated). You may check with `yarn -v`.
- Run `yarn` or `yarn install` to add all `node_modules` required for this project.
- Install the recommended extensions for the project listed in `.vscode/extensions.json`. You may be
  prompted to install them when you open VSCode in the bottom left. Some of them are optional, but
  we highly recommend the ESLint, Prettier, and StyleLint extensions for code highlighting of errors
  and automatic formatting.
- Run `yarn upgrade` to get all dependencies upgraded to their latest versions.

If you require any sensitive variables in your project, create two files called `.env.development`
and `.env.production` which Next.js will pull from for environment variables natively in `dev` and
`build` mode respectively.

Run `yarn dev` to start the development server locally. Run `yarn prod` to start a production-ready
bundled version of the project locally.

Once running, if there are no errors displaying in your command line terminal, the local deployment
should be visible at `localhost:3000`. If you cannot view your project here, ensure that you have no
other running processes on the port and have entered the start script correctly.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.

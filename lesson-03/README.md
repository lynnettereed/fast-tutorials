# Lesson 03 - Working with Fluent for Web

This tutorial explores how to import Fluent for Web components and styles (packages are private for Microsoft employees only, though becoming open source soon).

* Import Fluent for Web components private NPM package
* Import Fluent for Web styles private NPM package
  * Configure the Sass compiler
  * Create package script to run the compiler
  * Hook the compiler into Webpack
  * Watch the Sass/CSS folder for changes

## Install Pre-requisites to access private packages
For Microsoft employees only. Will become open source soon for everyone to access.

### Install and configure NPM
Configure feed authentication so the application can call into private dependencies.

1. Click on [Connect to feed](https://fluentweb.visualstudio.com/Fluent%20Web/_packaging?feed=ms.fw&_a=feed) to launch into a dialog containing more detailed instructions.
2. Select `npm` on the left navigation.
3. Create or edit the .npmrc file using Git Bash in the home folder

    ```bash
    $ vi ~/.npmrc
    ```
4. Add registry information into the .npmrc. This step can be skipped if the source repository already includes an .npmrc file with the registry information. If you run into problems, try to remove the `always-auth=true` to follow. The package registry is a private feed and should always be [scoped](<https://docs.npmjs.com/misc/scope>), our packages scope is `@ms-fw`.

    ```ini
    @ms-fw:registry=https://fluentweb.pkgs.visualstudio.com/_packaging/ms.fw/npm/registry/
    always-auth=true
    ```
5. Add credentials to your user `.npmrc` file manually by clicking on the "Generate npm credentials" link and copying the contents revealed in the text area directly into the file.

## Installing application dependencies
Ensure you're inside the /lesson-03 directory and install pre-requisites node packages.

```bash
$ npm i
```

## Working in local development environment
Leverage Webpack capability to build web application and run locally while making web application changes.

Build, and startup webpack server as development (<http://localhost:1500>).

```bash
$ npm run serve-dev
```

**Caution:**
Running production `npm run serve-pro` will fail the first time. This is a dependency bug on the Sass Compiler. Re-run it and it will succeed on the second time and publish the expected files under `/build/public/`.

Build and compile for production. This will generate files into `./build/public` that can then be deployed into production.

```bash
$ npm run serve-pro
```

## Troubleshooting
When running production for the first time there may be errors. This happens because the Fluent Web styles are required as imports in the `jsx` file, however, until the compiler runs the files do not yet exist. The workaround for this is to ensure sass is compiled before running Webpack server.

The solution, is to `npm run sass` before Webpack as shown in `package.json`.

```json
 "scripts": {
    "serve-pro": "npm run sass && cross-env NODE_ENV=production webpack --config ./build/webpack/webpack.config.js --progress",
    "serve-dev": "npm run sass && cross-env NODE_ENV=development node_modules/.bin/webpack-dev-server --config ./build/webpack/webpack.config.js --progress",
    "sass": "cross-env NODE_ENV=development node ./build/scripts/sass.js --watch"
  },
```

Errors if the solution above is not properly implemented.

```J
ERROR in ./app/index.jsx
Module not found: Error: Can't resolve '../build/public/assets/styles/css/fw-west-european-default-orange.css' in '/Users/jdoe/Microsoft/Projects/FluentWeb/fast-tutorials/lesson-04/app'
 @ ./app/index.jsx 12:15-95
```

```J
ERROR in ./node_modules/css-loader!./node_modules/postcss-loader/lib!./build/public/assets/styles/css/fw-west-european-default-orange.css
Module not found: Error: Can't resolve '../fonts/FWMDL2.svg' in '/Users/jdoe/Microsoft/Projects/FluentWeb/fast-tutorials/lesson-04/build/public/assets/styles/css'
    @ ./node_modules/css-loader!./node_modules/postcss-loader/lib!./build/public/assets/styles/css/fw-west-european-default-orange.css 7:1155-1185

ERROR in ./node_modules/css-loader!./node_modules/postcss-loader/lib!./build/public/assets/styles/css/fw-west-european-default-orange.css
Module not found: Error: Can't resolve '../fonts/FWMDL2.ttf' in '/Users/jdoe/Microsoft/Projects/FluentWeb/fast-tutorials/lesson-04/build/public/assets/styles/css'
    @ ./node_modules/css-loader!./node_modules/postcss-loader/lib!./build/public/assets/styles/css/fw-west-european-default-orange.css 7:1081-1111

ERROR in ./node_modules/css-loader!./node_modules/postcss-loader/lib!./build/public/assets/styles/css/fw-west-european-default-orange.css
Module not found: Error: Can't resolve '../fonts/FWMDL2.woff' in '/Users/jdoe/Microsoft/Projects/FluentWeb/fast-tutorials/lesson-04/build/public/assets/styles/css'
    @ ./node_modules/css-loader!./node_modules/postcss-loader/lib!./build/public/assets/styles/css/fw-west-european-default-orange.css 7:1010-1041
```
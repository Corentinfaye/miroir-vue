# miroir-vue

Client Vue pour consulter les notices et éditions du projet [Miroir des classiques](https://github.com/chartes/miroir), via le endpoint DTS de l’ENC.

**Master dependencies**:

[![Node](https://img.shields.io/badge/node-15.14_to_22.9-blue?style=for-the-badge&logo=Node.js)](https://nodejs.org)

[![package - vue](https://img.shields.io/github/package-json/dependency-version/chartes/miroir-vue/vue/master?logo=vue.js&logoColor=white)](https://www.npmjs.com/package/vue)
[![package - vite](https://img.shields.io/github/package-json/dependency-version/chartes/miroir-vue/dev/vite/master?logo=vite&logoColor=white)](https://www.npmjs.com/package/vite)
[![package - eslint](https://img.shields.io/github/package-json/dependency-version/chartes/miroir-vue/dev/eslint/master?logo=eslint&logoColor=white)](https://www.npmjs.com/package/eslint)


[![package - Bulma](https://img.shields.io/github/package-json/dependency-version/chartes/miroir-vue/bulma/master?logo=bulma&logoColor=white)](https://www.npmjs.com/package/bulma)
[![package - Mirador](https://img.shields.io/github/package-json/dependency-version/chartes/miroir-vue/mirador/master)](https://www.npmjs.com/package/mirador)


## Project setup
### Clone the GitHub repository:
in a local folder dedicated to the project
  ```bash
  git clone https://github.com/chartes/miroir-vue.git
  ```

From the app folder (`cd path/to/miroir-vue`)
### Install
```
yarn
```

### Compiles and hot-reloads for development

For a local development server, reads `.env.development` variables:

```
yarn serve
```

### Compiles and minifies for staging

For a staging server (preproduction), reads `.env.staging` variables:

```
yarn build:staging
```

### Compiles and minifies for production

For a production server, reads `.env.production` variables:

```
yarn build:prod
```

### Run preview server

After a `yarn build:prod` or `yarn build:staging` you can run a server to serve the produced `dist` folder with:

```
yarn preview
```

for production or

```
yarn preview --mode=staging
```

for staging.


### Lints and fixes files
```
yarn lint
```
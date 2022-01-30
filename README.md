# [Web] Named
[![react](https://img.shields.io/badge/reactjs-17.0.2-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![styled-components](https://img.shields.io/badge/styled_components-5.3.3-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-8.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-27.4.7-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/name-generator?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/name-generator)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/DiegoVictor/name-generator/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Generates names based on preseted datasets (list of example names), but you can upload a custom dataset (it must have at least 23 names). Was utilized the Markov Chain algorithm to generate the names, a custom script was created based on this article: [Generating Startup names with Markov Chains](https://towardsdatascience.com/generating-startup-names-with-markov-chains-2a33030a4ac0).


## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [Configuring](#configuring)
    * [.env](#env)
    * [API](#api)
* [Usage](#usage)
* [Running the tests](#running-the-tests)
  * [Coverage Report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/named-web/main/screenshots/demo.gif" width="100%"/>


# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
Configure your environment variables and remember to start the [API](https://github.com/DiegoVictor/named-api) before to start this app.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
REACT_APP_API_BASE_URL|API's base url.|`http://localhost:8080`

### API
Start the [API](https://github.com/DiegoVictor/named-api) (see its README for more information). In case of any change in the API's `port` or `host` remember to update the [`.env`](#env) too.


# Usage
To start the app run:
```
$ yarn start
```
Or:
```
npm run start
```

# Running the tests
[Jest](https://jestjs.io) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.

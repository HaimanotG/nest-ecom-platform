<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Module Creation Script Usage

First, make the script executable:
```bash
chmod +x create-module.sh
```

### Creating Modules for Different Apps
1. Create a user module in the users app:
```bash
./create-module.sh users auth
./create-module.sh users profile
```

2. Create inventory-related modules:
```bash
./create-module.sh inventory products
./create-module.sh inventory categories
./create-module.sh inventory stock
 ```

3. Create order-related modules:
```bash
./create-module.sh orders cart
./create-module.sh orders checkout
./create-module.sh orders shipping
 ```

 4. Create payment-related modules:
```bash
./create-module.sh payment transactions
./create-module.sh payment refunds
```

 5. Create gateway modules:
```bash
./create-module.sh gateway proxy
./create-module.sh gateway rate-limit
```

### Generated Files
Each module comes with:

- Basic module configuration
- Controller template
- Service template
- Entity definition
- DTOs (Create, Update, Response)
- Repository interface and implementation
- Index files for easy imports

### Module Structure Generated
Each module will be created with the following structure:

📁 module-name/
├── 📁 domain/
│   ├── 📁 aggregates/
│   ├── 📁 entities/
│   ├── 📁 value-objects/
│   ├── 📁 repositories/
│   ├── 📁 constants/
│   ├── 📁 exceptions/
│   ├── 📁 factories/
│   └── 📁 policies/
├── 📁 application/
│   ├── 📁 commands/
│   ├── 📁 queries/
│   ├── 📁 events/
│   └── 📁 subscribers/
├── 📁 infrastructure/
│   ├── 📁 repositories/
│   └── 📁 persistence/
└── 📁 interfaces/
    ├── 📁 controllers/
    ├── 📁 dto/
    ├── 📁 facades/
    └── 📁 validators/


## Commit Message Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages:

### Commit Types
- feat : New feature
- fix : Bug fix
- docs : Documentation only changes
- style : Changes that do not affect the meaning of the code (white-space, formatting, etc)
- refactor : Code change that neither fixes a bug nor adds a feature
- perf : Code change that improves performance
- test : Adding missing tests or correcting existing tests
- build : Changes that affect the build system or external dependencies
- ci : Changes to our CI configuration files and scripts
- chore : Other changes that don't modify src or test files
- revert : Reverts a previous commit
### Rules
- Type is mandatory and must be lowercase
- Subject is mandatory and must be sentence-case
- Body is optional and must not exceed 100 characters per line
- A blank line is required between the subject and body

### Examples
feat: Add user authentication
fix(auth): Fix token validation
docs: Update API documentation
refactor(api): Simplify error handling
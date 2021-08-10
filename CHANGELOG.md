# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.0.3
### Added
- `resolveCorrelationId` additionally checks if http request status is 409

## 2.0.2
### Fixed
- `resolveByResponseErrors` handled `{ errors: null }` case
- `resolveHttpErrorMessage` now for `500` instead of `error_description` it returns a default translated message
### Added
- `resolveErrorResponseDescription` a function to resolve error description, for `500` returns null

## 2.0.1
### Fixed
- `resolveCorrelationId` additionally checks if error is network error and if yes it returns null

## 2.0.0
### Changed
- `resolveErrorMessage` from now returns instance of `ErrorMessage` that contains primary error message and secondary
  messages.
- lib exports `ErrorMessage` class

## 1.1.0
### Added
- `npm run build:umd` - compiles `src` folder with webpack to build `umd` format module
- `npm run build:es` - compiles `src` folder with babel to build `ES2015` format module
### Changed
- `rxjs-marbles` package moved to devDependencies
- `rxjs` updated to ^6.4.0
- several devDependencies updated
- some changes of the dev env

## 1.0.1
### Changed
- supports both versions of `i18next`(^15.0.5 and ^19.0.0)

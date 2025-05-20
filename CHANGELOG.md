## 2.0.1 (2025-05-20)

### 🩹 Fixes

- mark current_page as required ([#22](https://github.com/igusdev/akeneo-client/pull/22))

### ❤️ Thank You

- Hendrik Loewe @CakeWithDivinity

# 2.0.0 (2025-04-24)

### 🚀 Features

- ⚠️  make axios peer dependency ([#21](https://github.com/igusdev/akeneo-client/pull/21))

### ⚠️  Breaking Changes

- ⚠️  make axios peer dependency ([#21](https://github.com/igusdev/akeneo-client/pull/21))

### ❤️ Thank You

- Michał Mrozek

## 1.1.1 (2025-01-20)

### 🩹 Fixes

- properly reference types ([4237cfd](https://github.com/igusdev/akeneo-client/commit/4237cfd))

### ❤️ Thank You

- Michał Mrozek

## 1.1.0 (2024-12-04)

### 🚀 Features

- support legacy pagination_type "page" to circumvent seemingly infinite loop ([58d5cd9](https://github.com/igusdev/akeneo-client/commit/58d5cd9))
- expose `uuid` field for products ([#9](https://github.com/igusdev/akeneo-client/pull/9))
- add product UUID endpoint ([#17](https://github.com/igusdev/akeneo-client/pull/17))

### 🩹 Fixes

- typo in types `Product` and `ProductModel` ([#10](https://github.com/igusdev/akeneo-client/pull/10))
- use correct params for category.getAll() ([#18](https://github.com/igusdev/akeneo-client/pull/18))

### ❤️ Thank You

- Dennis Weisenseel @Osmil
- Georg v. Jeetze @gvonjeetze
- Waldemar Heinze @wheinze

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.12] - 2024-01-09

### Changed

- ensure we can still filter when calling all by search after

## [1.0.4] - 2021-08-10

### Changed

- fixed inconsistency in README with parameter naming
- remove trailing slash on url parameter on client creation

## [1.0.3] - 2021-03-18

### Changed

- getting attributes was not correctly getting all options

## [1.0.2] - 2021-03-08

### Changed

- getting all assets was not correctly getting the next page

## [1.0.1] - 2021-03-05

### Breaking changes

- renamed `referenceEntitiesMediaFiles` to `referenceEntitiesMediaFile` in the AkeneoClientAPI

  ```diff
  -referenceEntitiesMediaFiles
  +referenceEntitiesMediaFile
  ```

### Changed

- Banner in README
- Typo in README

## [1.0.0] - 2021-03-03

### Added

Initial version

# Akeneo API

This is an unofficial Node client for the Akeneo PIM REST API.

More info at [Akeneo REST API reference](https://api.akeneo.com/api-reference-index.html)

Note: not all endpoints are implements. Mostly only the GET are available. YMMV

## 🔥 Features

- Easy typed access to your Akeneo environment via Typescript
- Built in token handling
- Helper function to get all products or product models easily

## ⚒️ Requirements

- node.js ([LTS](https://nodejs.org/en/about/releases/))

## 🧙 Installation

Using npm:

```sh
npm install @igusdev/akeneo-client
```

Using yarn:

```sh
yarn add @igusdev/akeneo-client
```

## ⚙️ Configuration

### Authentication

Follow the instructions for your Akeneo version to get the required parameters:

- clientId/secret: [client-idsecret-generation](https://api.akeneo.com/documentation/authentication.html#client-idsecret-generation)
- username/password: [api-user-creation](https://api.akeneo.com/documentation/authentication.html#api-user-creation)

### Your first request

With es6 imports

```js
import client from '@igusdev/akeneo-client';

const akeneo = client({
  url,
  username,
  password,
  clientId,
  secret,
  // Optionally you can also pass in axiosOptions which will be passed to the Axios instance
});

console.log(await akeneo.productModel.getAll({}));
```

## 📝 Changelog

You can check the changelog on the [releases](https://github.com/igusdev/akeneo-client/releases) page.

## 🤝 Support

If you have a problem with this library, please file an [issue](https://github.com/igusdev/akeneo-api/issues/new) here on GitHub.

If you have other problems with Akeneo not related to this library, you can contact their [Customer Support](https://www.akeneo.com/support/).

## 💙 Thanks to

- [The entire Craftzing team that this repo is forked from](https://craftzing.com)
- [All current and future contributors](https://github.com/igusdev/akeneo-client/graphs/contributors)

## 🔑 License

The MIT License (MIT). Please see [License File](/LICENSE) for more information.

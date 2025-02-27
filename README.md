# vite-plugin-zopfli

Use `zopfli` to compress resources.

Zopfli is a data compression library that performs Deflate, gzip and zlib data encoding. It achieves higher compression ratios than mainstream Deflate and zlib implementations.

Currently, only gzip is supported.

## Install

```bash
$ bun i vite-plugin-zopfli -D

# or

$ yarn add vite-plugin-zopfli -D

# or

$ npm install vite-plugin-zopfli -D
```

## Usage

```js
import { defineConfig } from 'vite'

import { ViteZopfliCompressor } from 'vite-plugin-zopfli'

export default defineConfig({
  plugins: [
    // ...your plugins
    ViteZopfliCompressor()
  ]
})
```

## Options

| params                 | type                                          | default                                                      | description                                                                                |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `compressionOptions`   | `Zopfli.Options`                          | `{}`                                                         | Compression options for `Zopfli`(for details check `node-zopfli` module)                             |
| `deleteOriginalAssets` | `boolean`                                     | `false`                                                      | Whether to delete the original assets or not                                               |


## Inspiration

[vite-plugin-compress](https://github.com/alloc/vite-plugin-compress)

### LICENSE

[MIT](./LICENSE.md)

### Author

[Daniil Mira](https://github.com/ZAZPRO)
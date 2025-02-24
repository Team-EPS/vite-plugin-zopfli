import type { Plugin } from 'vite';
import zopfli from 'node-zopfli';
import path from 'node:path';
import Zopfli from 'node-zopfli';
import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';

interface Options {
  deleteOriginalAssets?: boolean,
  compressionOptions?: Zopfli.Options,
}

function ViteZopfliCompressor(options: Options = { deleteOriginalAssets: false, compressionOptions: { numiterations: 15, verbose: false } }): Plugin {
  let outDir: string;

  const compressFiles = () => {
    const deleteOriginalAssets = options.deleteOriginalAssets ?? false;
    const compressionOptions = options.compressionOptions ?? { numiterations: 15, verbose: false };
    let files: Array<string> = [];

    const dirents = readdirSync(outDir, { recursive: true, withFileTypes: true });
    for (const dirent of dirents) {
      if (dirent.isDirectory()) {
        continue;
      }

      const file_path = path.resolve(dirent.parentPath, dirent.name);

      const file_binary: Buffer = readFileSync(file_path);
      const zipped = zopfli.gzipSync(file_binary, compressionOptions);

      writeFileSync(`${file_path}.gz`, zipped);
      files.push(file_path);
      console.log(`${dirent.name} compressed!`);
    }

    if (deleteOriginalAssets !== true) {
      return;
    }

    for (const file of files) {
      unlinkSync(file);
    }
  }

  return {
    name: "vite-plugin-zopfli",
    apply: "build",
    enforce: "post",
    configResolved(_conf) {
      outDir = _conf.build.outDir;
    },
    closeBundle() { compressFiles() }
  }
}

export { ViteZopfliCompressor };

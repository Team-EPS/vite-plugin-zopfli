import type { Plugin } from 'vite';
import { readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import zopfli from 'node-zopfli';
import path from 'node:path';
import Zopfli from 'node-zopfli';

interface Options {
  deleteOriginalAssets: boolean,
  compressionOptions?: Zopfli.Options,
}

export default function ViteZopfliCompressor(options: Options): Plugin {
  let outDir: string;

  const compressFiles = async () => {
    const compressionOptions = options.compressionOptions ?? {numiterations: 15, verbose: false};
    let files: Array<string> = [];

    const dirents = await readdir(outDir, { recursive: true, withFileTypes: true });
    for (const dirent of dirents) {
      if (dirent.isDirectory()) {
        continue;
      }

      const file_path = path.resolve(dirent.parentPath, dirent.name);
      files.push(file_path);

      const file_binary: Buffer = await readFile(file_path);
      zopfli.gzip(file_binary, compressionOptions, async (err, gziped) => {
        if (err !== undefined && err !== null) {
          console.error(err);
        }

        await writeFile(path.resolve(dirent.parentPath, `${dirent.name}.gz`), gziped);
        console.log(`${dirent.name} compressed!`);
      });
    }

    if (options.deleteOriginalAssets !== true) {
     return; 
    }

    for (const file of files) {
      console.log(file);
      unlink(file);
    }
  }

  return {
    name: "vite-plugin-zopfli",
    enforce: "post",
    apply: "build",
    configResolved(_conf) {
      outDir = _conf.build.outDir;
    },
    closeBundle: {
      sequential: true,
      order: "post",
      handler: compressFiles
    }
  }
}

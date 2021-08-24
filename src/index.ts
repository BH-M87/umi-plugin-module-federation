// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default function(api: IApi) {
  api.onGenerateFiles(() => {
    const path =
      api.env === 'production'
        ? './src/.umi-production/umi.ts'
        : './src/.umi/umi.ts';
    const buffer = readFileSync(resolve(path));
    const c = String(buffer);
    api.writeTmpFile({
      path: 'bootstrap.ts',
      content: c,
    });
    api.writeTmpFile({
      path: 'umi.ts',
      content: 'import("./bootstrap")',
    });
  });
}

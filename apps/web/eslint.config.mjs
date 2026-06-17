import { react, ignores } from 'eslint-config-custom';
import next from '@next/eslint-plugin-next';

export default [
  { ignores },
  ...react,
  {
    plugins: { '@next/next': next },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];

import { base, ignores } from 'eslint-config-custom';
import globals from 'globals';

export default [
  { ignores },
  ...base,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
    },
  },
];

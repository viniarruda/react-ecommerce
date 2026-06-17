# Dependency Updates - December 2025

This document tracks major dependency updates and potential breaking changes.

## Recent Updates

### 1. Apollo Server (v4 → v5)

**Updated Packages:**
- `@apollo/server`: `^4.9.0` → `^5.0.0`
- `@nestjs/graphql`: `^12.0.0` → `^13.0.0`
- `@nestjs/apollo`: Added `^13.0.0` (was missing)

**Breaking Changes:**
Apollo Server v5 is a major version with some breaking changes. The main changes are:
- Improved TypeScript types
- Better error handling
- Plugin API updates

**Action Required:**
- Test GraphQL endpoints thoroughly
- Check if any custom Apollo plugins need updates
- Review the [Apollo Server v5 migration guide](https://www.apollographql.com/docs/apollo-server/migration)

**Status:** ✅ Updated, needs testing

---

### 2. ESLint (v7/v8 → v9)

**Updated Packages:**
- `eslint`: `^7.x`/`^8.x` → `^9.0.0` (all packages)
- `@typescript-eslint/eslint-plugin`: `^6.0.0` → `^8.0.0`
- `@typescript-eslint/parser`: `^6.0.0` → `^8.0.0`
- `eslint-config-next`: `13.0.0` → `^15.0.0`
- `eslint-config-prettier`: `^8.3.0` → `^9.0.0`
- `eslint-plugin-react`: `7.31.8` → `^7.37.0`

**Breaking Changes:**
ESLint v9 introduces the new **flat config** format (`eslint.config.js`) instead of `.eslintrc.js`.

**Action Required:**
1. **Migration to Flat Config (Recommended)**
   - Create `eslint.config.js` in each package
   - Migrate rules from `.eslintrc.js` to flat config format
   - See [ESLint v9 migration guide](https://eslint.org/docs/latest/use/configure/migration-guide)

2. **Or Use Compatibility Mode (Temporary)**
   - Set `ESLINT_USE_FLAT_CONFIG=false` environment variable
   - This allows using old `.eslintrc.js` files
   - Not recommended for long term

**Example Flat Config:**
```javascript
// eslint.config.js
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // your rules
    },
  },
];
```

**Status:** ⚠️ Updated, flat config migration pending

---

### 3. Supertest (v6 → v7)

**Updated Packages:**
- `supertest`: `^6.3.0` → `^7.1.3`

**Breaking Changes:**
- Updated to use `fetch` API under the hood
- Better ESM support
- Improved TypeScript types

**Action Required:**
- Review e2e tests in `apps/server/test/`
- Update test assertions if needed
- Check [Supertest v7 release notes](https://github.com/forwardemail/supertest/releases/tag/v7.1.3)

**Status:** ✅ Updated, needs testing

---

## Migration Checklist

- [ ] Run `pnpm install` to update all dependencies
- [ ] Test GraphQL endpoints (`pnpm --filter @react-shop/api dev`)
- [ ] Run e2e tests (`pnpm --filter @react-shop/api test:e2e`)
- [ ] Fix any ESLint errors (`pnpm lint`)
- [ ] Consider migrating to ESLint flat config (optional)
- [ ] Update CI/CD if it uses `.eslintrc.js`

## Quick Fixes

### If ESLint v9 causes issues:

**Option 1: Use compatibility mode**
```bash
# Add to package.json scripts
"lint": "ESLINT_USE_FLAT_CONFIG=false eslint ..."
```

**Option 2: Downgrade temporarily**
```bash
# Revert to ESLint 8 if needed
pnpm add -D eslint@^8.57.1
```

### If Apollo Server v5 causes issues:

Check `apps/server/src/app.module.ts` for GraphQL configuration and ensure it's compatible with v13 of `@nestjs/graphql`.

## Resources

- [Apollo Server v5 Migration](https://www.apollographql.com/docs/apollo-server/migration)
- [ESLint v9 Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [NestJS GraphQL v13 Release](https://github.com/nestjs/graphql/releases)
- [Supertest v7 Release Notes](https://github.com/forwardemail/supertest/releases/tag/v7.1.3)

## Next Steps

1. After testing, remove this file or move to `docs/migrations/`
2. Update `.cursorrules` if ESLint config changes
3. Document any issues or workarounds found during testing


import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Linter } from 'eslint';
import recommended from '../recommended.js';
import react from '../react.js';

// The config's value is behavioural: does it flag what it claims? These fixtures
// cross the same interface a consumer does — the exported flat-config array — and
// assert the rule-ids ESLint emits. Scope is the opinionated choices (rules this
// config sets beyond upstream defaults) and the fragile base/TS-aware pairings,
// where a silent regression is both most likely and most invisible. Upstream
// plugin defaults are not re-tested here.

const combined = [...recommended, ...react];
const linter = new Linter({ configType: 'flat' });

// Fixtures carry incidental violations (eol-last, no-unused-vars, ...), so we
// assert the target rule-id is *present* among the messages, not that it is the
// only one. `silent` asserts a rule-id is absent — used for opinionated disables
// and the base rules superseded by their TS-aware equivalents.
function ruleIds(config, code, filename) {
  return new Set(linter.verify(code, config, { filename }).map((m) => m.ruleId));
}

const fixtures = [
  // TypeScript rules
  {
    name: 'array-type prefers generic over T[]',
    config: recommended, filename: 'a.ts',
    code: 'const x: number[] = [];\n',
    fires: ['@typescript-eslint/array-type'],
  },
  {
    name: 'no-explicit-any is disabled',
    config: recommended, filename: 'a.ts',
    code: 'const x: any = 1;\nconsole.log(x);\n',
    silent: ['@typescript-eslint/no-explicit-any'],
  },

  // Base/TS-aware pairings: the TS variant fires, the base rule stays off
  {
    name: 'no-shadow: TS variant on, base off',
    config: recommended, filename: 'a.ts',
    code: 'const a = 1;\nfunction f() { const a = 2; return a; }\nf();\n',
    fires: ['@typescript-eslint/no-shadow'],
    silent: ['no-shadow'],
  },
  {
    name: 'no-use-before-define: TS variant on, base off',
    config: recommended, filename: 'a.ts',
    code: 'f();\nfunction f() {}\n',
    fires: ['@typescript-eslint/no-use-before-define'],
    silent: ['no-use-before-define'],
  },

  // Best-practice rules
  {
    name: 'eqeqeq (smart) flags == against a literal',
    config: recommended, filename: 'a.ts',
    code: 'const a = 1;\nif (a == 1) { console.log(a); }\n',
    fires: ['eqeqeq'],
  },
  {
    name: 'eqeqeq (smart) allows == null',
    config: recommended, filename: 'a.ts',
    code: 'const a = 1;\nif (a == null) { console.log(a); }\n',
    silent: ['eqeqeq'],
  },
  {
    name: 'func-style flags function expressions',
    config: recommended, filename: 'a.ts',
    code: 'const f = function () { return 1; };\nconsole.log(f);\n',
    fires: ['func-style'],
  },
  {
    name: 'no-nested-ternary is an error',
    config: recommended, filename: 'a.ts',
    code: 'const a = 1;\nconst b = a ? (a ? 1 : 2) : 3;\nconsole.log(b);\n',
    fires: ['no-nested-ternary'],
  },
  {
    name: 'no-object-constructor flags new Object()',
    config: recommended, filename: 'a.ts',
    code: 'const o = new Object();\nconsole.log(o);\n',
    fires: ['no-object-constructor'],
  },

  // ES6+ rules
  {
    name: 'no-var flags var',
    config: recommended, filename: 'a.ts',
    code: 'var x = 1;\nconsole.log(x);\n',
    fires: ['no-var'],
  },
  {
    name: 'prefer-const flags reassign-free let',
    config: recommended, filename: 'a.ts',
    code: 'let x = 1;\nconsole.log(x);\n',
    fires: ['prefer-const'],
  },
  {
    name: 'prefer-template flags string concatenation',
    config: recommended, filename: 'a.ts',
    code: 'const a = 1;\nconst b = "x" + a;\nconsole.log(b);\n',
    fires: ['prefer-template'],
  },
  {
    name: 'prefer-destructuring fires on objects',
    config: recommended, filename: 'a.ts',
    code: 'const o = { x: 1 };\nconst x = o.x;\nconsole.log(x);\n',
    fires: ['prefer-destructuring'],
  },
  {
    name: 'prefer-destructuring is silent on arrays',
    config: recommended, filename: 'a.ts',
    code: 'const arr = [1];\nconst a = arr[0];\nconsole.log(a);\n',
    silent: ['prefer-destructuring'],
  },

  // Formatting (via @stylistic)
  {
    name: 'quotes prefers single',
    config: recommended, filename: 'a.ts',
    code: 'const x = "hi";\nconsole.log(x);\n',
    fires: ['@stylistic/quotes'],
  },
  {
    name: 'indent enforces 2 spaces',
    config: recommended, filename: 'a.ts',
    code: 'function f() {\n    return 1;\n}\nf();\n',
    fires: ['@stylistic/indent'],
  },
  {
    name: 'semi requires semicolons',
    config: recommended, filename: 'a.ts',
    code: 'const x = 1\nconsole.log(x)\n',
    fires: ['@stylistic/semi'],
  },

  // import namespace remap: import-x is re-registered under the `import`
  // namespace, so import/* rules must still be reachable. Canary for the
  // asImportNamespace helper.
  {
    name: 'import/* rules reachable after namespace remap',
    config: recommended, filename: 'a.ts',
    code: 'import x from "a";\nimport x from "a";\nconsole.log(x);\n',
    fires: ['import/no-duplicates'],
  },

  // React layer (spread after the base, as consumers do)
  {
    name: 'react-hooks flags conditional hook calls',
    config: combined, filename: 'C.tsx',
    code: 'export function C() {\n  if (true) { useState(); }\n  return null;\n}\n',
    fires: ['react-hooks/rules-of-hooks'],
  },
  {
    name: 'jsx-quotes is enforced',
    config: combined, filename: 'C.tsx',
    code: "export const C = () => <div className='a' />;\n",
    fires: ['@stylistic/jsx-quotes'],
  },
];

for (const { name, config, filename, code, fires = [], silent = [] } of fixtures) {
  test(name, () => {
    const ids = ruleIds(config, code, filename);
    for (const ruleId of fires) {
      assert.ok(ids.has(ruleId), `expected ${ruleId} to fire; got: ${[...ids].join(', ') || '(none)'}`);
    }
    for (const ruleId of silent) {
      assert.ok(!ids.has(ruleId), `expected ${ruleId} to stay silent; it fired`);
    }
  });
}

// Subsumes the old CI shape check: both entry points export flat-config arrays.
test('entry points export non-empty config arrays', () => {
  assert.ok(Array.isArray(recommended) && recommended.length > 0);
  assert.ok(Array.isArray(react) && react.length > 0);
});

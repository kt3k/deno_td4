# deno_td4

> TD4 emulator written in [Deno][] (TypeScript)

[![Build Status](https://travis-ci.org/kt3k/deno_td4.svg?branch=master)](https://travis-ci.org/kt3k/deno_td4)

# Run emulator

The module exports `run` function, which runs the TD4 program with the given input. `run` takes two arguments `program: number[]` and `input: number`. `run` returns the array of output of the program and input.

```ts
import { run } from "https://raw.githubusercontent.com/kt3k/deno_td4/master/mod.ts";

console.log(run([0x20, 0x08, 0xe4, 0x05, 0x01, 0x40, 0x90], 0x8))
// This outputs [ 6 ], which is the result of the above program and input
```

# License

MIT

[deno]: https://deno.land/

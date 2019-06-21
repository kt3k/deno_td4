import { run } from "https://raw.githubusercontent.com/kt3k/deno_td4/master/mod.ts";

console.log(run([0x20, 0x08, 0xe4, 0x05, 0x01, 0x40, 0x90], 0x8))
// => this outputs [ 6 ]

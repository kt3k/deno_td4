import { runIfMain, assertEquals, test } from "./dev_deps.ts";
import { CPUState } from "./mod.ts";

test(function testOutIm() {
  const cpu = new CPUState([0xb1]); // OUT_IM 1
  cpu.run();
  console.log(cpu);
  assertEquals(cpu.io.out, [1]);
});

test(function test1() {
  // ADD A 1
  // ADD A 2
  // ADD A 3
  // MOV B A
  // OUT B
  const cpu = new CPUState([0x01, 0x02, 0x03, 0x40, 0x90]);
  cpu.run();
  console.log(cpu);
  assertEquals(cpu.io.out, [6]);
});

runIfMain(import.meta);

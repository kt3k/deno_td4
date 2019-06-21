import { runIfMain, assertEquals, test } from "./dev_deps.ts";
import { CPUState } from "./mod.ts";

test(function test0() {
  // OUT_IM 1
  const cpu = new CPUState([0xb1]);
  cpu.run();
  assertEquals(cpu.io.out, [1]);
});

test(function test1() {
  // ADD_A 1
  // ADD_A 2
  // ADD_A 3
  // MOV_A2B
  // OUT_B
  const cpu = new CPUState([0x01, 0x02, 0x03, 0x40, 0x90]);
  cpu.run();
  assertEquals(cpu.io.out, [0x6]);
});

test(function test2() {
  // ADD_B 2
  // ADD_B 3
  // ADD_B 4
  // OUT_B
  const cpu = new CPUState([0x52, 0x53, 0x54, 0x90]);
  cpu.run();
  assertEquals(cpu.io.out, [0x9]);
});

test(function test3() {
  // JMP 2
  // ADD_B 1
  // OUT_B
  const cpu = new CPUState([0xf2, 0x51, 0x90]);
  cpu.run();
  assertEquals(cpu.io.out, [0x0]);
})

runIfMain(import.meta);

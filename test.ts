import { runIfMain, assertEquals, test } from "./dev_deps.ts";
import { CPUState } from "./mod.ts";

test(function test0() {
  // OUT_IM 1
  const cpu = new CPUState([0xb1], 0x0);
  cpu.run();
  assertEquals(cpu.io.out, [0x1]);
});

test(function test1() {
  // ADD_A 1
  // ADD_A 2
  // ADD_A 3
  // MOV_A2B
  // OUT_B
  const cpu = new CPUState([0x01, 0x02, 0x03, 0x40, 0x90], 0x0);
  cpu.run();
  assertEquals(cpu.io.out, [0x6]);
});

test(function test2() {
  // ADD_B 2
  // ADD_B 3
  // ADD_B 4
  // OUT_B
  const cpu = new CPUState([0x52, 0x53, 0x54, 0x90], 0x0);
  cpu.run();
  assertEquals(cpu.io.out, [0x9]);
});

test(function test3() {
  // JMP 2
  // ADD_B 1
  // OUT_B
  const cpu = new CPUState([0xf2, 0x51, 0x90], 0x0);
  cpu.run();
  assertEquals(cpu.io.out, [0x0]);
});

test(function test4() {
  // MOV_B 7
  // OUT_B
  // OUT_B
  const cpu = new CPUState([0x77, 0x90, 0x90], 0x0);
  cpu.run();
  assertEquals(cpu.io.out, [0x7, 0x7]);
});

test(function test5() {
  // MOV_A 8
  // MOV_A2B
  // OUT_B
  const cpu = new CPUState([0x38, 0x40, 0x90], 0x0);
  cpu.run();
  assertEquals(cpu.io.out, [0x8]);
});

test(function test6() {
  // IN_B
  // MOV_B2A
  // ADD_A 0xa
  // MOV_A2B
  // OUT_B
  const cpu = new CPUState([0x60, 0x10, 0x0a, 0x40, 0x90], 0x7);
  cpu.run();
  assertEquals(cpu.io.out, [0x1]);
});

test(function test7() {
  // IN_A
  // MOV_A2B
  // OUT_B
  const cpu = new CPUState([0x20, 0x40, 0x90], 0xa);
  cpu.run();
  assertEquals(cpu.io.out, [0xa]);
});

test(function tset8() {
  // IN_A
  // ADD_A 8
  // JNC 4
  // ADD_A 5
  // ADD_A 1
  // MOV_A2B
  // OUT_B
  const cpu = new CPUState([0x20, 0x08, 0xe4, 0x05, 0x01, 0x40, 0x90], 0x7);
  cpu.run();
  assertEquals(cpu.io.out, [0x0]);
});

test(function tset9() {
  // IN_A
  // ADD_A 8
  // JNC 4
  // ADD_A 5
  // ADD_A 1
  // MOV_A2B
  // OUT_B
  const cpu = new CPUState([0x20, 0x08, 0xe4, 0x05, 0x01, 0x40, 0x90], 0x8);
  cpu.run();
  assertEquals(cpu.io.out, [0x6]);
});

runIfMain(import.meta);

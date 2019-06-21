import { runIfMain, assertEquals, test } from "./dev_deps.ts";
import { CPUState } from "./mod.ts";

test(function testCPUState() {
  const cpu = new CPUState([0xb1]);
  cpu.run();
  console.log(cpu);
  assertEquals(cpu.io.out, [1]);
});

runIfMain(import.meta);

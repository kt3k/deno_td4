import { assert } from "./deps.ts";

const ADDRESS_SPACE_SIZE = 16;

class Register {
  a: number;
  b: number;

  constructor() {
    this.a = 0;
    this.b = 0;
  }
}

class Flag {
  carry: number;

  constructor() {
    this.carry = 0;
  }
}

class Io {
  in: number;
  out: number[];
  constructor() {
    this.in = 0;
    this.out = [];
  }
}

export class CPUState {
  reg: Register;
  flg: Flag;
  pc: number;
  mem: number[];
  io: Io;

  constructor(program: number[]) {
    this.pc = 0;
    this.mem = program;
    this.io = new Io();
    this.reg = new Register();
    this.flg = new Flag();
  }

  run() {
    while (this.pc < ADDRESS_SPACE_SIZE) {
      if (this.exec(this.fetch())) {
        this.pc++;
      }
    }
  }

  fetch(): number {
    return this.mem[this.pc] || 0;
  }

  exec(data: number): boolean {
    assert(data >= 0x00 && data <= 0xff, "data should be between 0 and 255");

    const op = data >> 4;
    const im = data & 0x0f;

    console.log(`pc=${this.pc} op=${op} im=${im}`);

    switch (op) {
      case Ops.ADD_A:
        return this.addA(im);
      case Ops.ADD_B:
        return this.addB(im);
      case Ops.MOV_A:
        return this.movA(im);
      case Ops.MOV_B:
        return this.movB(im);
      case Ops.MOV_A2B:
        return this.movA2B();
      case Ops.MOV_B2A:
        return this.movB2A();
      case Ops.JMP:
        return this.jmp(im);
      case Ops.JNC:
        return this.jnc(im);
      case Ops.IN_A:
        return this.inA(im);
      case Ops.IN_B:
        return this.inB(im);
      case Ops.OUT_B:
        return this.outB();
      case Ops.OUT_IM:
        return this.outIm(im);
      default:
        // Noop
        return true;
    }
  }

  add(reg: number, im: number): number {
    this.flg.carry = 0;
    const res = reg + im;
    if (res > 0x0f) {
      this.flg.carry = 1;
    }
    return res & 0x0f;
  }

  // 0000: ADD A, Im
  addA(im: number): boolean {
    this.reg.a = this.add(this.reg.a, im);
    return true;
  }

  // 0101: AAD B, Im
  addB(im: number): boolean {
    this.reg.b = this.add(this.reg.b, im);
    return true;
  }

  // 0011: MOV A, Im
  movA(im: number): boolean {
    this.reg.a = im;
    return true;
  }

  // 0111: MOV B, Im
  movB(im: number): boolean {
    this.reg.b = im;
    return true;
  }

  // 0001: MOV A, B
  movB2A(): boolean {
    this.reg.a = this.reg.b;
    return true;
  }

  // 0100: MOV B, A
  movA2B(): boolean {
    this.reg.b = this.reg.a;
    return true;
  }

  // 1111: JMP Im
  jmp(im: number): boolean {
    this.pc = im;
    return false;
  }

  // 1110: JNC Im
  jnc(im: number): boolean {
    if (!this.flg.carry) {
      this.pc = im;
    }
    this.flg.carry = 0;
    return false;
  }

  // 0010: IN A
  inA(im: number): boolean {
    this.flg.carry = 0;
    this.reg.a = this.io.in & 0x0f;
    return true;
  }

  // 0110: IN B
  inB(im: number): boolean {
    this.flg.carry = 0;
    this.reg.b = this.io.in & 0x0f;
    return true;
  }

  // 1001: OUT B
  outB(): boolean {
    this.flg.carry = 0;
    this.io.out.push(this.reg.b);
    return true;
  }

  // 1011: OUT Im
  outIm(im: number): boolean {
    this.flg.carry = 0;
    this.io.out.push(im);
    return true;
  }
}

enum Ops {
  ADD_A = 0x00, // 0000: ADD A, Im
  ADD_B = 0x05, // 0101: AAD B, Im
  MOV_A = 0x03, // 0011: MOV A, Im
  MOV_B = 0x07, // 0111: MOV B, Im
  MOV_B2A = 0x01, // 0001: MOV A, B
  MOV_A2B = 0x04, // 0100: MOV B, A
  JMP = 0x0f, // 1111: JMP Im
  JNC = 0x0e, // 1110: JNC Im
  IN_A = 0x02, // 0010: IN A
  IN_B = 0x06, // 0110: IN B
  OUT_B = 0x09, // 1001: OUT B
  OUT_IM = 0x0b // 1011: OUT Im
}

export function run(program: number[]) {
  const cpu = new CPUState(program);
  cpu.run();
  return cpu.io.out;
}

<!--  
title: "Falling in Love with Assembly"  
author: "Malindu"  
date: "2025-05-08"  
excerpt: "How I got introduced to assembly language, why it blew my mind, and a glimpse into a real program I wrote for our nano-processor lab."  
img: "/img/assembly-love.png"  
pinned: false  
tags: low-level, asm, kuppi, uni
-->

I think I just fell in love - with assembly language.

Not in a weird, obsessive way. More like the feeling of finally seeing what was behind the curtain of everything I’ve ever done in programming.

I’d heard about assembly before, of course. I’d even peeked into compiler outputs, stared at disassembled C++ functions, and watched ChatGPT help me make sense of them. But I never *actually* wrote or executed anything meaningful in assembly. That changed recently.

At university, we have this module called *Computer Organization and Digital Design*. As part of that, we’re building a **nano processor** (yeah, from scratch), and obviously, to control it, we need to program it in assembly.

That’s where things clicked for me. Writing instructions at this level wasn’t just educational-it was electrifying. It felt like I was finally communicating with the raw machine. No abstractions. Just pure logic, registers, ports, and flags.

And then it hit me-like a proper lightbulb moment.

This wasn't just low-level. This was *the level*. Every tiny thing, from a loop to a variable assignment, from a print statement to a condition-it’s all here, exposed and tangible. Assembly didn’t just show me how computers work; it *made me feel it*.

We used a simulator called **SMZ32V50**, and even though it's not real hardware, it still counts in my book. It gave me this brand new mental model of how CPUs actually work-what an instruction really *does* when it’s executed.

It’s wild how something as simple as `MOV AL, 2` starts making sense as a real action happening on a register somewhere. This stuff makes C look bloated.

It’s like... if in Python we wrote `left.red = True`, in assembly, we’re the ones building what happens *underneath* that line. We're not just setting a variable-we're sending electrical signals to the correct memory-mapped port and holding it there for a few clock cycles. You don’t just write what should happen-you *make* it happen. That’s magic.

And that delay mechanism we implemented? It absolutely blew me away. Just using `DEC` and `JNZ` to create a countdown-looping over and over just to simulate time passing-felt surreal. I’d never appreciated how much effort the CPU goes through just to do something as simple as showing a message on screen or blinking an LED.

So now I’m thinking of taking this further. Maybe even trying x86 assembly, writing a real program. I don’t even know what yet-but the idea alone excites me.

---

## My Assembly Lab Work

For now, here's a collection of what we did in our assembly lab using the SMZ32V50 simulator. This was part of a formal assignment, but honestly, I enjoyed it way more than I expected.

>Since the markdown library I am using has a complicated way of dealing with code blocks, I will be labelling the following code blocks as `x86asm`, however, I am not using `x86asm`, but rather a language used with the assembly simulator [smz32v50](https://github.com/ethornbury/smz32v50-micrprocessor). It is however, "based on the x86 architecture and intended for students learning low level programming".

### 1. Basic Math in Assembly

**Addition:**

```x86asm
MOV AL,2
MOV BL,2
ADD AL,BL
END
```

* This simply adds two values (2 and 2) by first loading them into registers AL and BL. The result (4) stays in AL.

**Subtraction:**

```x86asm
MOV AL,2
MOV BL,2
SUB AL,BL
END
```

* Same idea. AL starts at 2, and we subtract BL (2) from it. AL becomes 0.

**Multiplication:**

```x86asm
MOV AL,2
MOV BL,3
MUL AL,BL
END
```

* Multiply AL and BL. 2 \* 3 = 6. The result goes back into AL.

**Division:**

```x86asm
MOV AL,2
MOV BL,2
DIV AL,BL
END
```

* Divide AL by BL. 2 / 2 = 1. Again, AL holds the result.

These are the most basic things, but seeing how each operation actually moves through registers gives a totally different kind of respect for what's going on in a CPU.

---

### 2. Traffic Light Control with Delay Procedure

We implemented a traffic light logic using port outputs and created time delays by manually looping through instructions. This was my first real encounter with writing a procedure in assembly and managing the stack to preserve CPU state.

```x86asm
START:
  MOV AL, 84    ; Turn on red light
  OUT 01
  MOV AL, A     ; Delay value
  CALL 30       ; Call delay procedure

  MOV AL, 48    ; Turn on yellow
  OUT 01
  MOV AL, 1
  CALL 30

  MOV AL, 30    ; Turn on green
  OUT 01
  MOV AL, 5
  CALL 30
  
  JMP START     ; Loop forever
```

We’re using specific values to represent light combinations (based on how the ports are wired). Then we delay using a custom procedure:

```x86asm
ORG 30
PUSH AL         ; Save AL before delay
PUSHF           ; Save flags

Timer:
  DEC AL        ; Decrement AL
  JNZ Timer     ; Loop until AL is zero

POPF            ; Restore flags
POP AL          ; Restore AL
RET
```

This part blew my mind. We literally made a **timer** out of a loop that counts down. Like building a clock from scratch, using only instructions and willpower.

---

### 3. Seven-Segment Display: Showing "78"

Because my index number ends in 78, I had the display show those digits. I’m not gonna lie-it was weirdly satisfying seeing those LEDs light up based on my code.

```x86asm
MOV AL,00
OUT 02          ; Clear display
MOV AL,01
OUT 02          ; Enable digit

MOV AL,8A
OUT 02          ; Display '7' and '8' in hex encoding

MOV AL,FF
OUT 02          ; Possibly blank/reset
END
```

Each `OUT` sends a value to a specific port, and depending on your circuit setup, the display shows something. In this case, `8A` probably corresponds to 7 and 8 when split across two digits.

---

### 4. Factorial of 5

Finally, I wrote a loop in assembly to calculate 5! using `MUL`, `DEC`, and `JNZ`. This made me appreciate just how many steps are hidden behind a single `for` loop in a high-level language.

```x86asm
MOV BL,5        ; Counter = 5
MOV AL,1        ; Result = 1

proc:
  MUL AL,BL     ; AL = AL * BL
  DEC BL        ; BL--
  JNZ proc      ; Repeat until BL = 0

END
```

In C, this would be a one-liner inside a loop. But here? Every multiplication, decrement, and check is spelled out. You *feel* every CPU tick.

---

That’s it for now. I’m seriously considering making assembly programming a regular thing. It’s not just “closer to the metal”-it *is* the metal.

Let’s see where this obsession takes me.

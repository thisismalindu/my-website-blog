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

We used a simulator called [SMZ32V50](https://github.com/ethornbury/smz32v50-micrprocessor), and even though it's not real hardware, it still counts in my book. It gave me this brand new mental model of how CPUs actually work-what an instruction really *does* when it’s executed.

It’s wild how something as simple as `MOV AL, 2` starts making sense as a real action happening on a register somewhere. This stuff makes C look bloated.

It’s like... if in Python we wrote `left.red = True`, in assembly, we’re the ones building what happens *underneath* that line. We're not just setting a variable-we're sending electrical signals to the correct memory-mapped port and holding it there for a few clock cycles. You don’t just write what should happen, you *make* it happen. That’s magic.

And that delay mechanism we implemented? It absolutely blew me away. Just using `DEC` and `JNZ` to create a countdown-looping over and over just to simulate time passing felt surreal. I’d never appreciated how much effort the CPU goes through just to do something as simple as showing a message on screen or blinking an LED.

So now I’m thinking of taking this further. Maybe even trying x86 assembly, writing a real program. I don’t even know what yet-but the idea alone excites me.

---

## My Assembly Lab Work

For now, here's a collection of what we did in our assembly lab using the SMZ32V50 simulator. This was part of a formal assignment, but honestly, I enjoyed it way more than I expected.

>Since the markdown library I am using has a complicated way of dealing with code blocks, I will be labelling the following code blocks as `x86asm`, however, I am not using `x86asm`, but rather a language used with the assembly simulator [smz32v50](https://github.com/ethornbury/smz32v50-micrprocessor). It is however, "based on the x86 architecture and intended for students learning low level programming".

### 1. Basic Math in Assembly

**Addition:**

```x86asm
MOV AL,2	; Copy a 2 into the AL register.
MOV BL,2	; Copy a 2 into the BL register.
ADD AL,BL	; Add AL to BL. Answer goes into AL.
END		    ; Program ends
```

* This simply adds two values (2 and 2) by first loading them into registers AL and BL. The result (4) stays in AL.

**Subtraction:**

```x86asm
MOV AL,2	; Copy a 2 into the AL register.
MOV BL,2	; Copy a 2 into the BL register.
SUB AL,BL	; Subtract BL from AL. Answer goes into AL.
END		    ; Program ends
```

* Same idea. AL starts at 2, and we subtract BL (2) from it. AL becomes 0.

**Multiplication:**

```x86asm
MOV AL,2	; Copy a 2 into the AL register.
MOV BL,3	; Copy a 2 into the BL register.
MUL AL,BL	; Multiply AL and BL. Answer goes into AL.
END		    ; Program ends
```

* Multiply AL and BL. 2 \* 3 = 6. The result goes back into AL.

**Division:**

```x86asm
	MOV AL,2	; Copy a 2 into the AL register.
	MOV BL,2	; Copy a 2 into the BL register.
	DIV AL,BL	; Divide AL by BL. Answer goes into AL.
	END		    ; Program ends
```

* Divide AL by BL. 2 / 2 = 1. Again, AL holds the result.

These are the most basic things, but seeing how each operation actually moves through registers gives a totally different kind of respect for what's going on in a CPU.

---

### 2. Traffic Light Control with Delay Procedure

We implemented a traffic light logic using port outputs and created time delays by manually looping through instructions. This was my first real encounter with writing a procedure in assembly and managing the stack to preserve CPU state.

```x86asm

;------------- Main Program -----------------

START:
	MOV AL, 84	; Copy 10000100 into the AL register.
	OUT 01		  ; Send AL to Port One (The traffic lights).
	
	MOV	AL, A	  ; define delay as 10
	CALL	30	  ; call program at [30]

	MOV AL, 48	; Copy 01001000	into the AL register.
	OUT 01		  ; Send AL to Port One (The traffic lights).
	
	MOV 	AL, 1	; define delay as 1
	CALL 	30	  ; call program at [30]

	MOV AL, 30	; Copy 00110000	into the AL register.
	OUT 01		  ; Send AL to Port One (The traffic lights).	

	MOV	AL, 5	  ; define delay as 5
	CALL	30	  ; call program at [30]
	
	JMP START	  ; loop back to start

;------- procedure to do the timer ---------

	ORG	30	    ; this proc starts at [30]

	;----- This ensures that we return to the same state after the proc is done -----
	PUSH	AL	  ; Save AL on the stack.
	PUSHF		    ; Save the CPU flags on the stack.

	Timer:
		DEC	AL	  ; Subtract one from AL.
		JNZ	Timer	; Jump back to Rep if AL was not Zero.
		
		;----- return to same state -----
		POPF		  ; Restore the CPU flags from the stack.
		POP	AL	  ; Restore AL from the stack.

		RET		    ; Return from the procedure.

END
```

We’re using specific values to represent light combinations (based on how the ports are wired). Then we delay using a custom procedure:

```x86asm
;------- procedure to do the timer ---------

	ORG	30	    ; this proc starts at [30]

	;----- This ensures that we return to the same state after the proc is done -----
	PUSH	AL	  ; Save AL on the stack.
	PUSHF		    ; Save the CPU flags on the stack.

	Timer:
		DEC	AL	  ; Subtract one from AL.
		JNZ	Timer	; Jump back to Rep if AL was not Zero.
		
		;----- return to same state -----
		POPF		  ; Restore the CPU flags from the stack.
		POP	AL	  ; Restore AL from the stack.

		RET		    ; Return from the procedure.

END
```

This part blew my mind. We literally made a **timer** out of a loop that counts down. Like building a clock from scratch, using only instructions and willpower.

---

### 3. Seven-Segment Display: Showing "78"

Because my index number ends in 78, I had the display show those digits. I’m not gonna lie, it was weirdly satisfying seeing those LEDs light up based on my code.

```x86asm
MOV	AL,00	  ; reset display0
OUT	02
MOV	AL,01	  ; reset display1 (here the last bit controls which display we are using)
OUT	02

MOV	AL,8A	  ; 1000 1010 = 7
OUT	02	    ; Send the data in AL to Port 02

MOV	AL,FF 	; 1111 1111 = 8
OUT	02      ; Send the data in AL to Port 02
	
END
```

Each `OUT` sends a value to a specific port, and depending on your circuit setup, the display shows something. In this case, `8A` probably corresponds to 7 and 8 when split across two digits.

---

### 4. Factorial of 5

Finally, I wrote a loop in assembly to calculate 5! using `MUL`, `DEC`, and `JNZ`. This made me appreciate just how many steps are hidden behind a single `for` loop in a high-level language.

```x86asm
MOV BL,5	    ; factorial of 5
MOV AL,1	    ; multiplier

;---- multiplies downwards -----
proc:
	MUL AL,BL
	DEC BL		  ; decrease counter
	JNZ proc	  ; if zero exits the program
END
```

In C, this would be a one-liner inside a loop. But here? Every multiplication, decrement, and check is spelled out. You *feel* every CPU tick.

---

As fun and eye-opening as it is to write in assembly, I’ve started to realize how tough it actually is to build full programs with it. Every little thing takes so many steps. There are no shortcuts, no built-in functions, and nothing to help you out, you have to do everything yourself. Even something simple, like printing text or adding numbers in a loop, turns into a long list of instructions. It’s cool because you learn a lot, but it can get really tiring and slow. That’s why I have huge respect for people like Chris Sawyer, the guy who made *RollerCoaster Tycoon* almost entirely in assembly language. I mean, he built a whole game, with graphics, sound, everything, using just this. That level of dedication and skill is honestly next level.

That’s it for now. I’m seriously considering making assembly programming a regular thing. It’s not just “closer to the metal”, it *is* the metal.

Let’s see where this obsession takes me.

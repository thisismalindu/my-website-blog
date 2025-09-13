<!--  
title: "Branch Prediction: A master of guessing - The CPU"  
author: "Malindu"  
date: "2025-09-13"  
excerpt: "How the CPU uses different techniques of 'guessing' to make decisions - different ways of branch prediction explained."  
img: "/img/assembly-love.png"  
pinned: false  
tags: low-level, asm, kuppi, uni, branch-prediction, riscv, computer-architecture, codd
-->

### Branch Prediction: CPU Trying To Be a Fortune Teller

okay so here’s the deal. modern CPUs are crazy fast but they run into this one annoying problem: **branches**.

a branch is just when your code has to decide - "if x > 5 then do this, otherwise do that." the CPU hits this and goes "hmm… which way should i go?"

the problem is, figuring that out actually takes time. like, multiple cycles. and CPUs hate waiting. their whole thing is keeping the pipeline (the assembly line of instructions) full at all times. if it stalls - boom, performance tanked.

so some genius came up with the hack: **what if we don’t wait… what if we just guess?**

---

#### guessing instead of waiting

instead of sitting idle, the CPU picks a path and just keeps going.

* if it guessed right, sweet, no time wasted.
* if it guessed wrong, uh oh. it has to throw away the wrong work and start over. that’s called *flushing the pipeline*.

so the whole trick is - guess right as often as possible.

---

#### how does it guess?

there’s basically 2 ways:

**1. static prediction (dumb but easy)**
this is like having a simple rulebook. it doesn’t learn, it just follows a pattern.

* always assume "not taken" (works well for rare error checks)
* or always assume "taken" (good for loops, cause they usually repeat)

old RISC-V and MIPS even had this thing called *delay slots*. basically the compiler sneaks in a harmless instruction right after the branch, so the CPU can do *something useful* while it figures out where to go.

```asm
addi x3, x4, 1   # delay slot instruction
blt x1, x2, LOOP # branch
```

so even while waiting, it’s not totally wasting time.

**2. dynamic prediction (actually smart)**
here’s where CPUs get spicy. they start learning from the past.

they keep a little notebook (Branch History Table) that says "last 100 times this branch ran, it was taken 99 times."

the simplest version is a 1-bit predictor: just remember what happened last time. problem is, if a branch usually goes one way but flips occasionally, it’ll mispredict twice - once when it flips, and again when it flips back.

solution? **2-bit counters.** basically it takes 2 wrong guesses in a row to actually change its mind. way more stable.

modern CPUs are insane - they combine predictors, look at patterns from *other* branches, and reach 95%+ accuracy. it’s like poker-level mind games but done in nanoseconds.

---

#### speculative execution - the bold move

branch prediction doesn’t just fetch the next instructions. it actually **executes them**. like full-on doing math, memory loads, everything.

but - it won’t *commit* the results until it’s sure the guess was right.

* if right: great, all that work is locked in instantly.
* if wrong: "oops", throw it all away like it never happened.

from your program’s point of view, it never sees mistakes, just a little extra delay sometimes.

---

#### why it’s beautiful (and a little scary)

branch prediction is basically CPU engineers saying: "since physics won’t let us wait faster, let’s just cheat."

we burn extra silicon and complexity just to keep pipelines flowing, and it works. like, really well.

but of course, hackers found ways to abuse this (hello **Spectre** and **Meltdown**). basically they tricked CPUs into speculating down paths they shouldn’t, then leaked info from the traces it left behind. scary, but also… kinda genius.

---

next time your code runs smooth, remember there’s a tiny crystal-ball inside your CPU making billions of guesses every second, usually getting it right. and when it’s wrong, it just shrugs and says "my bad."

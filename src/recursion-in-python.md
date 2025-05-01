<!--  
title: "Recursion in Python"  
author: "Malindu"  
date: "2025-05-01"  
excerpt: "A quick lesson on what recursion is and how can we use it in Python and all that good stuff."  
img: "/img/recursion-in-python.png"
pinned: False
tags: kuppi
-->

💡 **If you're new to recursion**, I recommend watching this short video by BroCode:  
👉 [What is Recursion? | BroCode](https://www.youtube.com/watch?v=ivl5-snqul8)    
It explains the concept with 3 simple examples in a way that's super easy to understand.

After that, come back here for a deeper dive into recursion with more examples and explanations. This post goes a lot further, but the video is a great starting point.

### 1. What is Recursion?

Recursion means a function calls itself to solve a smaller piece of the same problem. Instead of solving a big task all at once, you break it down into simpler parts and solve each one in the same way.

Example:

```python
def greet():
    print("Hello")
    greet()  # This repeats forever and never stops
```

To stop it from going on forever, we need a stopping point - called the **base case**.

---

### 2. Why Use Recursion?

Let’s start with a simple real-world example.

**🔍 Searching a Name in a Phone Book (Recursive Thinking)**

Imagine you’re trying to find a name - say, “Perera” - in a printed phone book that’s sorted alphabetically. You open the book to the middle and see the name “Fernando.” Since “Perera” comes after “Fernando,” you ignore the first half and repeat the process with the second half. Then you do it again with the next smaller half, and so on, until you find the name or run out of pages.

That’s recursive thinking in action. You're solving the same problem ("find the name") in a smaller and smaller sub-problem (smaller part of the phone book) until you reach the base case - either you find it, or it’s not there.

Here’s what that logic would look like as code:

```python
def find_name(book, target):
    if not book:
        return "Not found"
    mid = len(book) // 2
    if book[mid] == target:
        return "Found!"
    elif book[mid] < target:
        return find_name(book[mid+1:], target)
    else:
        return find_name(book[:mid], target)
```

This is exactly how **binary search** works - and it’s a classic recursive algorithm. You don’t need to write recursion for this, but the idea helps explain why some problems are naturally solved by recursion.

You could use loops instead of recursion, and that’s often better. But recursion can be easier to write and understand for some problems.

**Why recursion?**

- Some problems are easier to solve with recursion (like trees or puzzles).
- It can make the code shorter and cleaner.
- It helps break problems into smaller parts.

**But be careful:**

- It uses more memory.
- It can crash if it goes too deep.
- Python doesn’t optimize it like some other languages.

---

Recursion is not some magical concept. It's just a different way of solving problems - often easier to write and think about when the problem naturally splits into smaller versions of itself. You don't *have* to use recursion. If you can solve something with a loop, that’s fine - and often more efficient in speed and memory. But when recursion fits, it often leads to the **cleanest and most intuitive** code, especially early on in problem-solving.

### 3. Important Ideas

- **Recursive Case**: The part where the function keeps calling itself.
- **Base Case**: The part where it stops calling itself.

Every time the function calls itself, the problem should get smaller and smaller until it hits the base case.

---

### 4. Basic Structure

```python
def recursive_function(input):
    if input is simple:
        return result  # Base case
    else:
        return recursive_function(smaller_input)  # Recursive case
```

Example:

```python
def countdown(n):
    if n <= 0:
        print("Blastoff!")
    else:
        print(n)
        countdown(n - 1)
```

---

### 5. Classic Examples

#### 5.1 Factorial

**Recursive:**

```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

**Iterative:**

```python
def factorial_iter(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
```

#### 5.2 GCD (Greatest Common Divisor)

**Recursive:**

```python
def gcd(x, y):
    if y == 0:
        return x
    return gcd(y, x % y)
```

**Iterative:**

```python
def gcd_iter(x, y):
    while y:
        x, y = y, x % y
    return x
```

#### 5.3 Power

**Recursive:**

```python
def power(x, n):
    if n == 0:
        return 1
    return x * power(x, n - 1)
```

**Iterative:**

```python
def power_iter(x, n):
    result = 1
    for _ in range(n):
        result *= x
    return result
```

##### Fast Power (Efficient Way)

**Recursive:**

```python
def fast_power(x, n):
    if n == 0:
        return 1
    half = fast_power(x, n // 2)
    return half * half if n % 2 == 0 else x * half * half
```

**Iterative:**

```python
def fast_power_iter(x, n):
    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    return result
```

---

### 6. Visual Example (Call Stack)

```python
factorial(3)
-> 3 * factorial(2)
       -> 2 * factorial(1)
              -> 1 * factorial(0)
                    -> returns 1
              -> returns 1
       -> returns 2
-> returns 6
```

Each call is paused until the next one finishes.

---

### 7. Recursion vs Iteration (Quick Comparison)

| Feature    | Recursion                  | Iteration                |
| ---------- | -------------------------- | ------------------------ |
| Code Style | Shorter, cleaner sometimes | Longer, more control     |
| Speed      | Slower, uses call stack    | Faster, uses less memory |
| Best For   | Recursive structures       | Repeated simple loops    |

---

### 8. Tail Recursion (Why It Doesn’t Help in Python)

**Tail recursion** is when the function calls itself at the very end - and does nothing after that call.

In some languages, this is optimized to run faster. In Python, it’s **not**.

#### Normal vs Tail Factorial

**Normal:**

```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

**Tail:**

```python
def tail_factorial(n, acc=1):
    if n == 0:
        return acc
    return tail_factorial(n - 1, acc * n)
```

Python treats both the same - both will crash for large `n`.

#### GCD is Already Tail Recursive:

```python
def gcd(x, y):
    if y == 0:
        return x
    return gcd(y, x % y)
```

#### Power with Tail Recursion

```python
def tail_power(x, n, acc=1):
    if n == 0:
        return acc
    return tail_power(x, n - 1, acc * x)
```

**Bottom line:** Just use loops in Python if performance or depth is a problem.

---

### 9. Real-Life Uses

#### Check Palindrome

**Recursive:**

```python
def is_palindrome(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])
```

**Iterative:**

```python
def is_palindrome_iter(s):
    return s == s[::-1]
```

#### Sum of a List

**Recursive:**

```python
def list_sum(nums):
    if not nums:
        return 0
    return nums[0] + list_sum(nums[1:])
```

**Iterative:**

```python
def list_sum_iter(nums):
    total = 0
    for num in nums:
        total += num
    return total
```

#### Towers of Hanoi

```python
def hanoi(n, source, target, spare):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
    else:
        hanoi(n-1, source, spare, target)
        print(f"Move disk {n} from {source} to {target}")
        hanoi(n-1, spare, target, source)
```

(This one is tough to write without recursion.)

---

### 10. Recursion Tips

- Always stop with a base case.
- Make progress toward that base.
- Test with small inputs.
- Python limits recursion depth.
- Use loops or memoization if needed.

---

### 11. Recursion Limit in Python

```python
import sys
print(sys.getrecursionlimit())
sys.setrecursionlimit(2000)  # Be careful with this
```

---

### 12. Summary

- Recursion = solving a big problem by solving a smaller version of it.
- Needs a base case to stop.
- Good for things like trees, puzzles, and nested structures.
- Loops are faster and safer for most practical problems in Python.
- Tail recursion is a nice theory but doesn’t help in Python.

---

If you learn to think recursively, you'll be able to break down hard problems into simpler ones. It's not magic - it's just practice!


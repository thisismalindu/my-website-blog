<!--  
title: "DSA Cheatsheet for Competitive Programming"  
author: "Malindu"  
date: "2025-05-29"  
excerpt: "Comprehensive cheatsheet for Data Structures and Algorithms"  
img: "/img/assembly-love.png"  
pinned: false  
tags: dsa, data structures, algorithms, cheatsheet
-->

This comprehensive cheatsheet provides essential algorithms and data structures with practical implementations, usage tips, and competitive programming insights for quick reference during HackerRank competitions and similar contests.

## Sorting Algorithms

### Bubble Sort

**When to use:** Small datasets, educational purposes, when simplicity is needed over efficiency[^1][^16].

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # Optimization: early termination
            break
    return arr
```

**Key Points:** Time complexity O(n²) worst/average, O(n) best case. Space O(1). The swapped flag optimization can significantly improve performance on nearly sorted arrays[^19].

**Pitfalls:** Extremely slow on large datasets. Don't use in competitive programming unless specifically required.

### Insertion Sort

**When to use:** Small arrays (< 50 elements), nearly sorted data, as a subroutine in hybrid algorithms like Timsort[^2][^17].

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
```

**Key Points:** Time complexity O(n²) worst/average, O(n) best case. Space O(1). Stable sort. Works like sorting cards in hand[^2].

**Competitive Tips:** Excellent for small subarrays in divide-and-conquer algorithms. Use when you need stable sorting for small datasets.

### Merge Sort

**When to use:** Large datasets, when stable sorting is required, guaranteed O(n log n) performance needed[^3].

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

**Key Points:** Time complexity O(n log n) all cases. Space O(n). Stable sort. Divide and conquer approach[^3].

**Competitive Tips:** Use for inversion count problems, external sorting, when stability matters. Good for problems requiring merge operation.

### Quick Sort

**When to use:** General-purpose sorting, when average O(n log n) is acceptable and space is limited[^4].

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]  # Choose rightmost as pivot
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

**Key Points:** Time complexity O(n log n) average, O(n²) worst case. Space O(log n). Not stable[^4].

**Competitive Tips:** Use randomized pivot to avoid worst case. Good for problems where you need to partition around a value.

### Heap Sort

**When to use:** When guaranteed O(n log n) with O(1) space is needed, priority-based operations[^5][^18][^20].

```python
def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap
    for i in range(n - 1, 0, -1):
        arr[^0], arr[i] = arr[i], arr[^0]
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
```

**Key Points:** Time complexity O(n log n). Space O(1). Not stable. Good for priority queues[^5][^20].

**Competitive Tips:** Use when you need to repeatedly find max/min elements. Essential for implementing priority queues.

## Searching Algorithms

### Linear Search

**When to use:** Unsorted arrays, small datasets, finding all occurrences[^7].

```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

def linear_search_all(arr, target):
    indices = []
    for i in range(len(arr)):
        if arr[i] == target:
            indices.append(i)
    return indices
```

**Key Points:** Time complexity O(n). Space O(1). Works on unsorted data[^7].

**Competitive Tips:** Use when array is unsorted or when you need all occurrences.

### Binary Search

**When to use:** Sorted arrays, when O(log n) search is needed[^8].

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

def binary_search_leftmost(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left if left < len(arr) and arr[left] == target else -1
```

**Key Points:** Time complexity O(log n). Space O(1). Requires sorted array[^8].

**Competitive Tips:** Use for "find first/last occurrence", "search in rotated array", "find peak element" problems.

### Depth-First Search (DFS)

**When to use:** Tree/graph traversal, pathfinding, detecting cycles, topological sorting[^9].

```python
def dfs_recursive(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=' ')
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    
    return visited

def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node, end=' ')
            # Add neighbors in reverse order for same traversal as recursive
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return visited
```

**Key Points:** Time complexity O(V + E). Space O(V). Can detect cycles, find connected components[^9].

**Competitive Tips:** Use for maze problems, finding paths, detecting cycles. Stack-based iterative version avoids recursion depth issues.

### Breadth-First Search (BFS)

**When to use:** Shortest path in unweighted graphs, level-order traversal, minimum steps problems[^10].

```python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        node = queue.popleft()
        print(node, end=' ')
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited

def bfs_shortest_path(graph, start, end):
    if start == end:
        return [start]
    
    visited = set()
    queue = deque([(start, [start])])
    visited.add(start)
    
    while queue:
        node, path = queue.popleft()
        
        for neighbor in graph[node]:
            if neighbor == end:
                return path + [neighbor]
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None
```

**Key Points:** Time complexity O(V + E). Space O(V). Guarantees shortest path in unweighted graphs[^10].

**Competitive Tips:** Use for shortest path problems, "minimum steps" problems, level-wise processing.

## Graph Algorithms

### Dijkstra's Algorithm

**When to use:** Shortest path in weighted graphs with non-negative weights[^12].

```python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    visited = set()
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current in visited:
            continue
        
        visited.add(current)
        
        for neighbor, weight in graph[current]:
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances
```

**Key Points:** Time complexity O((V + E) log V) with binary heap. Space O(V). Cannot handle negative weights[^12].

**Competitive Tips:** Use for shortest path in weighted graphs. Remember to handle the case where destination is unreachable.

### Bellman-Ford Algorithm

**When to use:** Shortest path with negative weights, detecting negative cycles[^14].

```python
def bellman_ford(graph, start):
    # graph: list of edges (u, v, weight)
    vertices = set()
    for u, v, w in graph:
        vertices.add(u)
        vertices.add(v)
    
    distances = {v: float('inf') for v in vertices}
    distances[start] = 0
    
    # Relax edges V-1 times
    for _ in range(len(vertices) - 1):
        for u, v, weight in graph:
            if distances[u] != float('inf') and distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight
    
    # Check for negative cycles
    for u, v, weight in graph:
        if distances[u] != float('inf') and distances[u] + weight < distances[v]:
            return None  # Negative cycle detected
    
    return distances
```

**Key Points:** Time complexity O(VE). Space O(V). Can detect negative cycles[^14].

**Competitive Tips:** Use when graph has negative weights or when you need to detect negative cycles.

### Kruskal's Algorithm (Minimum Spanning Tree)

**When to use:** Finding minimum spanning tree, connecting components with minimum cost[^13].

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [^0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True

def kruskal(n, edges):
    # edges: list of (weight, u, v)
    edges.sort()
    uf = UnionFind(n)
    mst = []
    total_weight = 0
    
    for weight, u, v in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            total_weight += weight
            if len(mst) == n - 1:
                break
    
    return mst, total_weight
```

**Key Points:** Time complexity O(E log E). Space O(V). Uses Union-Find data structure[^13].

**Competitive Tips:** Use for MST problems, connecting cities with minimum cost, network design problems.

## Analysis and Complexity

### Master Theorem

**When to use:** Analyzing divide-and-conquer recurrences of the form T(n) = aT(n/b) + f(n)[^11].

**Quick Reference:**

- **Case 1:** If f(n) = O(n^(log_b(a) - ε)) for some ε > 0, then T(n) = Θ(n^log_b(a))
- **Case 2:** If f(n) = Θ(n^log_b(a)), then T(n) = Θ(n^log_b(a) * log n)
- **Case 3:** If f(n) = Ω(n^(log_b(a) + ε)) for some ε > 0, then T(n) = Θ(f(n))

**Examples:**

- T(n) = 2T(n/2) + n → Case 2 → T(n) = Θ(n log n) (Merge Sort)
- T(n) = 2T(n/2) + 1 → Case 1 → T(n) = Θ(n) (Binary Search)


## Competitive Programming Tips

### Common Patterns

1. **Two Pointers:** Use for array problems with sorted data or when looking for pairs
2. **Sliding Window:** Use for substring/subarray problems with constraints
3. **Stack:** Use for bracket matching, nearest greater/smaller element problems
4. **Queue:** Use for BFS, level-order processing
5. **Priority Queue:** Use for problems requiring min/max element access


### Time Complexity Quick Guide

- **O(1):** Hash table operations, array access
- **O(log n):** Binary search, heap operations
- **O(n):** Linear search, array traversal
- **O(n log n):** Efficient sorting, divide-and-conquer
- **O(n²):** Nested loops, naive sorting
- **O(2^n):** Recursive backtracking, subset generation


### Common Pitfalls

1. **Integer Overflow:** Use long long in C++ for large numbers
2. **Array Bounds:** Always check array indices
3. **Empty Input:** Handle edge cases with empty arrays/strings
4. **Duplicate Elements:** Consider how algorithms handle duplicates
5. **Time Limits:** Choose appropriate algorithm based on constraints

This cheatsheet provides the essential algorithms and data structures needed for competitive programming, with practical implementations and usage guidelines optimized for quick reference during contests.

[^1]: https://www.programiz.com/dsa/bubble-sort

[^2]: https://www.programiz.com/dsa/insertion-sort

[^3]: https://www.digitalocean.com/community/tutorials/merge-sort-algorithm-java-c-python

[^4]: https://www.programiz.com/dsa/quick-sort

[^5]: https://www.programiz.com/dsa/heap-sort

[^6]: https://en.wikipedia.org/wiki/Timsort

[^7]: https://www.programiz.com/dsa/linear-search

[^8]: https://www.programiz.com/dsa/binary-search

[^9]: https://www.programiz.com/dsa/graph-dfs

[^10]: https://celerdata.com/glossary/breadth-first-search-bfs

[^11]: https://www.programiz.com/dsa/master-theorem

[^12]: https://en.wikipedia.org/wiki/Dijkstra's_algorithm

[^13]: https://www.programiz.com/dsa/kruskal-algorithm

[^14]: https://en.wikipedia.org/wiki/Bellman–Ford_algorithm

[^15]: https://www.hackerearth.com/practice/notes/disjoint-set-union-union-find/

[^16]: https://www.codecademy.com/resources/docs/general/algorithm/bubble-sort

[^17]: https://takeuforward.org/data-structure/insertion-sort-algorithm/

[^18]: https://en.wikipedia.org/wiki/Heapsort

[^19]: https://builtin.com/data-science/bubble-sort-time-complexity

[^20]: https://builtin.com/data-science/heap-sort

[^21]: https://www.w3schools.com/dsa/dsa_algo_bubblesort.php

[^22]: https://en.wikipedia.org/wiki/Bubble_sort

[^23]: https://www.youtube.com/watch?v=Dv4qLJcxus8

[^24]: https://www.youtube.com/watch?v=qpRHbGpKoPA

[^25]: https://www.ccbp.in/blog/articles/heap-sort-in-data-structure

[^26]: https://www.youtube.com/watch?v=246V51AWwZM

[^27]: https://www.tutorialspoint.com/data_structures_algorithms/linear_search_algorithm.htm

[^28]: https://users.cs.duke.edu/~reif/courses/alglectures/skiena.lectures/lecture3.pdf

[^29]: https://www.datacamp.com/tutorial/dijkstra-algorithm-in-python

[^30]: https://neetcode.io/problems/dijkstra

[^31]: https://www.reddit.com/r/computerscience/comments/by8mou/good_implementation_of_dijkstras_algorithm_in_c/

[^32]: https://en.wikipedia.org/wiki/Dynamic_programming

[^33]: https://www.scaler.com/topics/heap-sort-program-in-c/

[^34]: https://en.wikipedia.org/wiki/Introsort

[^35]: https://www.youtube.com/watch?v=XYVbjQXkmiI

[^36]: https://skerritt.blog/timsort/

[^37]: https://www.w3schools.com/dsa/dsa_algo_linearsearch.php

[^38]: https://www.datacamp.com/tutorial/linear-search-python

[^39]: https://www.simplilearn.com/tutorials/c-tutorial/program-for-linear-search-in-c

[^40]: https://stackoverflow.com/questions/249392/binary-search-in-array

[^41]: https://stackoverflow.com/questions/30201391/how-to-write-a-recurrence-relation-for-a-given-piece-of-code

[^42]: https://www.youtube.com/watch?v=4V30R3I1vLI

[^43]: https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture3.pdf

[^44]: https://opendsa-server.cs.vt.edu/ODSA/Books/CS4104/html/Recurrence.html

[^45]: https://www.cs.cornell.edu/courses/cs3110/2014sp/recitations/24/using-the-substitution-and-master-method.html

[^46]: https://tildesites.bowdoin.edu/~ltoma/teaching/cs231/fall07/Lectures/reccurences.pdf

[^47]: https://aofa.cs.princeton.edu/20recurrence/

[^48]: https://brilliant.org/wiki/the-substitution-method-for-solving-recurrences/

[^49]: https://www.w3schools.com/dsa/dsa_algo_graphs_dijkstra.php

[^50]: https://www.programiz.com/dsa/dijkstra-algorithm

[^51]: https://www.simplilearn.com/tutorials/data-structure-tutorial/bellman-ford-algorithm

[^52]: https://www.programiz.com/dsa/prim-algorithm

[^53]: https://stackoverflow.blog/2022/01/31/the-complete-beginners-guide-to-dynamic-programming/

[^54]: https://www.w3schools.com/dsa/dsa_ref_dynamic_programming.php

[^55]: https://www.spiceworks.com/tech/devops/articles/what-is-dynamic-programming/

[^56]: https://www.masaischool.com/blog/understanding-dynamic-programming-101/

[^57]: https://github.com/slevis13/Strassen

[^58]: https://stackoverflow.com/questions/4980757/how-do-hashtables-deal-with-collisions

[^59]: https://www.reddit.com/r/learnprogramming/comments/1ac9zbl/dynamic_programming_what_is_it_exactly_for_me_its/

[^60]: https://en.wikipedia.org/wiki/Strassen_algorithm

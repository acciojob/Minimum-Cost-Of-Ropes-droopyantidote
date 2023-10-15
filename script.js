function minCostOfRopes(ropes) {
  // Convert the input string into an array of integers
  const ropeLengths = ropes.split(',').map(Number);

  // Create a min-heap using a priority queue
  const priorityQueue = new MinHeap();

  // Add all the rope lengths to the priority queue
  ropeLengths.forEach((length) => {
    priorityQueue.insert(length);
  });

  // Initialize the total cost
  let totalCost = 0;

  // Continue connecting ropes until there's only one rope left
  while (priorityQueue.size() > 1) {
    // Get the two shortest ropes
    const firstRope = priorityQueue.extractMin();
    const secondRope = priorityQueue.extractMin();

    // Calculate the cost of connecting them and add it to the total cost
    const cost = firstRope + secondRope;
    totalCost += cost;

    // Insert the new rope (connected rope) back into the priority queue
    priorityQueue.insert(cost);
  }

  // Return the total minimum cost
  return totalCost;
}

// Implementation of MinHeap
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        // Swap the elements if the current element is smaller than its parent
        [this.heap[currentIndex], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[currentIndex],
        ];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }

  sinkDown(currentIndex) {
    const leftIndex = 2 * currentIndex + 1;
    const rightIndex = 2 * currentIndex + 2;
    let smallestIndex = currentIndex;

    if (leftIndex < this.size() && this.heap[leftIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftIndex;
    }
    if (rightIndex < this.size() && this.heap[rightIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightIndex;
    }

    if (smallestIndex !== currentIndex) {
      [this.heap[currentIndex], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[currentIndex],
      ];
      this.sinkDown(smallestIndex);
    }
  }

  size() {
    return this.heap.length;
  }
}

// Get the input element and result element
const inputElement = document.querySelector('input[type="text"]');
const resultElement = document.getElementById('result');

// Add an event listener to handle the input and display the result
inputElement.addEventListener('change', () => {
  const inputText = inputElement.value;
  const minCost = minCostOfRopes(inputText);
  resultElement.textContent = minCost;
});

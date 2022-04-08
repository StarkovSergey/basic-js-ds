const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  getUnderlyingList() {
    return this.head;
  }

  enqueue(value) {
    if (this.length === 0) { // если ещё нет элементов в списке
      this.head = new ListNode(value);
    } else {
      let current = this.head; // получаем ссылку на текущий элемент. В данном случае, это начало списка
      // move to the last node
      while (current.next) { // будет двигаться пока поле next не будет null
        current = current.next;
      }
      current.next = new ListNode(value); // создаём узел
    }

    this.length++;
  }

  dequeue() {
    const result = this.head.value;
    this.head = this.head.next;
    return result;
  }
}

module.exports = {
  Queue
};

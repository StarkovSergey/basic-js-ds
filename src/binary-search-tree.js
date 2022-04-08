const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }


  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = addWithin(this.treeRoot, data);

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchWithin(this.treeRoot, data);

    function searchWithin(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data
        ? searchWithin(node.left, data)
        : searchWithin(node.right, data);
    }
  }

  find(data) {
    return search(this.treeRoot, data);

    function search(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data
        ? search(node.left, data)
        : search(node.right, data);
    }
  }

  remove(data) {
    this.treeRoot = removeNode(this.treeRoot, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data); // положить в левое поддерево результат без уделенного элемента
        return node; // вернём текущий подузел наверх, чтобы положить его в корень дерева
      } if (node.data < data) {
        node.right = removeNode(node.right, data); // удали в правом поддереве значение data, а результат положи в node.right
        return node; // верни обновлённое поддерево
      } // equal - should remove this item
      if (!node.left && !node.right) { // вдруг это лист - у него нет ни правого, ни левого поддерева
        // pull null instead of item
        return null;
      }

      if (!node.left) {
        // set right child instead of item
        node = node.right;
        return node;
      }

      if (!node.right) {
        // set left child instead of item
        node = node.left;
        return node;
      }

      // both children exists for this item
      let minFromRight = node.right;
      while (minFromRight.left) { // находим минимальный элемент
        minFromRight = minFromRight.left; // пока элемент слева есть, мы к нему перемещаемся
      }
      node.data = minFromRight.data; // копируем значение минимального элемента в удаляемый узел

      node.right = removeNode(node.right, minFromRight.data); // удаляем узел в минимальный значением из правого поддерева

      return node;
    }
  }

  min() {
    if (!this.treeRoot) {
      return;
    }

    let node = this.treeRoot;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.treeRoot) {
      return;
    }

    let node = this.treeRoot;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};

const tree = new BinarySearchTree();

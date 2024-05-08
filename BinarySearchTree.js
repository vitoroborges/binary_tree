import Node from "./Node.js";

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(word, meaning) {
    const newNode = new Node(word, meaning);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.word < node.word) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  remove(word) {
    this.root = this.removeNode(this.root, word);
  }

  removeNode(node, word) {
    if (node === null) {
      return null;
    } else if (word < node.word) {
      node.left = this.removeNode(node.left, word);
      return node;
    } else if (word > node.word) {
      node.right = this.removeNode(node.right, word);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      let aux = this.findMinNode(node.right);
      node.word = aux.word;
      node.meaning = aux.meaning;

      node.right = this.removeNode(node.right, aux.word);
      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  inorderList(node) {
    let list = [];
    this.inorder(node, list);
    return list;
  }

  inorder(node, list) {
    if (node !== null) {
      this.inorder(node.left, list);
      list.push({ word: node.word, meaning: node.meaning });
      this.inorder(node.right, list);
    }
  }

  preorderList(node) {
    let list = [];
    this.preorder(node, list);
    return list;
  }

  preorder(node, list) {
    if (node !== null) {
      list.push({ word: node.word, meaning: node.meaning });
      this.preorder(node.left, list);
      this.preorder(node.right, list);
    }
  }

  postorderList(node) {
    let list = [];
    this.postorder(node, list);
    return list;
  }

  postorder(node, list) {
    if (node !== null) {
      this.postorder(node.left, list);
      this.postorder(node.right, list);
      list.push({ word: node.word, meaning: node.meaning });
    }
  }

  getRootNode() {
    return this.root;
  }

  search(node, word) {
    if (node === null) {
      return null;
    } else if (word < node.word) {
      return this.search(node.left, word);
    } else if (word > node.word) {
      return this.search(node.right, word);
    } else {
      return node;
    }
  }
}

import { BinarySearchTree } from "./BinarySearchTree.js";
import express from "express";
im":NvimTreeToggle<cr>", optsport fs from "fs";
import cors from "cors"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let tree = new BinarySearchTree();
fs.readFile("Dicionário Aurélia.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Erro ao ler o arquivo de texto.", err);
    return;
  }

  const lines = shuffleArray(data.split("\n"));
  lines.forEach((line) => {
    const [word, meaning] = line.split(" - ");
    if (word && meaning) {
      tree.insert(word.trim(), meaning.trim());
    }
  });
});

app.get("/dictionary", (req, res) => {
  res.json(tree.getRootNode());
});

app.post("/dictionary", (req, res) => {
  const word = req.body.word;
  const meaning = req.body.meaning;
  tree.insert(word, meaning);
  res.json(tree.getRootNode());
});

app.delete("/dictionary/:word", (req, res) => {
  const word = req.params.word;
  tree.remove(word);
  res.json(tree.getRootNode());
});

app.get("/inorder", (req, res) => {
  res.json(tree.inorderList(tree.getRootNode()));
});

app.get("/preorder", (req, res) => {
  res.json(tree.preorderList(tree.getRootNode()));
});

app.get("/postorder", (req, res) => {
  res.json(tree.postorderList(tree.getRootNode()));
});

app.listen(port);

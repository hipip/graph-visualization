import { graph } from "../classes/Settings.js";
import { isConnected, isTree } from "../classes/Algorithms.js";

const GraphInfosArea = () => {
  const container = document.createElement("div");
  container.classList.add("graph-infos-area");
  const header = document.createElement("h1");
  header.textContent = "TP GO 1";
  header.classList.add("main-title");

  const order = document.createElement("p");
  order.textContent = `Ordre: ${graph.order()}`;
  order.classList.add("graph-order");

  const size = document.createElement("p");
  size.textContent = `Taille: ${graph.size()}`;
  size.classList.add("graph-size");

  const isconnected = document.createElement("p");
  isconnected.textContent = `Connexe? ${isConnected(graph) ? "Vrai" : "Faux"}`;
  isconnected.classList.add("graph-connected");

  const istree = document.createElement("p");
  istree.textContent = `Arbre? ${isTree(graph) ? "Vrai" : "Faux"}`;
  istree.classList.add("graph-is-tree");

  container.appendChild(header);
  container.appendChild(order);
  container.appendChild(size);
  container.appendChild(isconnected);
  container.appendChild(istree);

  return container;
};

const updateGraphInfosArea = () => {
  document.querySelector(
    ".graph-order"
  ).textContent = `Ordre: ${graph.order()}`;
  document.querySelector(".graph-size").textContent = `Taille: ${graph.size()}`;
  document.querySelector(".graph-connected").textContent = `Connexe? ${
    isConnected(graph) ? "Vrai" : "Faux"
  }`;
  document.querySelector(".graph-is-tree").textContent = `Arbre? ${
    isTree(graph) ? "Vrai" : "Faux"
  }`;
};

export { GraphInfosArea, updateGraphInfosArea };

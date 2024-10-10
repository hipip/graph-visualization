import { graph } from "../classes/Settings.js";

const GraphInfosArea = () => {
  const container = document.createElement("div");
  container.classList.add("graph-infos-area");
  const header = document.createElement("h1");
  header.textContent = "TP Graphes et Optimisation";
  header.classList.add("main-title");

  const order = document.createElement("p");
  order.textContent = `Ordre ${graph.order()}`;
  order.classList.add("graph-order");

  const size = document.createElement("p");
  size.textContent = `Taille ${graph.size()}`;
  size.classList.add("graph-size");

  container.appendChild(header);
  container.appendChild(order);
  container.appendChild(size);
  return container;
};

const updateGraphInfosArea = () => {
  document.querySelector(".graph-order").textContent = `Ordre ${graph.order()}`;
  document.querySelector(".graph-size").textContent = `Taille ${graph.size()}`;
};

export { GraphInfosArea, updateGraphInfosArea };

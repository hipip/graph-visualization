import { popup } from "../components/popup.js";
import {
  getNodeById,
  getSelectedNode,
  highlightEdge,
  highlightNode,
  resetGraph,
} from "../utils/Dom.js";
import { graph } from "./Settings.js";

const distanceAlgorithm = async () => {
  const selected = getSelectedNode();
  if (!selected) {
    document.body.appendChild(popup("Please select a node first !", "#dc143c"));
  } else {
    const queue = [];
    document.querySelector("#graph-area").classList.add("animation");
    selected.classList.remove("selected");
    const selectedId = +selected.getAttribute("data-id");

    queue.push(selectedId);
    highlightNode(selectedId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    while (queue.length) {
      const current = queue.shift();
      for (const neighbor of graph.getNeighbors(current)) {
        if (!getNodeById(neighbor).classList.contains("highlighted")) {
          highlightEdge(current, neighbor);
          await new Promise((resolve) => setTimeout(resolve, 500));
          highlightNode(neighbor);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          queue.push(neighbor);
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
    resetGraph();
  }
};

export { distanceAlgorithm };

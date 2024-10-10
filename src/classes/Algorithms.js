import { popup } from "../components/popup.js";
import {
  getNodeById,
  getSelectedNode,
  highlightEdge,
  highlightNode,
  resetGraph,
  selectNode,
  unselectNodes,
  updateDistance,
} from "../utils/Dom.js";
import { graph } from "./Settings.js";

const distanceAlgorithm = async () => {
  const startNode = getSelectedNode();
  if (!startNode) {
    document.body.appendChild(popup("Please select a node first !", "#dc143c"));
  } else {
    const queue = [];
    const distances = {};
    const visited = new Set();

    document.querySelector("#graph-area").classList.add("animation");
    const startNodeId = +startNode.getAttribute("data-id");

    distances[startNodeId] = 0;
    queue.push(startNodeId);
    visited.add(startNodeId);
    highlightNode(startNodeId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    while (queue.length > 0) {
      const current = queue.shift();
      selectNode(current);

      for (const neighbor of graph.getNeighbors(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          distances[neighbor] = distances[current] + 1;

          highlightEdge(current, neighbor);
          await new Promise((resolve) => setTimeout(resolve, 800));

          highlightNode(neighbor);
          updateDistance(neighbor, distances[neighbor]);
          await new Promise((resolve) => setTimeout(resolve, 1600));
          queue.push(neighbor);
        }
      }
      unselectNodes();
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
    resetGraph();
  }
};

export { distanceAlgorithm };

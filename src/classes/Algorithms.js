import { popup } from "../components/popup.js";
import {
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
    document.body.appendChild(
      popup("Veuillez selectionner un sommet de départ !", "#dc143c")
    );
  } else {
    document.querySelector("#graph-area").classList.add("animation");
    const startNodeId = +startNode.getAttribute("data-id");

    const queue = [];
    const distances = {};
    const visited = new Set();

    distances[startNodeId] = 0;
    updateDistance(startNodeId, 0);
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
    await new Promise((resolve) => setTimeout(resolve, 5000));
    resetGraph();
  }
};

// return all the reached nodes from a DFS traversal
const DFS = (graph, s, visited = {}, reached = new Set()) => {
  if (visited[s]) return reached;
  visited[s] = true;
  reached.add(s);
  for (const neighbor of graph.getNeighbors(s))
    if (!visited[neighbor]) DFS(graph, neighbor, visited, reached);
  return [...reached];
};

const isConnected = (graph) => {
  if (graph.order()) {
    const startingNode = graph.getRandomNode();
    const reachedNodes = DFS(graph, startingNode);
    if (reachedNodes.length === graph.order()) return true;
  }
  return false;
};

const isTree = (graph) => {
  return isConnected(graph) && graph.size() == graph.order() - 1;
};

export { distanceAlgorithm, isConnected, isTree };

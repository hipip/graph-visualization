import { popup } from "../components/popup.js";
import { randomColor } from "../utils/Colors.js";
import {
  colorizeNode,
  getSelectedNode,
  hideGraphAreaTwo,
  highlightEdge,
  highlightNode,
  resetColors,
  resetGraph,
  resetGraphAreaTwo,
  selectNode,
  showGraphAreaTwo,
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

    for (const node of graph.nodes) {
      distances[node.id] = Infinity;
      updateDistance(node.id, distances[node.id]);
    }

    distances[startNodeId] = 0;
    updateDistance(startNodeId, distances[startNodeId]);
    queue.push(startNodeId);
    visited.add(startNodeId);
    highlightNode(startNodeId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    while (queue.length > 0) {
      const current = queue.shift();
      selectNode(current);
      await new Promise((resolve) => setTimeout(resolve, 800));

      for (const neighbor of graph.getNeighbors(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);

          highlightEdge(current, neighbor);
          await new Promise((resolve) => setTimeout(resolve, 800));

          highlightNode(neighbor);
          distances[neighbor] = distances[current] + 1;
          updateDistance(neighbor, distances[neighbor]);
          await new Promise((resolve) => setTimeout(resolve, 1600));
          queue.push(neighbor);
        }
      }
      unselectNodes();
    }
  }
};

// return all the reached nodes from a DFS traversal
const DFS = (graph, start) => {
  const visited = new Set();
  const reached = new Set();

  const dfsHelper = (node) => {
    if (visited.has(node)) return;
    visited.add(node);
    reached.add(node);

    for (const neighbor of graph.getNeighbors(node)) {
      dfsHelper(neighbor); // No need to check visited again
    }
  };

  dfsHelper(start); // Start the recursive DFS from the initial node
  return [...reached]; // Convert the Set to an array only when returning
};

const isConnected = (graph) => {
  const n = graph.order();
  if (n) {
    const startingNode = graph.getRandomNode();
    const reachedNodes = DFS(graph, startingNode);
    if (reachedNodes.length === n) return true;
  }
  return false;
};

const isTree = (graph) => {
  return isConnected(graph) && graph.size() == graph.order() - 1;
};

const transitiveClosure = () => {
  resetGraphAreaTwo();
  showGraphAreaTwo();
  const clonned = graph.clone("graph-area-two");
  for (const node of clonned.nodes) {
    const reachedNodes = DFS(clonned, node.id);
    for (const reachedNode of reachedNodes) {
      if (node.id !== reachedNode) clonned.addEdge(node.id, reachedNode, true);
    }
  }
};

const welshPowellColoring = () => {
  resetColors();
  for (const node of graph.nodes) node.color = undefined;

  const nodes = graph.nodes.sort((u, v) =>
    graph.nodeDegree(u.id) > graph.nodeDegree(v.id) ? -1 : 1
  );
  let k;
  let cpt = 0;
  let chromaticNumber = 0;
  let res = [];
  for (let i = 0; i < nodes.length; i++) {
    const u = nodes[i];
    if (!u.color) {
      k = randomColor();
      chromaticNumber++;
      u.color = k;
      colorizeNode(u.id, u.color);
      cpt++;
      res.push([u.id, chromaticNumber]);

      for (let j = 0; j < nodes.length; j++) {
        const v = nodes[j];
        if (
          !v.color &&
          !graph
            .getNeighborsNodes(v.id)
            .some((neighbor) => neighbor.color === k)
        ) {
          v.color = k;
          colorizeNode(v.id, v.color);
          res.push([v.id, chromaticNumber]);
          cpt++;
        }
      }
    }
    if (cpt === graph.order()) break;
  }
  console.log("nombre chromatique = ", chromaticNumber);
  console.log(res);
};

const dsaturColoring = () => {
  resetColors();
  const nodes = graph.nodes.map((node) => ({
    id: node.id,
    degree: graph.nodeDegree(node.id),
    saturation: 0,
    color: null,
  }));

  // Trier les sommets par degré décroissant
  nodes.sort((a, b) => b.degree - a.degree);

  const colors = [];

  // tant qu'il reste des sommets non colorés
  while (nodes.some((node) => node.color === null)) {
    // Trie les sommets par saturation décroissante. En cas d'égalité, utilise le degré.
    nodes.sort((a, b) => {
      if (b.saturation !== a.saturation) return b.saturation - a.saturation;
      return b.degree - a.degree;
    });

    // Sélectionne le sommet non coloré avec la saturation maximale
    const node = nodes.find((n) => n.color === null);

    // Récupère les couleurs utilisées par les voisins du sommet
    const neighborColors = new Set(
      graph.getNeighbors(node.id).map((neighbor) => {
        const neighborNode = nodes.find((n) => n.id === neighbor);
        return neighborNode ? neighborNode.color : null; // Prend la couleur du voisin si elle existe
      })
    );

    // Cherche la plus petite couleur disponible pour ce sommet
    let color = colors.find((c) => !neighborColors.has(c));
    if (!color) {
      // Si aucune couleur existante n'est disponible, génère une nouvelle couleur
      color = randomColor();
      colors.push(color);
    }

    // Associe la couleur au sommet
    node.color = color;
    colorizeNode(node.id, color);

    // Met à jour la saturation de tous les voisins non colorés
    graph.getNeighbors(node.id).forEach((neighbor) => {
      const neighborNode = nodes.find((n) => n.id === neighbor);
      if (neighborNode && neighborNode.color === null) {
        neighborNode.saturation++; // Incrémente la saturation (nouvelle couleur ajoutée)
      }
    });
  }

  // Affiche le nombre chromatique (nombre de couleurs utilisées)
  console.log("Nombre chromatique", colors.length);
};

const reset = () => {
  resetGraph();
  resetColors();
  hideGraphAreaTwo();
};

export {
  distanceAlgorithm,
  isConnected,
  isTree,
  transitiveClosure,
  welshPowellColoring as coloringWelshPowell,
  reset,
  dsaturColoring,
};

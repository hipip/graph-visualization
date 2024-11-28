import { GraphArea } from "../components/GraphArea.js";
import HelpScreen from "../components/HelpScreen.js";

const getNodeById = (id) => {
  return document.querySelector(`.node[data-id="${id}"]`);
};

const colorizeNode = (id, color) => {
  const n = getNodeById(id).querySelector(".node-circle");
  if (n) n.style.fill = color;
};

const getEdge = (node1Id, node2Id) => {
  const e = document.querySelector(`.edge[data-id="${node1Id},${node2Id}"]`);
  if (e) return e;
  else {
    const e = document.querySelector(`.edge[data-id="${node2Id},${node1Id}"]`);
    if (e) return e;
    else return false;
  }
};

const getSelectedNode = () => document.querySelector(".node.selected");

const getSelectedEdge = () => document.querySelector(".edge.selected");

const selectNode = (id) => {
  getNodeById(id).classList.add("selected");
};

const unselectNodes = () => {
  [...document.querySelectorAll(".node.selected")].forEach((node) =>
    node.classList.remove("selected")
  );
};

const highlightNode = (id) => {
  getNodeById(id).classList.add("highlighted");
};

const highlightEdge = (node1Id, node2Id) => {
  const edge = getEdge(node1Id, node2Id);
  if (edge) {
    edge.classList.add("highlighted");
  } else {
    return false;
  }
};

const updateDistance = (id, dist) => {
  const distLabel = document.querySelector(
    `.node[data-id="${id}"] .node-distance-label`
  );
  distLabel.textContent = dist === Infinity ? "∞" : dist;
};

const resetGraphAreaTwo = () => {
  document.querySelector("#graph-area-two").remove();
  document.querySelector("#main-area").appendChild(GraphArea("graph-area-two"));
};

const showGraphAreaTwo = () => {
  document.querySelector("#graph-area-two").classList.add("active");
};

const hideGraphAreaTwo = () => {
  document.querySelector("#graph-area-two").classList.remove("active");
};

const resetGraph = () => {
  [...document.querySelectorAll(".highlighted")].forEach((elem) => {
    elem.classList.remove("highlighted");
  });
  [...document.querySelectorAll(".node-distance-label")].forEach(
    (distLabel) => {
      distLabel.textContent = "0";
    }
  );
  unselectNodes();
  document.querySelector("#graph-area").classList.remove("animation");
};

const resetColors = () => {
  [...document.querySelectorAll(".node-circle")].forEach(
    (nodeCircle) => (nodeCircle.style.fill = "")
  );
};

const showHelpScreen = () => {
  if (!document.querySelector("#help-screen"))
    document.body.appendChild(HelpScreen());
};

export {
  getNodeById,
  colorizeNode,
  getSelectedNode,
  getSelectedEdge,
  highlightNode,
  highlightEdge,
  updateDistance,
  selectNode,
  unselectNodes,
  resetGraphAreaTwo,
  resetGraph,
  resetColors,
  showGraphAreaTwo,
  hideGraphAreaTwo,
  showHelpScreen,
};

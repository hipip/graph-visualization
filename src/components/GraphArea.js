import { graph } from "../classes/Settings.js";
import { getSelectedEdge, getSelectedNode } from "../utils/Dom.js";
import { updateGraphInfosArea } from "./GraphInfosArea.js";

var count = 1;

const addNode = (e) => {
  const { offsetX: x, offsetY: y } = e;
  graph.addNode(count, count, x, y);
  count++;
  updateGraphInfosArea();
};

const deleteNode = (e) => {
  const key = e.key;
  const selectedNode = getSelectedNode();
  const selectedEdge = getSelectedEdge();
  if (key === "Delete") {
    if (selectedNode)
      graph.removeNode(parseInt(selectedNode.getAttribute("data-id")));

    if (selectedEdge) {
      const [nodeId1, nodeId2] = selectedEdge
        .getAttribute("data-id")
        .split(",");
      graph.removeEdge(+nodeId1, +nodeId2);
    }
    updateGraphInfosArea();
  }
};

export const GraphArea = (id) => {
  const mainContainer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  mainContainer.setAttribute("id", id);

  window.onload = () => {
    mainContainer.setAttribute(
      "viewBox",
      `0 0 ${mainContainer.clientWidth} ${window.innerHeight * 0.8}`
    );
  };

  window.addEventListener("resize", () => {
    mainContainer.setAttribute(
      "viewBox",
      `0 0 ${mainContainer.clientWidth} ${window.innerHeight * 0.8}`
    );
  });

  const nodesContainer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );
  nodesContainer.setAttribute("id", "nodes-container");

  const edgesContainer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );
  edgesContainer.setAttribute("id", "edges-container");

  mainContainer.addEventListener("dblclick", addNode);
  window.addEventListener("keydown", deleteNode);

  mainContainer.appendChild(edgesContainer);
  mainContainer.appendChild(nodesContainer);

  return mainContainer;
};

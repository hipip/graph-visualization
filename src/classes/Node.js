import { updateGraphInfosArea } from "../components/GraphInfosArea.js";
import { graph, nodeRadius } from "./Settings.js";
import { transitiveClosure } from "./Algorithms.js";

export default class Node {
  constructor(id, name, x, y) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.element = this.createNodeElement();
  }

  createNodeElement() {
    const container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    container.classList.add("node");
    container.setAttribute("data-id", this.id);
    container.setAttribute("x", this.x);
    container.setAttribute("y", this.y);
    container.addEventListener("click", this.nodeClick);

    const node = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    node.setAttribute("r", nodeRadius);
    node.setAttribute("cx", +this.x);
    node.setAttribute("cy", +this.y);
    node.classList.add("node-circle");

    const nodeLabel = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    nodeLabel.setAttribute("x", +this.x);
    nodeLabel.setAttribute("y", +this.y);
    nodeLabel.setAttribute("dominant-baseline", "middle");
    nodeLabel.setAttribute("text-anchor", "middle");
    nodeLabel.textContent = this.name;
    nodeLabel.classList.add("node-label");

    const distanceLabel = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    distanceLabel.setAttribute("x", this.x - nodeRadius - 5);
    distanceLabel.setAttribute("y", this.y - nodeRadius - 5);
    distanceLabel.classList.add("node-distance-label");

    container.appendChild(node);
    container.appendChild(nodeLabel);
    container.appendChild(distanceLabel);

    return container;
  }

  nodeClick(e) {
    if (e.currentTarget.classList.contains("selected")) {
      e.currentTarget.classList.remove("selected");
    } else {
      const selected = document.querySelector(".node.selected");
      if (!selected) {
        e.currentTarget.classList.add("selected");
      } else {
        const nodeId1 = selected.getAttribute("data-id");
        const nodeId2 = e.currentTarget.getAttribute("data-id");
        graph.addEdge(nodeId1, nodeId2);
        updateGraphInfosArea();
        selected.classList.remove("selected");
      }
    }
  }
  render(containerId) {
    document
      .querySelector(`#${containerId} #nodes-container`)
      .appendChild(this.element);
  }
}

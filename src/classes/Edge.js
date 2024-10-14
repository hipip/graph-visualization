import { getNodeById } from "../utils/Dom.js";

export default class Edge {
  constructor(nodeId1, nodeId2, special = false) {
    this.nodeId1 = nodeId1;
    this.nodeId2 = nodeId2;
    this.special = special;
    this.element = this.createEdgeElement();
  }

  createEdgeElement() {
    const edge = document.createElementNS("http://www.w3.org/2000/svg", "path");
    edge.classList.add("edge");
    edge.setAttribute("data-id", `${this.nodeId1},${this.nodeId2}`);
    edge.addEventListener("click", this.selectEdge);

    if (this.special) edge.classList.add("special-edge");

    const node1 = getNodeById(this.nodeId1);
    const node2 = getNodeById(this.nodeId2);

    const node1X = node1.getAttribute("x");
    const node1Y = node1.getAttribute("y");
    const node2X = node2.getAttribute("x");
    const node2Y = node2.getAttribute("y");

    edge.setAttribute("d", `M${node1X} ${node1Y} L${node2X} ${node2Y} Z`);

    return edge;
  }

  selectEdge(e) {
    e.currentTarget.classList.toggle("selected");
  }

  render(containerId) {
    document
      .querySelector(`#${containerId} #edges-container`)
      .appendChild(this.element);
  }
}

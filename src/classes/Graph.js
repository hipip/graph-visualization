import { getNodeById } from "../utils/Dom.js";
import Edge from "./Edge.js";
import Node from "./Node.js";

export default class Graph {
  constructor(nodes = [], edges = []) {
    this.nodes = nodes;
    this.edges = edges;
  }

  addNode(id, name, x, y) {
    if (this.hasNode(+id)) {
      console.log("node with Id " + id + " already exits");
      return false;
    } else {
      const newNode = new Node(id, name, x, y);
      this.nodes.push(newNode);
      newNode.render();
      return newNode;
    }
  }

  hasNode(id) {
    return this.nodes.some((node) => node.id === id);
  }

  removeNode(id) {
    const toRemove = this.nodes.find((node) => node.id === id);
    console.log(id);
    // remove dom node
    toRemove.element.remove();
    // remove dom edges
    this.edges.forEach((edge) => {
      if (edge.nodeId1 === id || edge.nodeId2 === id) edge.element.remove();
    });
    // remove node from nodes array
    this.nodes = this.nodes.filter((node) => node.id !== id);
    // remove edges associated with removed node
    this.edges = this.edges.filter(
      (edge) => edge.nodeId1 !== id && edge.nodeId2 !== id
    );
  }

  addEdge(nodeId1, nodeId2) {
    const alreadyExists = this.edges.find(
      (e) =>
        (e.nodeId1 == nodeId1 && e.nodeId2 == nodeId2) ||
        (e.nodeId1 == nodeId2 && e.nodeId2 == nodeId1)
    );
    if (alreadyExists) {
      console.log("Edge Already Exists");
      return false;
    } else {
      const node1 = getNodeById(nodeId1);
      const node2 = getNodeById(nodeId2);
      if (node1 && node2) {
        const newEdge = new Edge(parseInt(nodeId1), parseInt(nodeId2));
        newEdge.render();
        this.edges.push(newEdge);
        return newEdge;
      } else {
        console.log("Error adding edge");
        return false;
      }
    }
  }

  removeEdge(nodeId1, nodeId2) {
    const toRemove = this.edges.find(
      (edge) =>
        (edge.nodeId1 === nodeId1 && edge.nodeId2 == nodeId2) ||
        (edge.nodeId1 === nodeId2 && edge.nodeId2 == nodeId1)
    );

    if (toRemove) {
      toRemove.element.remove();
      this.edges.splice(this.edges.indexOf(toRemove), 1);
      return true;
    } else {
      return false;
    }
  }

  getNeighbors(id) {
    const neighbors = [];
    for (const edge of this.edges) {
      if (edge.nodeId1 === id) {
        neighbors.push(edge.nodeId2);
      } else if (edge.nodeId2 == id) {
        neighbors.push(edge.nodeId1);
      }
    }
    return neighbors;
  }

  getRandomNode() {
    if (this.nodes.length)
      return this.nodes[Math.floor(Math.random() * this.nodes.length)].id;
  }

  order() {
    return this.nodes.length;
  }

  size() {
    return this.edges.length;
  }
}

const getNodeById = (id) => {
  return document.querySelector(`.node[data-id="${id}"]`);
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

const resetGraph = () => {
  [...document.querySelectorAll(".highlighted")].forEach((elem) => {
    elem.classList.remove("highlighted");
    document.querySelector("#graph-area").classList.remove("animation");
  });
};

export {
  getNodeById,
  getSelectedNode,
  getSelectedEdge,
  highlightNode,
  highlightEdge,
  resetGraph,
};

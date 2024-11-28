const HelpScreen = () => {
  const cont = document.createElement("div");
  const closeBtn = document.createElement("button");

  closeBtn.type = "button";
  closeBtn.textContent = "X";
  closeBtn.id = "close-help-screen";
  closeBtn.onclick = () => {
    cont.classList.add("close");
    cont.ontransitionend = () => {
      cont.remove();
    };
  };

  cont.id = "help-screen";

  cont.appendChild(closeBtn);
  const title = document.createElement("h1");
  title.textContent = "Help";
  cont.appendChild(title);
  cont.appendChild(document.createTextNode("• Double click to add a node"));
  cont.appendChild(document.createElement("br"));
  cont.appendChild(
    document.createTextNode("• Click del to remove selected node/edge")
  );
  cont.appendChild(document.createElement("br"));
  cont.appendChild(
    document.createTextNode(
      "• Select a node and click on another one to add an edge between them"
    )
  );

  return cont;
};

export default HelpScreen;

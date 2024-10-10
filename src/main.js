import { distanceAlgorithm } from "./classes/Algorithms.js";
import { AnimArea } from "./components/AnimArea.js";
import { Button } from "./components/Button.js";
import { ButtonsArea } from "./components/ButtonsArea.js";
import { GraphArea } from "./components/GraphArea.js";
import { GraphInfosArea } from "./components/GraphInfosArea.js";

const BODY = document.body;

(() => {
  const container = document.createElement("div");
  container.setAttribute("id", "main-area");
  container.appendChild(GraphArea());
  container.appendChild(AnimArea());

  const btnsArea = ButtonsArea();
  btnsArea.appendChild(Button("calcul distance", "#dc143c", distanceAlgorithm));

  BODY.appendChild(GraphInfosArea());
  BODY.appendChild(container);
  BODY.appendChild(btnsArea);
})();

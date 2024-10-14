import { distanceAlgorithm, transitiveClosure } from "./classes/Algorithms.js";
import { graph } from "./classes/Settings.js";
import { Button } from "./components/Button.js";
import { ButtonsArea } from "./components/ButtonsArea.js";
import { GraphArea } from "./components/GraphArea.js";
import { GraphInfosArea } from "./components/GraphInfosArea.js";

const BODY = document.body;

(() => {
  const container = document.createElement("div");
  container.setAttribute("id", "main-area");
  container.appendChild(GraphArea("graph-area"));
  container.appendChild(GraphArea("graph-area-two"));

  const btnsArea = ButtonsArea();
  btnsArea.appendChild(Button("Calcul distance", "#dc143c", distanceAlgorithm));
  btnsArea.appendChild(
    Button("Fermeture Transitive", "#b047ff", transitiveClosure)
  );

  BODY.appendChild(GraphInfosArea());
  BODY.appendChild(container);
  BODY.appendChild(btnsArea);
})();

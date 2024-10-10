const popup = (content, bgcolor) => {
  const cont = document.createElement("div");
  cont.classList.add("popup");
  cont.style.setProperty("--bg-color", bgcolor);

  const p = document.createElement("p");
  p.innerText = content;
  p.classList.add("popup-text");

  cont.appendChild(p);
  setTimeout(() => {
    cont.classList.add("fade-out");

    cont.addEventListener("transitionend", () => {
      cont.remove();
    });
  }, 3000);
  return cont;
};

export { popup };

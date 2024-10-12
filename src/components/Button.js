const Button = (content, color, onclick = () => {}) => {
  const btn = document.createElement("button");
  btn.style.setProperty("--main-color", color);
  btn.style.setProperty("--hover-color", color + "2F");
  btn.textContent = content;
  btn.classList.add("btn");
  btn.type = "button";
  btn.addEventListener("click", onclick);
  return btn;
};

export { Button };

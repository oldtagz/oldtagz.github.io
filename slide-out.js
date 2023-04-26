const SLIDE_OUT_IDS = ["menu", "checkout"];
const LISTENERS = SLIDE_OUT_IDS.reduce((acc, id) => ({
  ...acc,
  [id]: () => closeSlideOut(id),
}), {});

const openSlideOut = (id) => {
  document.getElementById(id).classList = "open slide-in";
  document.getElementById(`${id}-button`).style.opacity = "0";
  document.body.style.overflowY = "hidden";
  setTimeout(() => {
    document.body.addEventListener("click", LISTENERS[id]);
    document
      .getElementById(id)
      .addEventListener("click", (e) => e.stopPropagation());
  }, 250);
};

const closeSlideOut = (id) => {
  document.body.removeEventListener("click", LISTENERS[id]);
  const element = document.getElementById(id);
  document.getElementById(id).classList = "open slide-out";
  setTimeout(() => (element.classList = ""), 250);

  document.getElementById(`${id}-button`).style.opacity = "1";
  document.body.style.overflowY = "scroll";
};

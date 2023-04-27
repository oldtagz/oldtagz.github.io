const SLIDE_OUT_IDS = ["menu", "checkout"];
const LISTENERS = SLIDE_OUT_IDS.reduce(
  (acc, id) => ({
    ...acc,
    [id]: () => closeSlideOut(id),
  }),
  {}
);

const openSlideOut = (id) => {
  console.log("OK");
  document.getElementById(id).classList = "open slide-in";
  if (id === "menu")
    document.getElementById(`${id}-button`).classList += " close";
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
  if (id === "menu")
    document.getElementById(`${id}-button`).classList = id;
  const element = document.getElementById(id);
  document.getElementById(id).classList = "open slide-out";
  setTimeout(() => (element.classList = ""), 250);
  document.body.style.overflowY = "scroll";
};

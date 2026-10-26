function addLayer(id) {
  currentLayers().push(id);
  draw(currentLayers().length - 1);
}

function removeLayer(id) {
  const layers = currentLayers();
  const i = layers.lastIndexOf(id);
  if (i > -1) { layers.splice(i, 1); draw(); }
}

function applyText() {
  const x = text();
  document.title = x.title;
  $("ttl").textContent = isFries() ? x.titleFries : x.title;
  $("hint").textContent = isFries() ? x.hintFries : x.hint;
  $("ctat").textContent = x.add;
  $("donet").textContent = isFries() ? x.doneFries : x.done;
  $("again").textContent = x.again;

  document.querySelectorAll(".tabs button").forEach((b) => {
    b.textContent = b.dataset.m === "fries" ? x.tabFries : x.tabBurger;
    b.classList.toggle("on", b.dataset.m === state.mode);
  });
}

function setMode(mode) {
  state.mode = mode;
  applyText();
  renderSelector();
  renderGrid();
  draw(-1, true);
}

function setLang(lang) {
  state.lang = lang;
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";

  applyText();
  renderSelector();
  renderGrid();
  draw();
  document.querySelectorAll(".lang button").forEach((b) => b.classList.toggle("on", b.dataset.l === lang));
  try { localStorage.setItem("lang", lang); } catch (e) { }
}
document.querySelectorAll(".lang button").forEach((b) => (b.onclick = () => setLang(b.dataset.l)));
document.querySelectorAll(".tabs button").forEach((b) => (b.onclick = () => setMode(b.dataset.m)));

$("cta").onclick = () => {
  buildStack(els.stackDone);
  $("done").classList.add("show");
};

$("again").onclick = () => {
  state.layers[state.mode] = [];
  $("done").classList.remove("show");
  draw();
};

let savedLang = null;
try { savedLang = localStorage.getItem("lang"); } catch (e) { }
setLang(savedLang === "en" ? "en" : "ar");

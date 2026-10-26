const $ = (id) => document.getElementById(id);
const els = {
  selector: $("buns"),
  grid: $("grid"),
  stack: $("stack"),
  stackDone: $("stack2"),
  total: $("tot"),
  cta: $("cta"),
};

const money = (v) => `${CURRENCY} ${v.toFixed(2).replace(".", ",")}`;
const text = () => T[state.lang];

function renderSelector() {
  const x = text();
  els.selector.innerHTML = "";

  (isFries() ? SIZES : BUNS).forEach((opt, i) => {
    const thumb = isFries()
      ? `<img src="${ingredientImg(FRIES_IMG)}" alt="" style="height:${14 + i * 6}px">`
      : `<img src="${bunImg(opt.top)}" alt="" style="height:26px">`;
    const label = isFries() ? x.sizes[opt.id] : x.buns[opt.id];

    const btn = document.createElement("button");
    btn.className = "bun";
    btn.innerHTML = `<em>${thumb}</em><span>${label}</span>`;
    btn.onclick = () => {
      if (isFries()) state.size = i; else state.bun = i;
      draw(-1, true);
    };
    els.selector.append(btn);
  });
}

function renderGrid() {
  const x = text();
  els.grid.innerHTML = "";

  SETS[state.mode].forEach((id) => {
    const ing = getIngredient(id);
    const name = x.ing[id];

    const item = document.createElement("div");
    item.className = "ing";
    item.dataset.id = id;
    item.innerHTML = `
      <button class="ing" style="width:100%">
        <div class="sw"><img src="${ingredientImg(id)}" alt=""><span class="cnt"></span></div>
      </button>
      <button class="min" aria-label="${x.remove} ${name}">−</button>
      <div class="nm">${name}</div>
      <div class="pr">+ ${money(ing.price)}</div>`;

    item.querySelector(".ing").onclick = () => addLayer(id);
    item.querySelector(".min").onclick = (e) => { e.stopPropagation(); removeLayer(id); };
    els.grid.append(item);
  });
}

function layerHTML(ing, index, animate, zBase) {
  const top = (ing.h - ing.ph) / 2;
  return `
    <div class="l p ${animate ? "drop" : ""}"
         style="width:${ing.w}px;height:${ing.h}px;z-index:${index + zBase}">
      <img src="${ingredientImg(ing.id)}" alt="" style="height:${ing.ph}px;top:${top}px">
    </div>`;
}

function layersHTML(ids, animatedIndex, zBase) {
  let html = "", height = 0;
  for (let k = ids.length - 1; k >= 0; k--) {
    const ing = getIngredient(ids[k]);
    height += ing.h;
    html += layerHTML(ing, k, k === animatedIndex, zBase);
  }
  return { html, height };
}

function burgerHTML(animatedIndex, animateBase) {
  const bun = BUNS[state.bun];
  const { html, height } = layersHTML(currentLayers(), animatedIndex, 1);
  return {
    height: height + bun.topH + bun.botH,
    html: `
      <img class="bi ${animateBase ? "drop" : ""}" src="${bunImg(bun.top)}" alt=""
           style="width:${bun.topW}px;height:${bun.topH}px;z-index:999">
      ${html}
      <img class="bi" src="${bunImg(bun.bottom)}" alt=""
           style="width:${bun.botW}px;height:${bun.botH}px;z-index:0">`,
  };
}

function friesHTML(animatedIndex, animateBase) {
  const width = SIZES[state.size].width;
  const pileH = Math.round(width / FRIES_RATIO);
  const boxH = Math.round(pileH * 0.6);
  const { html, height } = layersHTML(currentLayers(), animatedIndex, 3);
  return {
    height: height + boxH + 34,
    html: `
      ${html}
      <div class="l p ${animateBase ? "drop" : ""}"
           style="width:${width}px;height:${boxH}px;z-index:1">
        <img src="${ingredientImg(FRIES_IMG)}" alt=""
             style="height:${pileH}px;top:${(boxH - pileH) / 2}px">
      </div>
      <div class="tray" style="width:${width - 14}px"></div>`,
  };
}

function buildStack(el, animatedIndex = -1, animateBase = false) {
  const { html, height } = isFries()
    ? friesHTML(animatedIndex, animateBase)
    : burgerHTML(animatedIndex, animateBase);
  el.innerHTML = html;
  el.style.transform = `scale(${Math.min(1, 365 / height)})`;
}

function draw(animatedIndex = -1, animateBase = false) {
  buildStack(els.stack, animatedIndex, animateBase);

  const selected = isFries() ? state.size : state.bun;
  [...els.selector.children].forEach((btn, i) => btn.classList.toggle("on", i === selected));

  const counts = countByIngredient();
  [...els.grid.children].forEach((item) => {
    const n = counts[item.dataset.id] || 0;
    item.classList.toggle("on", n > 0);
    item.querySelector(".cnt").textContent = `×${n}`;
  });

  els.total.textContent = money(totalPrice());
  els.cta.disabled = !isFries() && currentLayers().length === 0;
}

(function () {
  const CFG = window.BRAVION_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- names from config ---------- */
  $$("[data-brand]").forEach((el) => (el.textContent = CFG.brand?.name || "Bravion"));
  $$("[data-legal]").forEach((el) => (el.textContent = CFG.brand?.legalName || ""));
  $$("[data-sister]").forEach((el) => (el.textContent = CFG.brand?.sister || ""));
  $$("[data-area]").forEach((el) => (el.textContent = CFG.serviceArea?.label || "Dallas–Fort Worth"));
  const counties = $("#counties");
  if (counties) counties.innerHTML = (CFG.serviceArea?.counties || []).map((c) => `<span class="chip">${esc(c)} County</span>`).join("");

  $$("[data-markets]").forEach((el) => (el.textContent = (CFG.serviceArea?.commercialMarkets || ["Dallas–Fort Worth"]).join(" and ")));

  /* ---------- theme: colors, typefaces and logo from themes.js ---------- */
  const THEMES = window.BRAVION_THEMES || {};
  const themeKey = THEMES[CFG.theme] ? CFG.theme : "original";
  const TH = THEMES[themeKey] || {};
  if (TH.fonts) {
    const l = document.createElement("link"); l.rel = "stylesheet";
    l.href = `https://fonts.googleapis.com/css2?family=${TH.fonts}&display=swap`; document.head.appendChild(l);
  }
  if (TH.light) {
    const vars = (o) => Object.entries(o).map(([k, v]) => `--${k}:${v}`).join(";");
    const type = `--f-head:${TH.head};--f-ui:${TH.ui};--f-serif:${TH.serif};--f-word:${TH.wordFont || TH.ui};--hw:${TH.headWeight};--hc:${TH.headCase};--hls:${TH.headLs};--wc:${TH.wordCase};--wls:${TH.wordLs};--ww:${TH.wordWeight};--r:${TH.radius}`;
    const st = document.createElement("style");
    st.textContent = `:root{${vars(TH.light)};${type};color-scheme:light}`;
    document.head.appendChild(st);
  }
  document.documentElement.dataset.layout = TH.layout || themeKey; /* layouts.css gives each theme its own page structure */
  if (TH.variant) document.documentElement.classList.add(TH.variant);
  const tn = $("#themeName"); if (tn) tn.textContent = "Design: " + (TH.label || "Original");
  $$("[data-div-res]").forEach((el) => (el.textContent = CFG.brand?.divisions?.residential || "Residential"));
  $$("[data-div-com]").forEach((el) => (el.textContent = CFG.brand?.divisions?.commercial || "Commercial"));

  /* ---------- logo: config override, the theme's logo file, or a draft concept mark ---------- */
  const LOGO = CFG.brand?.logo || {};
  const MARKS = {
    pane: { name: "Window Pane", c: ["#24452F", "#B8893B", "#EFE9DC"], d: (a, b) => `<rect x="64" y="24" width="32" height="32" fill="${b}"/><rect x="20" y="20" width="80" height="80" fill="none" stroke="${a}" stroke-width="9"/><line x1="60" y1="20" x2="60" y2="100" stroke="${a}" stroke-width="8"/><line x1="20" y1="60" x2="100" y2="60" stroke="${a}" stroke-width="8"/>` },
    arch: { name: "Threshold Arch", c: ["#1C2B3A", "#C9A96E"], d: (a, b) => `<path d="M28 100 C28 14 92 14 92 100" fill="none" stroke="${a}" stroke-width="9"/><path d="M44 100 C44 46 76 46 76 100" fill="none" stroke="${b}" stroke-width="5"/><line x1="14" y1="102" x2="106" y2="102" stroke="${a}" stroke-width="5"/>` },
    starburst: { name: "Atomic Starburst", c: ["#2F8F8B", "#E2674A", "#F3E9D2"], d: (a, b, c) => { let s = ""; for (let i = 0; i < 8; i++) { const t = i * Math.PI / 4, r = i % 2 ? 40 : 52; s += `<line x1="${(60 + 22 * Math.cos(t)).toFixed(1)}" y1="${(60 + 22 * Math.sin(t)).toFixed(1)}" x2="${(60 + r * Math.cos(t)).toFixed(1)}" y2="${(60 + r * Math.sin(t)).toFixed(1)}" stroke="${a}" stroke-width="6" stroke-linecap="round"/>`; } return s + `<circle cx="60" cy="60" r="17" fill="${b}"/>`; } },
    stripes: { name: "Corporate Stripe", c: ["#1F3E8C"], d: (a) => `<defs><pattern id="lgst" width="10" height="9" patternUnits="userSpaceOnUse"><rect width="10" height="5.5" fill="${a}"/></pattern></defs><text x="60" y="98" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="104" fill="url(#lgst)">B</text>` },
    boomerang: { name: "Googie Boomerang", c: ["#F28C28", "#3BB3B0"], d: (a, b) => `<path d="M16 86 Q58 8 104 38 Q72 40 52 100 Z" fill="${b}"/><path d="M92 8 L95 18 L105 21 L95 24 L92 34 L89 24 L79 21 L89 18 Z" fill="${a}"/><circle cx="26" cy="30" r="5" fill="${a}"/>` },
    bauhaus: { name: "Geometric Doorway", c: ["#1B1B1B", "#C8402E", "#EEE8DA", "#E0A526"], d: (a, b, c, d) => `<rect x="34" y="52" width="52" height="50" fill="${a}"/><path d="M34 52 A26 26 0 0 1 86 52 Z" fill="${b}"/><circle cx="76" cy="80" r="4.5" fill="${c}"/><rect x="14" y="86" width="16" height="16" fill="${d}"/>` },
    wood: { name: "Molded Plywood", c: ["#6B4429", "#C36A2D", "#F2E6D0"], d: (a, b, c) => `<rect x="18" y="18" width="84" height="84" rx="26" fill="${a}"/><text x="60" y="84" text-anchor="middle" font-family="Georgia,serif" font-size="66" fill="${c}">B</text><circle cx="88" cy="32" r="6" fill="${b}"/>` },
    bands: { name: "Sunset Bands", c: ["#5A3A22", "#D9692B", "#E8B23A"], d: (a, b, c) => [[44, a], [31, b], [18, c]].map(([r, col]) => `<path d="M${60 - r} 98 A${r} ${r} 0 0 1 ${60 + r} 98" fill="none" stroke="${col}" stroke-width="12"/>`).join("") },
    slab: { name: "Precast Slab", c: ["#2B2B2A", "#A4471F"], d: (a, b) => `<rect x="24" y="20" width="20" height="80" fill="${a}"/><rect x="48" y="20" width="34" height="36" fill="${b}"/><rect x="48" y="60" width="42" height="40" fill="${a}"/>` }
  };
  const markSvg = (key) => { const m = MARKS[key] || MARKS.pane; return `<svg viewBox="0 0 120 120" aria-hidden="true">${m.d(...m.c)}</svg>`; };
  (function drawLogo() {
    const holder = $("#logoMark"), link = holder.closest(".logo");
    const src = LOGO.src || TH.logo?.src;
    if (LOGO.src) { holder.innerHTML = `<img src="${esc(LOGO.src)}" alt="${esc(LOGO.alt || "")}">`; link.classList.add("has-img"); }
    else if (src) { holder.innerHTML = `<img src="${esc(src)}" alt="">`; if (TH.logo?.chipInDark) holder.classList.add("chip-dark"); }
    else holder.innerHTML = markSvg(TH.logo?.mark);
    const fl = $("#footerLogo");
    if (fl) fl.innerHTML = (themeKey === "original" && CFG.brand?.footerLogo)
      ? `<img src="${esc(CFG.brand.footerLogo)}" alt="${esc(LOGO.alt || "Bravion")}">`
      : `<span style="display:flex;align-items:center;gap:10px"><span style="width:34px;height:34px;display:inline-flex;background:#fff;border-radius:4px;padding:3px">${markSvg(TH.logo?.mark)}</span><b style="font-family:var(--f-word);text-transform:var(--wc);letter-spacing:var(--wls);font-weight:var(--ww);font-size:18px">${esc(CFG.brand?.name || "Bravion")}</b></span>`;
  })();

  /* ---------- supply categories ---------- */
  const CATS = CFG.categories || [];
  const tags = (c) => c.uses.map((u) => `<span class="tagc">${esc(u)}</span>`).join("") + `<span class="tagc st">${esc(c.status || "Catalog in development")}</span>`;
  const catCard = (c, withPhoto) => `<article class="cat" id="cat-${esc(c.id)}">${withPhoto ? `<figure class="ph" data-slot="${esc(c.slot)}"></figure>` : ""}<div class="body"><h3>${esc(c.name)}</h3><p class="muted">${esc(c.desc)}</p><div class="tags">${tags(c)}</div><a class="btn ghost" href="#quote" data-pre="${esc(c.id)}">Request a quote →</a></div></article>`;
  const homeCats = $("#homeCats"); if (homeCats) homeCats.innerHTML = CATS.slice(0, 6).map((c) => catCard(c, false)).join("");
  const allCats = $("#allCats");
  function drawCats(f) { allCats.innerHTML = CATS.filter((c) => f === "All" || c.uses.includes(f)).map((c) => catCard(c, true)).join(""); }
  if (allCats) {
    drawCats("All");
    $("#catFilter").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("#catFilter button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      drawCats(b.dataset.f); $$("figure[data-slot]", allCats).forEach(fillSlot);
    });
  }
  const qProds = $("#qProds");
  if (qProds) qProds.innerHTML = CATS.map((c) => `<label class="opt"><input type="checkbox" name="prod" value="${esc(c.id)}" data-label="${esc(c.name)}"> ${esc(c.name)}</label>`).join("") +
    `<label class="opt"><input type="checkbox" name="prod" value="schedule" data-label="Full door or window schedule"> Full door or window schedule</label>` +
    `<label class="opt"><input type="checkbox" name="prod" value="Trade account" data-label="Trade account setup"> Trade account setup</label>`;
  const footCats = $("#footCats"); if (footCats) footCats.innerHTML = CATS.slice(0, 5).map((c) => `<li><a href="#products">${esc(c.name)}</a></li>`).join("") + `<li><a href="#products">All doors and windows</a></li>`;

  /* ---------- drawn placeholders for photo slots ---------- */
  const S = (prop) => `style="fill:var(--${prop})"`;
  const K = (prop, w = 3) => `style="fill:none;stroke:var(--${prop});stroke-width:${w}"`;
  const sky = `<defs><linearGradient id="g_sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--acc-soft)"/><stop offset="1" style="stop-color:var(--bg)"/></linearGradient></defs><rect width="400" height="300" style="fill:url(#g_sky)"/>`;
  const wall = `<rect width="400" height="300" ${S("sunk")}/>`;
  const ART = {
    house: () => `${sky}<rect y="236" width="400" height="64" ${S("line")}/>
      <rect x="70" y="96" width="260" height="140" ${S("surface")}/><rect x="60" y="88" width="180" height="12" ${S("pri")}/><rect x="200" y="132" width="150" height="10" ${S("pri")}/>
      <rect x="86" y="112" width="96" height="62" ${S("acc")} opacity=".55"/><path d="M134 112v62M86 143h96" ${K("pri",3)}/><rect x="86" y="112" width="96" height="62" ${K("pri",4)}/>
      <rect x="214" y="156" width="40" height="80" ${S("pri")}/><circle cx="246" cy="198" r="2.5" ${S("acc")}/>
      <rect x="270" y="156" width="56" height="54" ${S("acc")} opacity=".55"/><rect x="270" y="156" width="56" height="54" ${K("pri",4)}/><path d="M298 156v54" ${K("pri",3)}/>
      <rect x="96" y="190" width="70" height="32" ${S("acc")} opacity=".4"/><rect x="96" y="190" width="70" height="32" ${K("pri",3)}/>`,
    door: () => `${wall}<rect y="262" width="400" height="38" ${S("line")}/><rect x="120" y="40" width="160" height="222" ${S("surface")}/>
      <rect x="160" y="56" width="80" height="206" ${S("pri")}/><rect x="172" y="70" width="56" height="70" ${K("on-pri",2)} opacity=".5"/><rect x="172" y="152" width="56" height="96" ${K("on-pri",2)} opacity=".5"/><rect x="226" y="150" width="6" height="26" rx="2" ${S("acc")}/>
      <rect x="132" y="56" width="20" height="206" ${S("acc")} opacity=".45"/><rect x="248" y="56" width="20" height="206" ${S("acc")} opacity=".45"/><rect x="120" y="40" width="160" height="222" ${K("fg",3)}/>`,
    interior: () => `${wall}<rect y="264" width="400" height="36" ${S("line")}/>${[40, 160, 280].map((x) => `<rect x="${x}" y="70" width="80" height="194" ${S("surface")}/><rect x="${x}" y="70" width="80" height="194" ${K("fg",2)}/><rect x="${x + 12}" y="84" width="56" height="74" ${K("line",2)}/><rect x="${x + 12}" y="170" width="56" height="80" ${K("line",2)}/><circle cx="${x + 68}" cy="168" r="4" ${S("acc")}/>`).join("")}`,
    window: () => `${wall}<rect x="90" y="40" width="220" height="220" ${S("pri")}/><rect x="104" y="54" width="192" height="192" ${S("acc-soft")}/>
      <path d="M104 54l96 96" ${K("surface",1)} opacity=".6"/><rect x="200" y="54" width="96" height="96" ${S("acc")} opacity=".5"/><path d="M200 54v192M104 150h192" ${K("pri",10)}/><rect x="104" y="54" width="192" height="192" ${K("pri",6)}/><rect x="80" y="258" width="240" height="10" ${S("fg")}/>`,
    patio: () => `${wall}<rect y="250" width="400" height="50" ${S("line")}/><path d="M0 262h400M0 276h400M0 290h400" ${K("sunk",2)}/><rect x="40" y="46" width="320" height="204" ${S("pri")}/>
      ${[52, 156, 260].map((x, i) => `<rect x="${x}" y="58" width="${i === 2 ? 88 : 96}" height="180" ${S(i === 1 ? "acc" : "acc-soft")} ${i === 1 ? 'opacity=".55"' : ""}/>`).join("")}<path d="M152 52v192M256 52v192" ${K("pri",8)}/><rect x="244" y="140" width="5" height="34" ${S("surface")}/>`,
    glass: () => `${wall}<rect x="120" y="30" width="22" height="240" ${S("acc")} opacity=".55"/><rect x="232" y="30" width="22" height="240" ${S("acc")} opacity=".55"/><rect x="142" y="30" width="90" height="240" ${S("acc-soft")}/>
      <rect x="142" y="236" width="90" height="34" ${S("pri")}/><path d="M131 30v240M243 30v240" ${K("fg",1)}/>
      <g style="fill:var(--muted);font:11px var(--f-mono)"><text x="20" y="80">1/4″ low-E</text><text x="268" y="80">1/4″ clear</text><text x="150" y="20">1/2″ argon</text><text x="276" y="258">spacer</text></g><path d="M86 84h34M246 84h20M250 252h24" ${K("muted",1)}/>`,
    hardware: () => `${wall}<rect x="150" y="0" width="120" height="300" ${S("surface")}/><rect x="150" y="0" width="120" height="300" ${K("line",2)}/>
      <circle cx="210" cy="150" r="30" ${S("fg")}/><circle cx="210" cy="150" r="22" ${S("pri")}/><rect x="200" y="140" width="130" height="20" rx="10" ${S("fg")}/><rect x="204" y="144" width="122" height="5" rx="2.5" ${S("acc")} opacity=".6"/><rect x="204" y="206" width="12" height="22" rx="3" ${S("fg")}/>`,
    blueprint: () => `<rect width="400" height="300" ${S("pri")}/>${Array.from({ length: 20 }, (_, i) => `<path d="M${i * 20} 0v300M0 ${i * 20}h400" style="stroke:var(--on-pri);stroke-width:.5;opacity:.18"/>`).join("")}
      <path d="M60 60h280v180H60zM60 150h140M200 60v180M260 150h80" ${K("on-pri",3)} opacity=".85"/><path d="M200 150a30 30 0 0 1 30 -30M60 100a26 26 0 0 0 26 26" ${K("acc",2)}/><rect x="120" y="56" width="50" height="8" ${S("acc")}/><rect x="282" y="236" width="40" height="8" ${S("acc")}/>`,
    multifamily: () => `${sky}<rect y="270" width="400" height="30" ${S("line")}/><rect x="70" y="40" width="260" height="230" ${S("surface")}/><rect x="70" y="40" width="260" height="230" ${K("fg",2)}/>
      ${Array.from({ length: 6 }, (_, r) => Array.from({ length: 6 }, (_, c) => `<rect x="${86 + c * 40}" y="${54 + r * 34}" width="26" height="22" ${S((r + c) % 4 === 0 ? "acc" : "pri")} ${(r + c) % 4 === 0 ? 'opacity=".6"' : 'opacity=".85"'}/>`).join("")).join("")}
      <rect x="350" y="20" width="6" height="250" ${S("acc")}/><rect x="300" y="20" width="110" height="6" ${S("acc")}/>`,
    showroom: () => `${wall}<rect y="230" width="400" height="70" ${S("line")}/><path d="M0 230h400" ${K("fg",1)}/>
      ${[30, 110, 190].map((x, i) => `<rect x="${x}" y="80" width="64" height="150" ${S(i === 1 ? "pri" : "surface")}/><rect x="${x}" y="80" width="64" height="150" ${K("fg",2)}/><circle cx="${x + 54}" cy="160" r="3" ${S("acc")}/>`).join("")}
      <rect x="280" y="70" width="96" height="120" ${S("acc-soft")}/><path d="M328 70v120M280 130h96" ${K("pri",5)}/><rect x="280" y="70" width="96" height="120" ${K("pri",5)}/><rect x="40" y="30" width="320" height="6" ${S("acc")} opacity=".6"/>`,
    kitchen: () => `${wall}<rect y="250" width="400" height="50" ${S("line")}/><rect x="30" y="50" width="340" height="56" ${S("surface")}/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${36 + i * 67}" y="56" width="61" height="44" ${K("line",2)}/>`).join("")}
      <rect x="30" y="150" width="340" height="12" ${S("fg")}/><rect x="30" y="162" width="340" height="88" ${S("pri")}/>${[0, 1, 2, 3].map((i) => `<rect x="${44 + i * 82}" y="176" width="70" height="60" ${K("on-pri",1.5)} opacity=".45"/>`).join("")}<path d="M200 150v-30h22" ${K("acc",4)}/>`,
    bath: () => `${wall}<rect y="250" width="400" height="50" ${S("line")}/><rect x="40" y="40" width="150" height="210" ${S("surface")}/>${Array.from({ length: 6 }, (_, i) => `<path d="M40 ${40 + i * 35}h150" ${K("line",1.5)}/>`).join("")}
      <rect x="182" y="40" width="10" height="210" ${S("acc-soft")}/><rect x="190" y="40" width="6" height="210" ${S("fg")}/><path d="M92 60v-10h20" ${K("acc",4)}/>
      <rect x="230" y="170" width="140" height="80" rx="10" ${S("surface")}/><rect x="230" y="170" width="140" height="80" rx="10" ${K("fg",2)}/><rect x="270" y="70" width="60" height="70" rx="30" ${K("acc",3)}/>`,
    lounge: () => `${wall}<rect y="240" width="400" height="60" ${S("line")}/><rect x="60" y="150" width="280" height="12" ${S("fg")}/><path d="M90 162v78M310 162v78" ${K("fg",6)}/>
      ${["pri", "acc", "surface", "fg", "acc-soft"].map((c, i) => `<rect x="${92 + i * 46}" y="${126 - (i % 2) * 6}" width="36" height="24" ${S(c)} ${c === "surface" ? 'stroke="currentColor"' : ""}/>`).join("")}
      <rect x="140" y="40" width="120" height="70" ${S("surface")}/><path d="M152 54h96M152 70h60M152 86h80" ${K("line",3)}/>`
  };
  function fillSlot(fig) {
    const key = fig.dataset.slot;
    const p = (CFG.photos || {})[key] || {};
    if (p.src) {
      fig.innerHTML = `<img src="${esc(p.src)}" alt="${esc(p.alt || "")}" loading="lazy">`;
      return;
    }
    const art = (ART[p.art] || ART.house)();
    fig.innerHTML = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(p.alt || "Illustration")}">${art}</svg>` +
      `<figcaption>Photo slot · ${esc(key)}${p.find ? ` · <a href="${esc(p.find)}" target="_blank" rel="noopener">find stock</a>` : ""}</figcaption>`;
  }
  $$("figure[data-slot]").forEach(fillSlot);

  /* ---------- projects gallery ---------- */
  const gallery = $("#gallery"), filters = $("#filters");
  const projects = CFG.projects || [];
  function drawGallery(cat) {
    const list = projects.filter((p) => !cat || cat === "All" || p.category === cat);
    if (!projects.length) {
      gallery.innerHTML = ["Doors", "Windows", "Patio doors"].map((c, i) =>
        `<div class="vig"><figure class="ph" data-slot="${["entryDoors", "windows", "patio"][i]}"></figure><h3>Your next ${c.toLowerCase()} project</h3><p class="muted">Approved customer photos will appear here. Add them under "projects" in config.js.</p></div>`).join("");
      $$("figure[data-slot]", gallery).forEach(fillSlot);
      filters.hidden = true;
      return;
    }
    gallery.innerHTML = list.map((p) => `<div class="vig"><figure class="ph"><img src="${esc(p.src)}" alt="${esc(p.title)}" loading="lazy"></figure><h3>${esc(p.title)}</h3><p class="muted">${esc([p.city, p.category, p.builder].filter(Boolean).join(" · "))}</p></div>`).join("");
  }
  if (gallery) {
    const cats = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
    filters.innerHTML = cats.map((c, i) => `<button type="button" aria-pressed="${i === 0}">${esc(c)}</button>`).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", filters).forEach((x) => x.setAttribute("aria-pressed", x === b));
      drawGallery(b.textContent);
    });
    drawGallery("All");
  }

  /* ---------- router ---------- */
  const PAGES = $$("[data-page]").map((s) => s.dataset.page);
  function route() {
    const hash = (location.hash || "#home").slice(1);
    let page = PAGES.includes(hash) ? hash : hash.split("-")[0];
    if (!PAGES.includes(page)) page = "home";
    $$("[data-page]").forEach((s) => s.classList.toggle("on", s.dataset.page === page));
    $$("nav.main a").forEach((a) => { if (a.getAttribute("href") === "#" + page) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    $("#mainNav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false");
    const target = hash !== page ? document.getElementById(hash) : null;
    if (target) target.scrollIntoView({ block: "start" }); else window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
  $("#menuBtn").addEventListener("click", () => {
    const n = $("#mainNav"); const open = !n.classList.contains("open");
    n.classList.toggle("open", open); $("#menuBtn").setAttribute("aria-expanded", String(open));
  });

  /* presets: "Quote doors" ticks Doors; "Contact sales" picks the sales team */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-pre],a[data-team],a[data-ptype]"); if (!a) return;
    if (a.dataset.pre) { const box = $(`#quoteForm input[name=prod][value="${a.dataset.pre}"]`); if (box) box.checked = true; }
    if (a.dataset.ptype) { const r = $(`#quoteForm input[name=ptype][value="${a.dataset.ptype}"]`); if (r) r.checked = true; }
    if (a.dataset.team) { const r = $(`#contactForm input[name=team][value="${a.dataset.team}"]`); if (r) r.checked = true; }
  });

  /* ---------- contact routes ---------- */
  const C = CFG.contact || {}, L = CFG.links || {};
  const ROUTES = { sales: ["Sales team", C.salesEmail], pm: ["Project management", C.projectManagementEmail], general: ["General inbox", C.inboxEmail] };
  $("#inboxLine").textContent = C.inboxEmail ? C.inboxEmail : "Team inbox coming soon. Use the form and we'll route it.";
  const plat = [["Houzz Pro", L.houzzPro], ["Buildertrend", L.buildertrend]];
  $("#platformLinks").innerHTML = plat.map(([n, u]) => u ? `<a class="btn sec" href="${esc(u)}" target="_blank" rel="noopener">Send via ${n}</a>` : `<span class="btn sec off" aria-disabled="true">${n} link coming soon</span>`).join("");

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  function draftNotice(where, rows) {
    return `<div class="notice"><b>Draft preview: this wasn't sent.</b> In the live site it goes to ${esc(where)}.</div>` +
      `<dl class="summary" style="margin-top:14px">${rows.filter((r) => r[1]).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>`;
  }
  function routeLabel(key) { const [name, email] = ROUTES[key] || ROUTES.general; return email ? `${name} (${email})` : `${name} (email to be set)`; }

  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#contactErr"), team = ($("#contactForm input[name=team]:checked") || {}).value || "general";
    const name = $("#cName").value.trim(), email = $("#cEmail").value.trim(), msg = $("#cMsg").value.trim();
    if (!name || !isEmail(email) || !msg) { err.textContent = "Add your name, a valid email and a message, then send again."; err.hidden = false; return; }
    err.hidden = true;
    const done = $("#contactDone"); done.hidden = false;
    done.innerHTML = draftNotice(routeLabel(team), [["Team", ROUTES[team][0]], ["Name", name], ["Company", $("#cCompany").value], ["Email", email], ["Phone", $("#cPhone").value], ["Message", msg]]);
  });

  $("#partnerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#partnerErr");
    const vals = { company: $("#pCompany").value.trim(), name: $("#pName").value.trim(), cat: $("#pCat").value, email: $("#pEmail").value.trim() };
    if (!vals.company || !vals.name || !vals.cat || !isEmail(vals.email)) { err.textContent = "Add your company, name, category and a valid email, then send again."; err.hidden = false; return; }
    err.hidden = true;
    const done = $("#partnerDone"); done.hidden = false;
    done.innerHTML = draftNotice(routeLabel("partners"), [["Company", vals.company], ["Name", vals.name], ["Category", vals.cat], ["Email", vals.email], ["About", $("#pMsg").value]]);
  });

  /* ---------- quote stepper ---------- */
  let step = 0; const steps = $$(".qstep"), prog = $$("#qProg li");
  function show() {
    steps.forEach((s, i) => s.classList.toggle("on", i === step));
    prog.forEach((li, i) => { li.classList.toggle("done", i < step); li.classList.toggle("now", i === step); });
    $("#qBack").style.visibility = step ? "visible" : "hidden";
    $("#qNext").textContent = step === steps.length - 1 ? "Send request" : "Next";
    $("#qErr").hidden = true;
  }
  const val = (n) => ($(`#quoteForm input[name=${n}]:checked`) || {}).value || "";
  const checks = () => $$("#quoteForm input[name=prod]:checked").map((b) => b.dataset.label || b.value);
  const NEED = [
    () => val("role") ? "" : "Choose the option that fits you best.",
    () => val("ptype") ? "" : "Choose a project type.",
    () => checks().length ? "" : "Pick at least one product.",
    () => "",
    () => ($("#qName").value.trim() && isEmail($("#qEmail").value.trim())) ? "" : "Add your name and a valid email."
  ];
  $("#qFiles").addEventListener("change", (e) => {
    $("#qFileList").innerHTML = Array.from(e.target.files).map((f) => `<li>${esc(f.name)} · ${(f.size / 1048576).toFixed(1)} MB</li>`).join("");
  });
  $("#qBack").addEventListener("click", () => { if (step) { step--; show(); } });
  $("#qNext").addEventListener("click", () => {
    const msg = NEED[step](); if (msg) { const er = $("#qErr"); er.textContent = msg; er.hidden = false; return; }
    if (step < steps.length - 1) { step++; show(); return; }
    const files = Array.from($("#qFiles").files).map((f) => f.name).join(", ");
    $("#quoteForm").hidden = true; $("#qProg").hidden = true;
    const d = $("#qDone"); d.hidden = false;
    d.innerHTML = `<h2 style="margin-bottom:12px">Thanks, ${esc($("#qName").value.trim().split(" ")[0])}.</h2>` +
      draftNotice((C.inboxEmail ? `the team inbox (${C.inboxEmail})` : "the team inbox (email to be set)") + " and the quote tracker", [
        ["Role", val("role")], ["Project", val("ptype")], ["Location", $("#qCity").value], ["Timing", $("#qWhen").value],
        ["Products", checks().join(", ")], ["Details", $("#qQty").value], ["Files", files], ["Name", $("#qName").value],
        ["Company", $("#qCompany").value], ["Email", $("#qEmail").value], ["Phone", $("#qPhone").value]]) +
      `<div class="btns" style="margin-top:18px"><button class="btn sec" type="button" id="qAgain">Start another request</button></div>`;
    $("#qAgain").addEventListener("click", () => { $("#quoteForm").reset(); $("#qFileList").innerHTML = ""; step = 0; $("#quoteForm").hidden = false; $("#qProg").hidden = false; d.hidden = true; show(); });
  });
  show();
})();

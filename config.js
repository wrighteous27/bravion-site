/*
  Bravion site settings. Edit this file to change names, contact routes, links and photos.
  Nothing else needs to change when the team fills in a value.
*/
window.BRAVION_CONFIG = {
  // Design theme: original, pane, bauhaus, wood, bands or slab (defined in themes.js).
  theme: "slab2",

  brand: {
    name: "Bravion",
    legalName: "Bravion Envelope Systems Inc.",
    tagline: "Building performance. Delivering excellence.",
    // Divisions. Everything operates under the Bravion name (Benicio was dropped in Oct 2026).
    divisions: { residential: "Bravion Residential", commercial: "Bravion Commercial Supply" },

    // Logo override. Leave "src" empty to use the theme's logo. Set it (for example "logo/new-logo.svg") to force one file everywhere.
    logo: { src: "", alt: "Bravion Envelope Systems logo" },
    footerLogo: "logo/bravion-logo-full.png"
  },

  // Service area shown site-wide. No street address, phone or email until they are set.
  serviceArea: {
    label: "Dallas–Fort Worth",
    counties: ["Dallas", "Tarrant", "Collin", "Denton", "Rockwall", "Ellis", "Johnson", "Kaufman", "Parker"],
    commercialMarkets: ["Dallas–Fort Worth", "Houston"]
  },

  // Where form submissions go. Leave a value empty ("") and the site shows it as "coming soon".
  contact: {
    inboxEmail: "",            // TBD: team inbox for quote and contact forms
    salesEmail: "",            // TBD: sales team
    projectManagementEmail: "",// TBD: project management team
  },
  links: {
    houzzPro: "",              // TBD: Houzz Pro lead form or profile URL
    buildertrend: "",          // TBD: Buildertrend lead capture URL
    partnerPortal: ""          // TBD: partner & contractor sign-in URL once accounts exist
  },

  /*
    Product lines. Shown on Home, the Products page and the quote form. Doors and windows only, all made to order.
    "uses" drives the Doors / Windows filter. "status" shows a note (catalogs are being built for every line).
  */
  categories: [
    { id: "exterior-doors", name: "Exterior doors", uses: ["Doors"], slot: "entryDoors",
      desc: "Custom entry doors in wood, fiberglass and steel, sized to your opening, with sidelites, transoms, glass and finish of your choice. Supplied prehung with hardware prep." },
    { id: "interior-doors", name: "Interior doors", uses: ["Doors"], slot: "interiorDoors",
      desc: "Passage, closet, pocket and barn doors in solid or hollow core, paint- or stain-grade, made to order and supplied prehung or as slabs." },
    { id: "patio", name: "Patio and multi-slide doors", uses: ["Doors"], slot: "patio",
      desc: "Sliding, French, bi-fold and pocketing door systems built to size for wide indoor-outdoor openings." },
    { id: "fire-rated", name: "Fire-rated doors", uses: ["Doors"], slot: "interiorDoors",
      desc: "Labeled door and frame assemblies for garage-to-house entries and multifamily corridors, built to the rating your plans call for." },
    { id: "windows", name: "Windows", uses: ["Windows"], slot: "windows",
      desc: "Custom new-construction and replacement windows in vinyl, aluminum, fiberglass and clad wood: casement, hung, sliding and picture, with your choice of glass and grids." },
    { id: "specialty-windows", name: "Specialty and shaped windows", uses: ["Windows"], slot: "windows",
      desc: "Arches, transoms, circles and oversized picture units made to match the rest of your windows." }
  ],

  /*
    Photos. Every image on the site comes from this list.
    - Set "src" to a file path (for example "photos/hero.jpg") or a full image URL to replace the drawn placeholder.
    - "find" links to free-license searches the team can pick from (Unsplash and Pexels licenses allow commercial use; credit is appreciated).
    - Approved customer project photos go in "projects". Add one entry per photo; the Projects page builds itself from this list.
  */
  photos: {
    hero:        { src: "photos/hero.jpg", art: "house", alt: "Modern two-story home with floor-to-ceiling windows and glass railings beside a pool", find: "https://unsplash.com/photos/_TPTXZd9mOo" }, // Unsplash photo by webaliser
    pros:        { src: "", art: "blueprint",alt: "Builder reviewing plans on a job site",           find: "https://www.pexels.com/search/construction%20plans/" },
    commercial:  { src: "", art: "multifamily", alt: "Mid-rise residential building under construction", find: "https://unsplash.com/s/photos/apartment-construction" },
    showroom:    { src: "", art: "showroom", alt: "Door and window showroom with display vignettes",  find: "https://unsplash.com/s/photos/showroom-interior" },
    entryDoors:  { src: "", art: "door",     alt: "Front entry door with sidelites",                 find: "https://unsplash.com/s/photos/front-door" },
    interiorDoors:{src: "", art: "interior", alt: "Painted interior panel doors in a hallway",        find: "https://www.pexels.com/search/interior%20door/" },
    windows:     { src: "", art: "window",   alt: "Black-frame casement windows",                    find: "https://unsplash.com/s/photos/black-window-frame" },
    patio:       { src: "", art: "patio",    alt: "Sliding glass patio door opening to a backyard",  find: "https://unsplash.com/s/photos/sliding-glass-door" },
    hardware:    { src: "", art: "hardware", alt: "Matte black lever handle on a door",              find: "https://unsplash.com/s/photos/door-handle" },
    lounge:      { src: "", art: "lounge",   alt: "Design consultation table with material samples", find: "https://www.pexels.com/search/material%20samples/" }
  },

  // Approved customer project photos. Example entry (remove the slashes to use):
  // { src: "photos/projects/frisco-modern-entry.jpg", title: "Modern entry package", city: "Frisco", category: "Doors", builder: "" }
  projects: []
};

/*
  Design themes. config.js picks one with `theme: "original"`.
  Each theme sets colors (light only, to keep the site bright), typefaces, heading style, corner radius and the logo. layouts.css gives each one its own page structure.
  "original" uses the real Bravion logo file; the others use the draft concept marks.
*/
window.BRAVION_THEMES = {
  original: {
    label: "Original Bravion",
    fonts: "Montserrat:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@1,500",
    head: "'Montserrat', system-ui, sans-serif", ui: "'Montserrat', system-ui, sans-serif", serif: "'Cormorant Garamond', Georgia, serif",
    headWeight: 600, headCase: "none", headLs: "-.01em", radius: "10px", wordCase: "uppercase", wordLs: ".28em", wordWeight: 600,
    light: { bg: "#FFFFFF", surface: "#FFFFFF", sunk: "#F2F6FB", fg: "#13233A", muted: "#55657A", line: "#DCE4EE", pri: "#062C5C", "pri-2": "#0E4386", acc: "#7C7D7F", "acc-soft": "#E6F0FA", "on-pri": "#FFFFFF", hl: "#2F6FB5" },
    logo: { src: "logo/bravion-mark.png", chipInDark: true }
  },
  pane: {
    label: "Window Pane",
    fonts: "Jost:wght@400;500;600&family=Libre+Caslon+Text:ital@1",
    head: "'Jost', system-ui, sans-serif", ui: "'Jost', system-ui, sans-serif", serif: "'Libre Caslon Text', Georgia, serif",
    headWeight: 500, headCase: "none", headLs: "-.01em", radius: "0px", wordCase: "uppercase", wordLs: ".18em", wordWeight: 600,
    light: { bg: "#FAF7F0", surface: "#FFFFFF", sunk: "#EFE9DC", fg: "#1F2A22", muted: "#56625A", line: "#D9D1C0", pri: "#24452F", "pri-2": "#2F5A3D", acc: "#B8893B", "acc-soft": "#F4E9D0", "on-pri": "#FFFDF6", hl: "#93681F" },
    logo: { mark: "pane" }
  },
  bauhaus: {
    label: "Geometric Doorway",
    fonts: "Josefin+Sans:wght@400;600;700&family=Libre+Caslon+Text:ital@1",
    head: "'Josefin Sans', system-ui, sans-serif", ui: "'Josefin Sans', system-ui, sans-serif", serif: "'Libre Caslon Text', Georgia, serif",
    headWeight: 700, headCase: "uppercase", headLs: ".02em", radius: "0px", wordCase: "uppercase", wordLs: ".2em", wordWeight: 700,
    light: { bg: "#FAF6EC", surface: "#FFFFFF", sunk: "#EEE8DA", fg: "#1B1B1B", muted: "#55524B", line: "#D9D0BE", pri: "#C8402E", "pri-2": "#A9321F", acc: "#E0A526", "acc-soft": "#FBE7B0", "on-pri": "#FFFFFF", hl: "#C8402E" },
    logo: { mark: "bauhaus" }
  },
  wood: {
    label: "Molded Plywood",
    fonts: "DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600",
    head: "'DM Serif Display', Georgia, serif", ui: "'DM Sans', system-ui, sans-serif", serif: "'DM Serif Display', Georgia, serif",
    headWeight: 400, headCase: "none", headLs: "0", radius: "22px", wordCase: "none", wordLs: ".01em", wordWeight: 400, wordFont: "'DM Serif Display', Georgia, serif",
    light: { bg: "#FCF7EE", surface: "#FFFFFF", sunk: "#F2E6D0", fg: "#2E2116", muted: "#6A5644", line: "#E3D3B8", pri: "#6B4429", "pri-2": "#7E5233", acc: "#C36A2D", "acc-soft": "#F7E1CC", "on-pri": "#FFF8EE", hl: "#B25E24" },
    logo: { mark: "wood" }
  },
  bands: {
    label: "Sunset Bands",
    fonts: "Shrikhand&family=Rubik:wght@400;500;600",
    head: "'Shrikhand', Georgia, serif", ui: "'Rubik', system-ui, sans-serif", serif: "'Shrikhand', Georgia, serif",
    headWeight: 400, headCase: "none", headLs: ".005em", radius: "18px", wordCase: "none", wordLs: ".01em", wordWeight: 400, wordFont: "'Shrikhand', Georgia, serif",
    light: { bg: "#FFF8EC", surface: "#FFFFFF", sunk: "#FBEBD0", fg: "#3A2616", muted: "#6E5541", line: "#EBD6B4", pri: "#B9501A", "pri-2": "#9E4314", acc: "#E8B23A", "acc-soft": "#FCE6B0", "on-pri": "#FFFFFF", hl: "#B9501A" },
    logo: { mark: "bands" }
  },
  slab: {
    label: "Precast Slab",
    fonts: "Big+Shoulders+Display:wght@700;800&family=Archivo:wght@400;500;600",
    head: "'Big Shoulders Display', Impact, sans-serif", ui: "'Archivo', system-ui, sans-serif", serif: "'Archivo', system-ui, sans-serif",
    headWeight: 800, headCase: "uppercase", headLs: ".02em", radius: "0px", wordCase: "uppercase", wordLs: ".1em", wordWeight: 800, wordFont: "'Big Shoulders Display', Impact, sans-serif",
    light: { bg: "#F4F2EE", surface: "#FFFFFF", sunk: "#E7E3DA", fg: "#2B2B2A", muted: "#5E5C57", line: "#CFCAC0", pri: "#2B2B2A", "pri-2": "#444441", acc: "#A4471F", "acc-soft": "#F1DED2", "on-pri": "#FFFFFF", hl: "#A4471F" },
    logo: { mark: "slab" }
  },
  slab2: {
    label: "Precast Slab · Friendly",
    fonts: "Big+Shoulders+Display:wght@700;800&family=Archivo:wght@400;500;600",
    head: "'Big Shoulders Display', Impact, sans-serif", ui: "'Archivo', system-ui, sans-serif", serif: "'Archivo', system-ui, sans-serif",
    headWeight: 800, headCase: "uppercase", headLs: ".02em", radius: "14px", wordCase: "uppercase", wordLs: ".1em", wordWeight: 800, wordFont: "'Big Shoulders Display', Impact, sans-serif",
    light: { bg: "#F4F2EE", surface: "#FFFFFF", sunk: "#E7E3DA", fg: "#2B2B2A", muted: "#5E5C57", line: "#CFCAC0", pri: "#2B2B2A", "pri-2": "#444441", acc: "#A4471F", "acc-soft": "#F1DED2", "on-pri": "#FFFFFF", hl: "#A4471F" },
    logo: { mark: "slab" },
    layout: "slab", variant: "soft" /* same structure as slab, softer boxes, no index numbers */
  }
};

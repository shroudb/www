export const palette = {
  base: {
    black: "#0C0A09",
    darkWarm: "#1C1917",
    stone800: "#292524",
    stone700: "#44403C",
    stone500: "#78716C",
    stone300: "#D6D3D1",
    cream: "#FAFAF9",
    white: "#FFFFFF",
  },
  brand: {
    core: "#C75B39",
    coreLight: "#E8825F",
    sigil: "#C49A3C",
    sigilLight: "#DEBB65",
    cipher: "#2E7D9B",
    cipherLight: "#4BA3C3",
    veil: "#7E5C8A",
    veilLight: "#A37FB0",
    forge: "#CC7A2E",
    forgeLight: "#E09B55",
    sentry: "#A64B4B",
    sentryLight: "#C97070",
    courier: "#5B6BAA",
    courierLight: "#8088C4",
    keep: "#B08545",
    keepLight: "#D0A86A",
    stash: "#6B8F5E",
    stashLight: "#8FB882",
    moat: "#3D8A8A",
    moatLight: "#5CB8B8",
    chronicle: "#7A6B5D",
    chronicleLight: "#A0917F",
    cloud: "#5A97C4",
    cloudLight: "#82B6DE",
  },
  status: {
    success: "#22c55e",
    danger: "#ef4444",
    warning: "#f59e0b",
  },
} as const;

export type EngineKey =
  | "sigil"
  | "cipher"
  | "stash"
  | "keep"
  | "veil"
  | "forge"
  | "sentry"
  | "courier"
  | "chronicle";

export type ProductKey = EngineKey | "cloud" | "moat" | "shroudb";

export type EngineColor = {
  primary: string;
  light: string;
};

export const productColors: Record<ProductKey, EngineColor> = {
  shroudb: { primary: palette.brand.core, light: palette.brand.coreLight },
  cloud: { primary: palette.brand.cloud, light: palette.brand.cloudLight },
  moat: { primary: palette.brand.moat, light: palette.brand.moatLight },
  sigil: { primary: palette.brand.sigil, light: palette.brand.sigilLight },
  cipher: { primary: palette.brand.cipher, light: palette.brand.cipherLight },
  stash: { primary: palette.brand.stash, light: palette.brand.stashLight },
  keep: { primary: palette.brand.keep, light: palette.brand.keepLight },
  veil: { primary: palette.brand.veil, light: palette.brand.veilLight },
  forge: { primary: palette.brand.forge, light: palette.brand.forgeLight },
  sentry: { primary: palette.brand.sentry, light: palette.brand.sentryLight },
  courier: { primary: palette.brand.courier, light: palette.brand.courierLight },
  chronicle: {
    primary: palette.brand.chronicle,
    light: palette.brand.chronicleLight,
  },
};

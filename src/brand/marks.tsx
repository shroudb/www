import type { ReactElement } from "react";
import { palette, productColors, type ProductKey } from "./palette";

export type MarkProps = {
  size?: number;
  color?: string;
  lightColor?: string;
};

const BG = palette.base.darkWarm;

function HexShell({ color, lightColor }: { color: string; lightColor: string }) {
  return (
    <>
      <path d="M50 8L85 28V68L50 88L15 68V28L50 8Z" fill={color} opacity="0.15" />
      <path d="M50 16L78 33V63L50 80L22 63V33L50 16Z" fill={color} opacity="0.35" />
      <path d="M50 24L71 38V58L50 72L29 58V38L50 24Z" fill={color} />
      <HexShellHighlight lightColor={lightColor} />
    </>
  );
}

function HexShellHighlight({ lightColor }: { lightColor: string }) {
  return (
    <path
      d="M50 24L71 38L50 48L29 38L50 24Z"
      fill={lightColor}
      opacity="0.25"
    />
  );
}

export function ShrouDBMark({
  size = 40,
  color = palette.brand.core,
  lightColor = palette.brand.coreLight,
}: MarkProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <path d="M50 8L85 28V68L50 88L15 68V28L50 8Z" fill={color} opacity="0.2" />
      <path d="M50 16L78 33V63L50 80L22 63V33L50 16Z" fill={color} opacity="0.4" />
      <path d="M50 24L71 38V58L50 72L29 58V38L50 24Z" fill={color} />
      <path
        d="M50 34L60 41V55L50 62L40 55V41L50 34Z"
        fill={BG}
        opacity="0.7"
      />
      <path d="M50 24L71 38L50 48L29 38L50 24Z" fill={lightColor} opacity="0.3" />
    </svg>
  );
}

export function SigilMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.sigil;
  const cl = palette.brand.sigilLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <circle cx="50" cy="48" r="13" fill={BG} opacity="0.8" />
      <circle cx="50" cy="48" r="10" stroke={BG} strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M50 39L55 46L50 43L45 46Z" fill={cl} opacity="0.5" />
      <path d="M50 57L45 50L50 53L55 50Z" fill={cl} opacity="0.4" />
      <line x1="50" y1="39" x2="50" y2="57" stroke={cl} strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

export function CipherMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.cipher;
  const cl = palette.brand.cipherLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <path d="M36 42H44L47 38H53L56 42H64" stroke={BG} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <path d="M36 48H42L45 52H49L52 48H58L61 52H64" stroke={cl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
      <path d="M36 56H44L47 60H53L56 56H64" stroke={BG} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
}

export function VeilMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.veil;
  const cl = palette.brand.veilLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <line x1="38" y1="38" x2="38" y2="58" stroke={BG} strokeWidth="2" opacity="0.6" />
      <line x1="46" y1="35" x2="46" y2="61" stroke={BG} strokeWidth="2" opacity="0.7" />
      <line x1="54" y1="35" x2="54" y2="61" stroke={BG} strokeWidth="2" opacity="0.7" />
      <line x1="62" y1="38" x2="62" y2="58" stroke={BG} strokeWidth="2" opacity="0.6" />
      <line x1="34" y1="44" x2="66" y2="44" stroke={BG} strokeWidth="2" opacity="0.5" />
      <line x1="32" y1="52" x2="68" y2="52" stroke={BG} strokeWidth="2" opacity="0.5" />
      <circle cx="56" cy="56" r="6" stroke={cl} strokeWidth="2" fill="none" opacity="0.6" />
      <line x1="60" y1="61" x2="65" y2="66" stroke={cl} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function ForgeMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.forge;
  const cl = palette.brand.forgeLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <path d="M38 54H62V58H38Z" fill={BG} opacity="0.8" />
      <path d="M42 50H58V54H42Z" fill={BG} opacity="0.7" />
      <path d="M46 46H54V50H46Z" fill={BG} opacity="0.8" />
      <circle cx="42" cy="42" r="1.5" fill={cl} opacity="0.6" />
      <circle cx="58" cy="40" r="1" fill={cl} opacity="0.5" />
      <circle cx="45" cy="38" r="1" fill={cl} opacity="0.4" />
      <circle cx="55" cy="43" r="1.5" fill={cl} opacity="0.5" />
    </svg>
  );
}

export function SentryMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.sentry;
  const cl = palette.brand.sentryLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <rect x="38" y="36" width="3" height="24" rx="1" fill={BG} opacity="0.8" />
      <rect x="45" y="36" width="3" height="24" rx="1" fill={BG} opacity="0.8" />
      <rect x="52" y="36" width="3" height="24" rx="1" fill={BG} opacity="0.8" />
      <rect x="59" y="36" width="3" height="24" rx="1" fill={BG} opacity="0.8" />
      <rect x="35" y="46" width="30" height="3" rx="1" fill={cl} opacity="0.5" />
    </svg>
  );
}

export function CourierMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.courier;
  const cl = palette.brand.courierLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <path d="M35 40L50 50L65 40" stroke={BG} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <rect x="35" y="40" width="30" height="20" rx="2" stroke={BG} strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M56 55L63 48L56 48" stroke={cl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

export function KeepMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.keep;
  const cl = palette.brand.keepLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <rect x="38" y="40" width="24" height="18" rx="2" stroke={BG} strokeWidth="2.5" fill="none" opacity="0.8" />
      <path d="M38 42C38 36 50 30 50 30C50 30 62 36 62 42" stroke={BG} strokeWidth="2.5" fill="none" opacity="0.7" />
      <circle cx="50" cy="50" r="3.5" fill={BG} opacity="0.8" />
      <circle cx="50" cy="50" r="1.5" fill={cl} opacity="0.5" />
    </svg>
  );
}

export function StashMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.stash;
  const cl = palette.brand.stashLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <rect x="38" y="50" width="12" height="9" rx="1.5" fill={BG} opacity="0.7" />
      <rect x="50" y="50" width="12" height="9" rx="1.5" fill={BG} opacity="0.6" />
      <rect x="38" y="40" width="12" height="9" rx="1.5" fill={BG} opacity="0.8" />
      <rect x="50" y="40" width="12" height="9" rx="1.5" fill={BG} opacity="0.7" />
      <circle cx="44" cy="44.5" r="1.5" fill={cl} opacity="0.5" />
    </svg>
  );
}

export function MoatMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.moat;
  const cl = palette.brand.moatLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <circle cx="50" cy="48" r="16" stroke={BG} strokeWidth="2" fill="none" opacity="0.5" />
      <circle cx="50" cy="48" r="10" stroke={BG} strokeWidth="2.5" fill="none" opacity="0.7" />
      <circle cx="50" cy="48" r="4" fill={BG} opacity="0.8" />
      <circle cx="50" cy="48" r="2" fill={cl} opacity="0.5" />
      <rect x="49" y="32" width="10" height="3" fill={c} />
    </svg>
  );
}

export function ChronicleMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.chronicle;
  const cl = palette.brand.chronicleLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <rect x="39" y="36" width="22" height="26" rx="2" fill={BG} opacity="0.8" />
      <path d="M39 38C39 35 41 34 43 34H59C61 34 61 36 61 38" stroke={BG} strokeWidth="2" fill="none" opacity="0.6" />
      <line x1="43" y1="42" x2="57" y2="42" stroke={cl} strokeWidth="1.5" opacity="0.35" />
      <line x1="43" y1="47" x2="55" y2="47" stroke={cl} strokeWidth="1.5" opacity="0.3" />
      <line x1="43" y1="52" x2="57" y2="52" stroke={cl} strokeWidth="1.5" opacity="0.25" />
      <line x1="43" y1="57" x2="52" y2="57" stroke={cl} strokeWidth="1.5" opacity="0.2" />
    </svg>
  );
}

export function CloudMark({ size = 40 }: MarkProps): ReactElement {
  const c = palette.brand.cloud;
  const cl = palette.brand.cloudLight;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <HexShell color={c} lightColor={cl} />
      <path
        d="M38 54C34 54 32 51 32 48C32 45 34 43 37 43C37 39 40 36 44 36C47 36 49 37 50 39C51 37 54 36 57 36C61 36 64 39 64 43C67 43 69 45 69 48C69 51 67 54 63 54Z"
        fill={BG}
        opacity="0.75"
      />
      <path
        d="M42 50C40 50 38 49 38 47C38 45.5 39 44.5 40.5 44.5C40.5 42 42 40 44.5 40C46 40 47.5 41 48 42C49 41 50.5 40 52.5 40C55 40 57 42 57 44.5C59 44.5 60 45.5 60 47C60 49 59 50 57 50Z"
        fill={cl}
        opacity="0.2"
      />
    </svg>
  );
}

export const productMarks: Record<ProductKey, (props: MarkProps) => ReactElement> = {
  shroudb: ShrouDBMark,
  cloud: CloudMark,
  moat: MoatMark,
  sigil: SigilMark,
  cipher: CipherMark,
  stash: StashMark,
  keep: KeepMark,
  veil: VeilMark,
  forge: ForgeMark,
  sentry: SentryMark,
  courier: CourierMark,
  chronicle: ChronicleMark,
};

export function getProductMark(key: ProductKey) {
  return productMarks[key];
}

export function getProductColor(key: ProductKey) {
  return productColors[key];
}

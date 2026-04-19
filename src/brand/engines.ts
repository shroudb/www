import type { EngineKey } from "./palette";

export type EngineMeta = {
  key: EngineKey;
  name: string;
  tagline: string;
  description: string;
  commands: string[];
};

export const engines: EngineMeta[] = [
  {
    key: "sigil",
    name: "Sigil",
    tagline: "Issue and rotate every kind of credential.",
    description:
      "Stop building yet another JWT service. Sigil issues and rotates JWTs, API keys, HMAC secrets, refresh tokens, and passwords from one envelope-encrypted store — with lifecycle hooks and pub/sub baked in.",
    commands: ["ISSUE", "VERIFY", "REVOKE", "ROTATE", "JWKS"],
  },
  {
    key: "cipher",
    name: "Cipher",
    tagline: "Encrypt anything without touching the keys.",
    description:
      "Hand Cipher a plaintext, get back a ciphertext — your app never sees a key. Rotate every key with one command, and trust that plaintext never lands on disk.",
    commands: ["ENCRYPT", "DECRYPT", "REWRAP", "SIGN", "VERIFY_SIGNATURE"],
  },
  {
    key: "stash",
    name: "Stash",
    tagline: "Encrypted object storage you can revoke instantly.",
    description:
      "Stash encrypts blobs before they reach S3 and derives a fresh key per object. Shred the wrapping key and the data is gone — perfect for forgettable user uploads and sensitive artifacts.",
    commands: ["STORE", "RETRIEVE", "DELETE_BLOB", "REWRAP_BLOB"],
  },
  {
    key: "veil",
    name: "Veil",
    tagline: "Search encrypted data without leaking it.",
    description:
      "Veil runs fuzzy, prefix, and contains queries over encrypted documents — decrypting, matching, and re-encrypting in memory. The keys stay where they belong: in Cipher.",
    commands: ["ENCRYPTED_SEARCH", "FUZZY", "PREFIX", "CONTAINS"],
  },
  {
    key: "forge",
    name: "Forge",
    tagline: "Run an internal CA without running a PKI team.",
    description:
      "Forge issues, renews, and revokes short-lived X.509 certificates with a handful of commands. The internal CA you needed yesterday — without a six-month PKI project.",
    commands: ["ISSUE_CERT", "RENEW", "REVOKE_CERT", "CA_INFO"],
  },
  {
    key: "sentry",
    name: "Sentry",
    tagline: "Authorization decisions you can prove in court.",
    description:
      "Sentry evaluates versioned policies and signs every allow and deny. The audit trail isn't a log file you have to trust — it's cryptographically verifiable end-to-end.",
    commands: ["EVALUATE", "CHECK", "POLICY_LOAD", "DECISION_LOG"],
  },
  {
    key: "courier",
    name: "Courier",
    tagline: "Send sensitive notifications without leaving a trail.",
    description:
      "Courier decrypts, renders, sends, and zeroizes — plaintext exists only long enough to leave the building. PII-bearing emails, alerts, and webhooks without the lingering footprint.",
    commands: ["DELIVER", "RENDER", "DISPATCH", "ZEROIZE"],
  },
  {
    key: "keep",
    name: "Keep",
    tagline: "Get secrets out of env vars for good.",
    description:
      "Database passwords, API keys, connection strings — out of .env files and into Keep. Encrypted by Cipher, scoped by Sentry, rotatable on demand.",
    commands: ["PUT", "GET", "DELETE", "LIST", "ROTATE_SECRET"],
  },
  {
    key: "chronicle",
    name: "Chronicle",
    tagline: "One audit trail across every engine.",
    description:
      "Chronicle aggregates decision logs, command traces, and key lifecycle events into one queryable stream. Answer auditor questions without grepping seven log files.",
    commands: ["QUERY", "STREAM", "ALERT", "AUDIT_LOG"],
  },
];

export function getEngine(key: EngineKey): EngineMeta {
  const engine = engines.find((e) => e.key === key);
  if (!engine) {
    throw new Error(`Unknown engine: ${key}`);
  }
  return engine;
}

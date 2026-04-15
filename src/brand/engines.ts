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
    tagline: "Credential envelope store",
    description:
      "JWTs, API keys, HMAC secrets, refresh tokens, and passwords — each wrapped in an encrypted envelope with lifecycle management, automatic rotation, and pub/sub.",
    commands: ["ISSUE", "VERIFY", "REVOKE", "ROTATE", "JWKS"],
  },
  {
    key: "cipher",
    name: "Cipher",
    tagline: "Encryption-as-a-service",
    description:
      "Applications encrypt and decrypt without touching keys. Key rotation is a single command. Plaintext never touches disk.",
    commands: ["ENCRYPT", "DECRYPT", "REWRAP", "SIGN", "VERIFY_SIGNATURE"],
  },
  {
    key: "stash",
    name: "Stash",
    tagline: "Encrypted blob storage",
    description:
      "Cipher for files and objects. Encrypt, store, and retrieve blobs with envelope encryption, forensic watermarking, and per-object key derivation. Plaintext never hits storage.",
    commands: ["STORE", "RETRIEVE", "DELETE_BLOB", "REWRAP_BLOB"],
  },
  {
    key: "veil",
    name: "Veil",
    tagline: "Encrypted search proxy",
    description:
      "Search over encrypted data without exposing plaintext. Decrypt-match-reencrypt in memory. Veil never holds the keys.",
    commands: ["ENCRYPTED_SEARCH", "FUZZY", "PREFIX", "CONTAINS"],
  },
  {
    key: "forge",
    name: "Forge",
    tagline: "Internal certificate authority",
    description:
      "Lightweight internal CA for short-lived certificates. Issue, renew, and revoke X.509 certs without the overhead of a full PKI.",
    commands: ["ISSUE_CERT", "RENEW", "REVOKE_CERT", "CA_INFO"],
  },
  {
    key: "sentry",
    name: "Sentry",
    tagline: "Policy-as-code authorization",
    description:
      "Signed authorization decisions evaluated against versioned policies. Every allow and deny is auditable, every decision is cryptographically verifiable.",
    commands: ["EVALUATE", "CHECK", "POLICY_LOAD", "DECISION_LOG"],
  },
  {
    key: "courier",
    name: "Courier",
    tagline: "Secure notification delivery",
    description:
      "Decrypt, render, send, zeroize. Notifications pass through encrypted — Courier holds plaintext only long enough to deliver, then scrubs.",
    commands: ["DELIVER", "RENDER", "DISPATCH", "ZEROIZE"],
  },
  {
    key: "keep",
    name: "Keep",
    tagline: "Secrets manager",
    description:
      "Store, retrieve, and rotate arbitrary secrets. Encrypted by Cipher, scoped by Sentry. Database passwords, API keys, connection strings — out of env vars, into Keep.",
    commands: ["PUT", "GET", "DELETE", "LIST", "ROTATE_SECRET"],
  },
  {
    key: "chronicle",
    name: "Chronicle",
    tagline: "Metrics & audit plane",
    description:
      "Unified observability across every engine. Aggregates decision logs, command traces, and key lifecycle events into a single queryable stream.",
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

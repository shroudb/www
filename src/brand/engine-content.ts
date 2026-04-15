import type { EngineKey } from "./palette";

export type EngineContent = {
  features: string[];
  quickstart: { configTitle: string; config: string; runCommand: string };
  cmdTable: Array<[string, string, string]>;
  moatSnippet: string;
};

export const engineContent: Record<EngineKey, EngineContent> = {
  sigil: {
    features: [
      "Multiple credential types: JWTs, API keys, HMAC, refresh tokens, passwords",
      "Automatic rotation with configurable cadence",
      "JWKS endpoint for JWT verification",
      "Argon2id password hashing with pepper",
      "WAL-encrypted storage with per-keyspace HKDF",
      "Suspend and reinstate credentials without revoking",
      "Subscribe to lifecycle events via pub/sub",
    ],
    quickstart: {
      configTitle: "sigil.toml",
      config: `bind = ":7001"

[keyspaces.jwt]
type = "jwt"
algorithm = "ES256"
default_ttl = "1h"
rotation_days = 30

[keyspaces.api_key]
type = "api_key"
prefix = "sk_"
rotation_days = 90`,
      runCommand: "shroudb-sigil --config sigil.toml",
    },
    cmdTable: [
      ["ISSUE", "<keyspace> [--ttl DUR]", "Issue a new credential"],
      ["VERIFY", "<keyspace> <credential>", "Verify a credential is active"],
      ["REVOKE", "<keyspace> <id>", "Revoke a credential immediately"],
      ["REFRESH", "<refresh_token>", "Exchange a refresh token"],
      ["ROTATE", "<keyspace>", "Rotate signing keys"],
      ["JWKS", "<keyspace>", "Expose JWKS for a keyspace"],
      ["SUSPEND", "<id>", "Temporarily disable a credential"],
      ["UNSUSPEND", "<id>", "Re-enable a suspended credential"],
      ["PASSWORD_SET", "<user> <password>", "Argon2id hash and store"],
      ["PASSWORD_VERIFY", "<user> <password>", "Constant-time verify"],
    ],
    moatSnippet: `[engines.sigil]
enabled = true

[engines.sigil.keyspaces.jwt]
type = "jwt"
algorithm = "ES256"
default_ttl = "1h"`,
  },
  cipher: {
    features: [
      "Encrypt and decrypt without ever exposing key material",
      "Multiple algorithms: AES-256-GCM, ChaCha20-Poly1305, Ed25519, ECDSA-P256, HMAC-SHA256",
      "Automatic key rotation with versioned keyrings",
      "Convergent encryption for deterministic ciphertext",
      "Data key generation for envelope encryption",
      "Signing and signature verification",
      "Plaintext never touches disk",
    ],
    quickstart: {
      configTitle: "cipher.toml",
      config: `bind = ":7002"

[keyrings.payments]
algorithm = "aes-256-gcm"
rotation_days = 30

[keyrings.signatures]
algorithm = "ed25519"
rotation_days = 90`,
      runCommand: "shroudb-cipher --config cipher.toml",
    },
    cmdTable: [
      ["ENCRYPT", "<keyring> <plaintext> [CONTEXT ctx]", "Encrypt bytes under a keyring"],
      ["DECRYPT", "<keyring> <ciphertext>", "Decrypt a Cipher ciphertext"],
      ["REWRAP", "<keyring> <ciphertext>", "Re-encrypt to latest key version"],
      ["GENERATE_DATA_KEY", "<keyring>", "Envelope-encrypted data key"],
      ["SIGN", "<keyring> <message>", "Produce a signature"],
      ["VERIFY_SIGNATURE", "<keyring> <msg> <sig>", "Verify a signature"],
      ["ROTATE", "<keyring>", "Introduce a new key version"],
      ["KEY_INFO", "<keyring>", "Inspect versions and algorithm"],
    ],
    moatSnippet: `[engines.cipher]
enabled = true

[engines.cipher.keyrings.payments]
algorithm = "aes-256-gcm"`,
  },
  stash: {
    features: [
      "Envelope-encrypted blob storage backed by S3-compatible object stores",
      "Per-object key derivation via HKDF",
      "Forensic watermarking and fingerprinting",
      "Cascading revocation — shred the wrapping key, the blob is gone",
      "Plaintext never hits storage, only wrapped data keys",
      "Integrates with Cipher for key lifecycle",
    ],
    quickstart: {
      configTitle: "stash.toml",
      config: `bind = ":7003"

[storage]
backend = "s3"
bucket = "myorg-stash"
region = "us-east-1"

[cipher]
mode = "embedded"`,
      runCommand: "shroudb-stash --config stash.toml",
    },
    cmdTable: [
      ["STORE", "<path> <bytes>", "Encrypt and store a blob"],
      ["RETRIEVE", "<path>", "Fetch and decrypt a blob"],
      ["DELETE_BLOB", "<path>", "Remove a blob"],
      ["REWRAP_BLOB", "<path>", "Rotate the wrapping key"],
      ["LIST", "<prefix>", "List blobs under a prefix"],
    ],
    moatSnippet: `[engines.stash]
enabled = true

[engines.stash.storage]
backend = "s3"
bucket  = "myorg-stash"`,
  },
  veil: {
    features: [
      "Encrypted fuzzy, contains, exact, and prefix search",
      "Decrypt-match-reencrypt in memory — Veil never holds keys",
      "Embedded or remote Cipher for key operations",
      "Index management and rebuild commands",
      "Zeroization on match completion",
    ],
    quickstart: {
      configTitle: "veil.toml",
      config: `bind = ":7004"

[cipher]
mode = "embedded"

[keyrings.customers]
algorithm = "aes-256-gcm"`,
      runCommand: "shroudb-veil --config veil.toml",
    },
    cmdTable: [
      ["INDEX", "<keyring> <id> <text>", "Add document to encrypted index"],
      ["FUZZY", "<keyring> <query>", "Fuzzy match over encrypted docs"],
      ["CONTAINS", "<keyring> <query>", "Substring search"],
      ["EXACT", "<keyring> <query>", "Exact-match search"],
      ["PREFIX", "<keyring> <query>", "Prefix search"],
    ],
    moatSnippet: `[engines.veil]
enabled = true
# Automatically uses embedded Cipher`,
  },
  forge: {
    features: [
      "Lightweight internal CA for short-lived certificates",
      "Issue, renew, and revoke X.509 certs",
      "Supports ECDSA-P256, Ed25519, RSA-2048, RSA-4096",
      "CA rotation with overlap windows",
      "CRL and OCSP-style inspection",
      "HTTP sidecar for ACME-style issuance",
    ],
    quickstart: {
      configTitle: "forge.toml",
      config: `bind = ":7005"

[ca.internal]
common_name  = "Acme Internal CA"
organization = "Acme Corp"
key_algorithm = "ecdsa-p256"
validity_days = 3650
max_cert_ttl  = "720h"`,
      runCommand: "shroudb-forge --config forge.toml",
    },
    cmdTable: [
      ["CA_CREATE", "<id>", "Create a new CA"],
      ["CA_INFO", "<id>", "Inspect a CA"],
      ["CA_LIST", "", "List all CAs"],
      ["CA_ROTATE", "<id>", "Rotate the CA key"],
      ["ISSUE_CERT", "<ca> <csr>", "Issue a certificate"],
      ["RENEW", "<cert_id>", "Renew a certificate"],
      ["REVOKE_CERT", "<cert_id>", "Revoke a certificate"],
      ["INSPECT", "<cert_id>", "Inspect certificate details"],
    ],
    moatSnippet: `[engines.forge]
enabled = true

[engines.forge.ca.internal]
common_name = "Acme Internal CA"
key_algorithm = "ecdsa-p256"`,
  },
  sentry: {
    features: [
      "Signed, auditable authorization decisions",
      "Policies loaded from a directory, versioned",
      "Hot-reload on file change",
      "Key rotation with overlap for signature verification",
      "Every allow and deny is cryptographically verifiable",
    ],
    quickstart: {
      configTitle: "sentry.toml",
      config: `bind = ":7006"

[policies]
dir = "/etc/shroudb/policies"
auto_reload = true
reload_interval = "10s"`,
      runCommand: "shroudb-sentry --config sentry.toml",
    },
    cmdTable: [
      ["EVALUATE", "<policy> <input>", "Evaluate a decision"],
      ["CHECK", "<policy> <input>", "Boolean allow/deny check"],
      ["POLICY_LOAD", "<path>", "Load or reload policies"],
      ["POLICY_LIST", "", "List loaded policies"],
      ["POLICY_INFO", "<id>", "Inspect a policy"],
      ["KEY_ROTATE", "", "Rotate decision-signing key"],
      ["DECISION_LOG", "[FILTER]", "Stream signed decisions"],
    ],
    moatSnippet: `[engines.sentry]
enabled = true
policy_dir = "/etc/shroudb/policies"`,
  },
  courier: {
    features: [
      "Template-based secure delivery",
      "Recipients encrypted in transit",
      "Plaintext held only long enough to deliver, then zeroized",
      "Hot-reload templates",
      "Multiple channels: SMTP, webhook, push",
      "Template inspection and render preview",
    ],
    quickstart: {
      configTitle: "courier.toml",
      config: `bind = ":7007"

[templates]
dir = "/etc/shroudb/templates"
auto_reload = true

[channels.email]
type = "smtp"
host = "smtp.sendgrid.net"
port = 587

[channels.webhook]
type = "http"
timeout = "5s"
retry_count = 3`,
      runCommand: "shroudb-courier --config courier.toml",
    },
    cmdTable: [
      ["DELIVER", "<template> <channel> <recipient>", "Render and deliver"],
      ["RENDER", "<template> <vars>", "Preview a rendered template"],
      ["DISPATCH", "<template>", "Dispatch queued deliveries"],
      ["ZEROIZE", "<delivery_id>", "Force zeroize plaintext"],
      ["TEMPLATE_LIST", "", "List templates"],
      ["TEMPLATE_RELOAD", "", "Reload templates from disk"],
    ],
    moatSnippet: `[engines.courier]
enabled = true
template_dir = "/etc/shroudb/templates"`,
  },
  keep: {
    features: [
      "Store, retrieve, and rotate arbitrary secrets",
      "Per-path encryption with HKDF derivation",
      "Version history with configurable retention",
      "Auto-rotation hooks",
      "Path-based access control via Sentry",
      "WAL-encrypted storage",
    ],
    quickstart: {
      configTitle: "keep.toml",
      config: `bind = ":7008"

[storage]
max_versions = 10
default_ttl = "0"`,
      runCommand: "shroudb-keep --config keep.toml",
    },
    cmdTable: [
      ["PUT", "<path> <value>", "Store a secret"],
      ["GET", "<path> [--version N]", "Retrieve a secret"],
      ["DELETE", "<path>", "Soft-delete a secret"],
      ["LIST", "<prefix>", "List secrets under a prefix"],
      ["VERSIONS", "<path>", "List all versions"],
      ["ROTATE_SECRET", "<path>", "Rotate a secret's wrapping key"],
    ],
    moatSnippet: `[engines.keep]
enabled = true
max_versions = 10`,
  },
  chronicle: {
    features: [
      "Unified event stream across every engine",
      "Ingest audit events, command traces, key lifecycle events",
      "Query with filtering, aggregation, and time windows",
      "Hotspot detection and error-rate tracking",
      "Active actor and source monitoring",
      "HTTP sidecar for external ingestion",
    ],
    quickstart: {
      configTitle: "chronicle.toml",
      config: `bind = ":7009"
http_bind = ":8009"

[storage]
retention_days = 30
max_batch_size = 1000`,
      runCommand: "shroudb-chronicle --config chronicle.toml",
    },
    cmdTable: [
      ["QUERY", "<filter>", "Query events with a filter"],
      ["STREAM", "<filter>", "Stream events in real time"],
      ["ALERT", "<rule>", "Define an alert rule"],
      ["AUDIT_LOG", "<actor>", "Fetch audit log for an actor"],
      ["COUNT", "<filter>", "Count matching events"],
      ["HOTSPOTS", "[TOP N]", "Find the most active paths"],
      ["ERRORS", "[WINDOW]", "List errors in a window"],
      ["ACTORS", "[WINDOW]", "List active actors in a window"],
    ],
    moatSnippet: `[engines.chronicle]
enabled = true
retention_days = 30`,
  },
};

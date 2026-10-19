# Cuelio integration operations

This is the Murya-side deployment and evidence record for the Cuelio event
integration. It contains no credentials, event identifiers, payloads, user
IDs, or precise sensitive timestamps.

## Production activation — 2026-10-19

- Cuelio application version: `9431dc84-58c2-41e3-8e44-aee8617d9449`.
- Cuelio events Worker version: `a533a4c2-ac98-444c-b5bc-f9b9fc2d2231`, at
  100% traffic.
- Service binding: `MURYA_CONTROL_PLANE` → `murya-control-plane`.
- Production delivery and retention are enabled.
- Activation delivered two queued events, with zero retries and zero dead
  letters. Postflight reported zero pending, claimable, dead-letter, and
  expired claims and a recent `lastDeliveredAt`.
- Murya validated exactly two scheduled events plus the activation smoke, with
  no quarantine or duplicate groups. The release lease was cleared.
- Public smokes for `https://app.cuelio.io` and
  `https://control.murya.dev` returned 200.

## Credential operations

The founder password was updated through a one-time controlled process. Old
sessions and revocable verification state were cleared while the sole Owner,
identity, credential, verified TOTP, and immutable claim were preserved. The
temporary rotation utility was abandoned and not retained after security
review. Never record the password, hash, TOTP secret, credential value, event
data, or other sensitive identifiers here.

## Ongoing runbook

Monitor aggregate delivery health only. Preserve the at-least-once and
deduplication contract, investigate retries/dead letters before replaying, and
use the release rollback procedure when an incident requires disabling
delivery. Keep this record synchronized with the Cuelio-side runbook; do not
copy secret or event-level evidence into either repository.

## Operations ledger

| Date | Area | Result | Follow-up |
| --- | --- | --- | --- |
| 2026-10-19 | Cuelio event activation | Complete; two scheduled deliveries and activation smoke validated | Aggregate health monitoring |
| 2026-10-19 | Founder credential rotation | Complete; sessions and revocable verification state cleared; Owner/identity/TOTP/immutable claim preserved | No retained rotation utility |

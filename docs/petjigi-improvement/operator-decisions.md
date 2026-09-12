# Operator decisions

## Approval required

- Correct or reclassify Bucheon records after inspecting source jurisdiction, move history, administrative code, and raw record provenance.
- Apply any bulk redirect, noindex, retirement, or deletion plan.
- Change production DB, deploy, push, DNS, AdSense/GSC/CMP settings, or send real email.
- Publish substantive medical, legal, nutrition, emergency, or insurance corrections that require expert sign-off.
- Confirm account-level Auto ads exclusions and AdSense publisher/account state.
- Confirm whether `(주)펫지기` is the exact registered operating entity and provide the public disclosure fields that are actually required.
- Confirm that `contact@petjigi.kr` is monitored. A read-only 2026-09-12 DNS check found no MX answer; do not infer mailbox status from that alone or send a test message without authorization.
- Choose a deployment-backed distributed rate-limit store if newsletter abuse evidence warrants controls beyond the implemented honeypot and duplicate-email handling.

## Deliberately deferred

- No fabricated reviewer, credential, review date, price, rating, insurer status, or source was added.
- No missing GSC metrics were converted to zero.
- No inaccessible source was classified as false; it remains `UNVERIFIED` or `ACCESS_FAILED`.

# Goal

Resume from current main 73767e3, preserving all prior changes. Close the local browser-verification gap in the October 15 audit: isolated production build, search response races, mobile search/menu usability, and responsive smoke at 360/390/768/1440.

Acceptance: existing unit/type/lint checks pass; isolated browser checks pass; stale responses cannot repopulate cleared searches or replace newer results; errors recover; mobile menu Escape restores focus; current evidence is recorded separately from production proof.

No production DB, ETL, accounts, hosting, DNS, push or deployment changes.

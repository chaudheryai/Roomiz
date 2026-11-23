# Production readiness: what this demo does *not* do

## Prototype limitations

- No accounts or passwords.
- No school-email or identity verification.
- No private database or cross-device syncing.
- No real student profiles, candidate availability verification, consent records, or introductions.
- No actual payments, refunds, order fulfillment, delivery service or housing booking.
- No school approval or integration with UCR Housing.
- No scientific validation of compatibility scores.
- Demo admin is **not authenticated** and has no real access control.
- Example leads and requests are stored in the current visitor's browser only.

## Path to actual MVP

1. **Privacy and safety first:** Draft privacy notice, data-minimization plan, retention/deletion policy, reporting/moderation procedures, consent policy and age policy. Avoid handling physical IDs directly; seek a reputable verification provider if truly needed.
2. **Real backend:** Build a secure API and database with row-level access controls, TLS and backup/recovery (e.g. Supabase + server-side authorization). Never place API secrets in a GitHub Pages repository or client bundle.
3. **Authentication:** Support authorized staff access, verified student logins, account recovery, and clearly separated student/parent permissions.
4. **Availability:** Require candidates to explicitly opt in, confirm active search dates, and renew availability. Never scrape private groups or share profiles without consent.
5. **Service operations:** Admin review queues, screening checklists, candidate expiration, consented introductions, refund conditions, and fulfillment tracking.
6. **Payments:** Use a hosted payment flow from a regulated payment service; do not handle credit cards directly.
7. **Validation:** Run a controlled pilot, time actual labor, measure eligible matches, mutual introductions, purchased conversions, and refund rates before making performance claims.
8. **Legal and campus rules:** Get advice on business registration, platform terms, data privacy, school trademark and housing policies, and the scope of any move-in transportation or logistics services.

## Proposed acceptance metrics (targets to test, not historical results)

- Time from paid order to verified candidate shortlist.
- Percentage of orders receiving at least 3 active, consented candidates.
- Percentage of introduction requests with mutual acceptance.
- Actual time spent per $59.99 matching order.
- Paid conversion from the free questionnaire.
- Acquisition cost, refunds, satisfaction and referrals.
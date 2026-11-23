# Roomiz — Room Right. (Investor Demo)

A polished **static, interactive roommate concierge prototype** designed for a UCR investor pitch. Includes a student questionnaire, fictional compatibility matches, mock introduction requests, proposed service packages and a browser-local admin preview.

> **Demo only:** All student names are fictional and all scores are illustrative. This prototype does **not** confirm UCR enrollment, verify identity, communicate with students, accept payment, place roommates, or store data in a real database. It is not affiliated with UC Riverside.

## Try it immediately

1. Download or clone the repository.
2. Open **`index.html`** in Chrome, Edge, Safari or Firefox. No build step or npm installation is required.
3. Scroll to **Interactive prototype** and complete the questionnaire.
4. Click **Find my demo matches** and select **Request intro** on a sample profile.
5. Click **Demo admin** to see the local request. You can change mock request status.
6. Visit **Packages** and click **Preview package interest**. Confirm in the popup to record a mock customer-interest action in Admin.

The prototype deliberately uses **localStorage**, so records stay in that browser and can be cleared with **Reset demo data**. Other teammates, browser sessions, or devices will **not** see the same requests.

## Put it on GitHub Pages (no backend, no build)

1. Sign in to [GitHub](https://github.com/) and use the existing `chaudheryai/Roomiz` repository. Choose **Public** if using GitHub Pages on a free personal account.
2. Extract the ZIP and upload **the files inside** `roomiz-github-starter` to the **root** of the repository. Upload `index.html`, `styles.css`, `app.js`, `data.js`, the `assets/` folder, and the README. You can upload with **Add file → Upload files**. Hidden `.github/` templates may be added via Git or the GitHub file editor.
3. Commit to the `main` branch.
4. Open your repository's **Settings → Pages**.
5. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: main**, **Folder: / (root)**, then **Save**.
6. Once GitHub finishes publishing, your site is typically at `https://YOUR-USERNAME.github.io/Roomiz/` (substitute your actual username/repository name). Check **Settings → Pages** for the real published URL.

Because this is a zero-dependency static site, you do not need React, Vite, npm, a database, or GitHub Actions to deploy. A static foundation is a good way to demo the service before building a production application. See [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Files

```
roomiz-github-starter/
├── index.html               # Site sections, questionnaire, package cards
├── styles.css               # Responsive design / brand styling
├── data.js                  # Fictional candidate dataset
├── app.js                   # Match scoring, intro requests, package interest, local admin
├── assets/
│   └── favicon.svg
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── feature-request.md
├── CONTRIBUTING.md          # Suggested team workflow
├── DEMO_SCRIPT.md           # Two-minute investor demo walkthrough
├── SECURITY_AND_NEXT_STEPS.md
└── README.md
```

## Modify the content

- **Name, tagline, hero, packages, text:** Edit `index.html`.
- **Brand colors, font sizes, responsive layouts:** Edit `styles.css` (look for `:root`).
- **Fictional roommate profiles:** Edit `data.js`. Keep them clearly labeled fictional.
- **Compatibility weighting, search filters, actions:** Edit `app.js`.
- **Price:** Current proposal is **$59.99** and **$119.99**. Update the visible pricing in `index.html` and labels in package buttons if the business model changes.

### Matching explanation

The mock algorithm filters by housing type, applies the selected maximum rent for off-campus profiles, and ranks sample candidates based on sleep, cleanliness, noise, study style, and guests. The three selected priorities increase the weight of those factors. Scores are **illustrative demo indicators**, not scientifically validated compatibility probabilities.

## Recommended team workflow

- Create a GitHub **Organization** or use one founder's repo and invite the others as collaborators.
- Never share GitHub login credentials; invite each teammate with their own GitHub account.
- Protect `main` when possible and use feature branches, e.g. `feature/questionnaire`, `feature/pricing`.
- Open pull requests, ask another founder for review, and merge after previewing.
- Use **Issues** to assign tasks, bugs and improvements.

See `CONTRIBUTING.md` for suggested roles and conventions.

## Next step: moving from demo to actual service

GitHub Pages serves static files. **Do not use this prototype to collect real student IDs, contact information, payments or sensitive preferences.** A real product needs a secure backend, authentication, real consent checks, protected data storage, staff permissions, payment processing, operational workflows, and a privacy policy. See `SECURITY_AND_NEXT_STEPS.md`.

## Attribution and context

Built around the Roomiz Activity 2 MVP plan (profile → curated shortlist → introduction request) and the team's proposed $0 / $59.99 / $119.99 offers. The optional matching shortlist and admin interface are a demonstration, not evidence of real customer traction.
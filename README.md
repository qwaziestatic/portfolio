# Dagim Tsegaye: portfolio

Built with Astro. Azure Static Web Apps builds and hosts it for free.

## Where to change things

| To change...                          | Edit this file                  |
|---------------------------------------|---------------------------------|
| Name, intro, email, GitHub, LinkedIn  | `src/config.ts`                 |
| The site's web address (`siteUrl`)    | `src/config.ts`                 |
| Projects (text, status, links)        | `src/data/projects.ts`          |
| Certificates                          | `src/data/certificates.ts`      |
| Certificate scans                     | `public/certificates/`          |
| Colours and fonts                     | `src/styles/global.css`         |

To add a project or certificate, copy an existing block in the data file and edit it.
Each project automatically gets its own page at `/projects/<slug>/`.

## Preview on your computer

```
npm install      # first time only
npm run dev      # then open http://localhost:4321
```

## Publishing a privacy policy (needed before the Edge and Chrome stores)

1. Open `drafts/privacy/easyfilla.md` (or `swivel.md`, `meetsync.md`).
2. Replace `PASTE THE EASYFILLA PRIVACY POLICY HERE.` with the policy text.
3. Update the `updated:` date.
4. Move the file to `src/pages/privacy/` (create the folder the first time).
5. Push to GitHub. The page goes live at `/privacy/easyfilla/`.

## Azure Static Web Apps build settings

- Build preset: **Astro**
- App location: `/`
- Api location: *(leave empty)*
- Output location: `dist`

After the first deploy, copy the site's address into `siteUrl` in `src/config.ts`,
and do it again when your domain is connected.

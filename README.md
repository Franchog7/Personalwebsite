# Personal Website

Static personal website for Francisco Girón.

## Deployment

This site is deployed to **GitHub Pages** via GitHub Actions.

The workflow in `.github/workflows/deploy.yml` builds and publishes the site
on every push to `main` / `MAINWEB`, and can also be triggered manually
(`workflow_dispatch`).

### One-time setup

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to the tracked branch (or run the workflow manually) and the site
   will be published at `https://<user>.github.io/<repo>/`.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any
static server, e.g.:

```bash
python3 -m http.server 8080
```

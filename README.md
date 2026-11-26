# Z Evil loading screen

Live at: https://connorplehs.github.io/zevil-loading/

Server setting: `sv_loadingurl "https://connorplehs.github.io/zevil-loading/"`

Settings (links, backgrounds, music, tips, classes) are in the `CONFIG` block near the bottom of `index.html`.

Player name + profile picture come from the small helper in `steam-helper/worker.js`
(a free Cloudflare Worker). Its URL goes in `CONFIG.profileApi`. The Steam API key lives
only in Cloudflare as the secret `STEAM_KEY` - never put it in this repo.

Inspired by the Catharsis loading screen, used with their permission.

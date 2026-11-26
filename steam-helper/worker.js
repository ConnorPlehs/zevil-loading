// Z Evil loading screen - Steam profile helper (Cloudflare Worker)
// Gives the loading screen the joining player's Steam name + profile picture.
// Your Steam Web API key is stored in Cloudflare as a secret called STEAM_KEY.
// NEVER paste the key into this file or anywhere on GitHub.
export default {
  async fetch(request, env) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=600"
    };
    const id = new URL(request.url).searchParams.get("steamid") || "";
    if (!/^7656\d{13}$/.test(id)) {
      return new Response('{"error":"bad steamid"}', { status: 400, headers });
    }
    try {
      const r = await fetch(
        "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=" +
          env.STEAM_KEY + "&steamids=" + id,
        { cf: { cacheTtl: 600, cacheEverything: true } }
      );
      const j = await r.json();
      const p = j && j.response && j.response.players && j.response.players[0];
      if (!p) return new Response('{"error":"not found"}', { status: 404, headers });
      return new Response(JSON.stringify({ name: p.personaname, avatar: p.avatarfull }), { headers });
    } catch (e) {
      return new Response('{"error":"steam unavailable"}', { status: 502, headers });
    }
  }
};

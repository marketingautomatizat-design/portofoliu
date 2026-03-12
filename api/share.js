export default async function handler(req, res) {
  const slug = req.query.slug;
  if (!slug) return res.status(400).send("Missing slug");
  const resp = await fetch(
    `https://ajpvkrgxevtuswhmkwgw.supabase.co/rest/v1/projects?or=(slug.eq.${slug},id.eq.${slug})&limit=1`,
    { headers: { apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcHZrcmd4ZXZ0dXN3aG1rd2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1Mzc0NTEsImV4cCI6MjA4NzExMzQ1MX0.jwuhcRExP6MVEMpsKkiq7bUcM4TgcdkWc78LEdWwU7k" } }
  );
  const projects = await resp.json();
  const p = projects?.[0];
  if (!p) return res.status(404).send("Not found");
  const title = p.title||"Proiect", desc = p.short_description||"", image = p.image_url||"https://lovable.dev/opengraph-image-p98pqg.png";
  const url = `https://portofoliu-profittech.lovable.app/proiect/${p.slug||p.id}`;
  res.setHeader("Content-Type","text/html; charset=utf-8");
  res.send(`<!DOCTYPE html><html><head>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(desc)}"/>
<meta property="og:image" content="${esc(image)}"/>
<meta property="og:url" content="${esc(url)}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:image" content="${esc(image)}"/>
<meta http-equiv="refresh" content="0;url=${esc(url)}"/>
</head><body>Redirecting...</body></html>`);
}
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

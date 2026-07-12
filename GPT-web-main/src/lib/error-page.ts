export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page did not load | Dordo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { margin:0; min-height:100vh; display:grid; place-items:center; padding:24px; background:linear-gradient(180deg,#fbf6ee,#f7f0e7); color:#211b15; font:15px/1.6 Inter, system-ui, -apple-system, sans-serif; }
      .card { max-width:640px; width:100%; text-align:center; border:1px solid rgba(83,60,34,.16); background:rgba(255,250,244,.78); box-shadow:0 24px 70px rgba(40,31,21,.10); padding:56px 32px; }
      .brand { font-family:Georgia,serif; font-size:72px; line-height:1; letter-spacing:.06em; background:linear-gradient(112deg,#8a5b18,#d7ad55,#fff0a6,#b98221,#6f4715); -webkit-background-clip:text; background-clip:text; color:transparent; }
      h1 { margin:24px 0 0; font-family:Georgia,serif; font-size:28px; text-transform:uppercase; letter-spacing:.08em; }
      p { max-width:480px; margin:18px auto 0; color:#6f665d; }
      .divider { margin:20px auto 0; color:#9a6821; }
      .actions { margin-top:30px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
      a, button { height:44px; display:inline-flex; align-items:center; justify-content:center; padding:0 26px; font:inherit; font-size:11px; letter-spacing:.18em; text-transform:uppercase; cursor:pointer; text-decoration:none; }
      .primary { border:1px solid #151515; background:#151515; color:#f8f1e8; }
      .secondary { border:1px solid #b9ab9a; background:transparent; color:#211b15; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="brand">DORDO</div>
      <h1>This page did not load</h1>
      <div class="divider">— ✦ —</div>
      <p>Something went wrong on our end. You can try refreshing or return to the Dordo atelier.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}

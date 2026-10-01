import { httpServerHandler } from "cloudflare:node";

let expressHandlerPromise;

function getExpressHandler(env) {
  if (!expressHandlerPromise) {
    // Dashboard Variables and Secrets arrive on the fetch env binding. Copy
    // only string bindings before importing server.mjs, whose configuration is
    // initialized at module load time.
    for (const [key, value] of Object.entries(env)) {
      if (typeof value === "string") {
        process.env[key] = value;
      }
    }

    expressHandlerPromise = import("./server.mjs").then(() =>
      httpServerHandler({ port: 3000 })
    );
  }

  return expressHandlerPromise;
}

function assetRequest(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

function isStaticPath(pathname) {
  return (
    pathname === "/" ||
    pathname === "/index.html" ||
    pathname === "/dashboard.html" ||
    pathname === "/style.css" ||
    pathname.startsWith("/uploads/")
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // DIICOT nu mai folosește indexul propriu ca poartă de intrare.
    // HUB MAI este punctul central.
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return Response.redirect("https://mairushro.mairushro.workers.dev/", 302);
    }


    if (url.pathname === "/dashboard") {
      url.pathname = "/dashboard.html";
      return env.ASSETS.fetch(assetRequest(request, url.pathname));
    }

    if (isStaticPath(url.pathname)) {
      return env.ASSETS.fetch(assetRequest(request, url.pathname));
    }

    const expressHandler = await getExpressHandler(env);
    return expressHandler.fetch(request, env, ctx);
  }
};

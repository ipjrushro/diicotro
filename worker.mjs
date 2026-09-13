import "./server.mjs";
import { httpServerHandler } from "cloudflare:node";

const expressHandler = httpServerHandler({ port: 3000 });

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

    if (url.pathname === "/dashboard") {
      url.pathname = "/dashboard.html";
      return Response.redirect(url.toString(), 302);
    }

    if (isStaticPath(url.pathname)) {
      const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
      return env.ASSETS.fetch(assetRequest(request, pathname));
    }

    return expressHandler.fetch(request, env, ctx);
  }
};

import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const port = Number(process.env.PORT || 8765);
const host = process.env.HOST || "127.0.0.1";
const basePath = (process.env.BASE_PATH || "").replace(/\/$/, "");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);
    if (basePath) {
      if (pathname !== basePath && !pathname.startsWith(`${basePath}/`)) throw new Error("Outside preview base path");
      pathname = pathname.slice(basePath.length) || "/";
    }
    if (pathname.endsWith(".html")) {
      const cleanPath = pathname.endsWith("/index.html") ? pathname.slice(0, -"index.html".length) : pathname.slice(0, -".html".length);
      response.writeHead(301, { Location: `${basePath}${cleanPath}${url.search}` });
      response.end();
      return;
    }
    if (pathname.endsWith("/")) pathname += "index.html";
    let file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(`${root}${path.sep}`) && file !== path.join(root, "index.html")) throw new Error("Invalid path");
    if (!path.extname(file)) {
      try { await fs.access(file); }
      catch { file += ".html"; }
    }
    const data = await fs.readFile(file);
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(file)] || "application/octet-stream" });
    response.end(data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, host, () => console.log(`Eco Yard Supply preview: http://${host}:${port}${basePath}/`));

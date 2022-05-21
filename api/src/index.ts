import routes from "./routes";
import { Admin } from "./types/Constants";
import { Route } from "./types/Route";
import { ADMINS } from "./utils/Constants";
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.split('/')[1];

    const route = routes.find((r: Route) => r.name === path);

    if (!route) return new Response(JSON.stringify({
      error: `Route not found: '${path}'`,
      code: 404,
    }), { status: 404 });

    if (!route.auth) return route.handle(request); 

    if (!request.headers.get('Authorization')) return new Response(JSON.stringify({
      error: "Missing authorization header",
      code: 401,
    }), { status: 401 });

    const find = ADMINS.find((admin: Admin) => `${admin.username}:${admin.password}` === atob(request.headers.get('Authorization') || ""));
    
    if (!find) return new Response(JSON.stringify({
      error: "Invalid authorization header",
      code: 401,
    }), { status: 401 });

    return route.handle(request);
  },
};

import routes from "./routes";
import { Route } from "./types/Route";
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

    return route.handle(request);
  },
};

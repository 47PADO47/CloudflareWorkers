import BaseRoute from '../utils/BaseRoute';
import { DiscordWebhook } from '../utils/Utils';

class TestRoute extends BaseRoute {
    constructor() {
        super({
            name: "test",
        });
    }

    static async handle(request: Request): Promise<Response> {

        const url = new URL(request.url);
        const path = url.pathname.split(`/${this.name}`)[1];

        switch (path) {
            case "":
                return new Response(JSON.stringify({
                    message: "'/test' working"
                }), { status: 200 });
            case "/sendWebhook":
                const status = await DiscordWebhook({
                    title: "Test Call",
                    description: "This is a test!",
                });

                return new Response(JSON.stringify({
                    message: "Webhook sent!",
                    status,
                }), { status: 200 });
                
            default:
                return new Response(JSON.stringify({
                    error: `'/${this.name}${path}' not found`,
                    code: 404,
                }), { status: 404 });
        };
    };
};

export default TestRoute;
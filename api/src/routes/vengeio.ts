import BaseRoute from '../utils/BaseRoute';

class VengeioRoute extends BaseRoute {
    constructor() {
        super({
            name: "vengeio",
        });
    };

    static async handle(request: Request): Promise<Response> {
        const url = new URL(request.url);
        const path = url.pathname.split(`/${this.name}`)[1];

        switch (path) {
            case "/status":
                const status = await getStatus();
                return new Response(JSON.stringify(status), { status: 200 });
            default:
                return new Response(JSON.stringify({
                    error: `'/${this.name}${path}' not found`,
                    code: 404,
                }), { status: 404 });
        };
    };
};


async function getStatus() {
    const baseUrl = "https://gateway.venge.io"
    const response = await fetch(`${baseUrl}/online.php`);

    return response.json();
};

export default VengeioRoute;
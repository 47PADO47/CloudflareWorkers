import BaseRoute from '../utils/BaseRoute';
import { ADMINS } from '../utils/Constants';

class AuthRoute extends BaseRoute {
    constructor() {
        super({
            name: "auth",
        });
    }

    static async handle(request: Request): Promise<Response> {

        const url = new URL(request.url);
        const path = url.pathname.split(`/${this.name}`)[1];

        switch (path) {
            case "/login":
                if (request.method !== "POST") return new Response(JSON.stringify({
                    error: "Invalid request method",
                    code: 405,
                }), { status: 405 });

                const body = await request.json();
                if (!body.username || !body.password) return new Response(JSON.stringify({
                    error: "Missing username or password",
                    code: 400,
                }), { status: 400 });

                const search = ADMINS.find(admin => admin.username === body.username && admin.password === body.password);
                if (!search) return new Response(JSON.stringify({
                    error: "Invalid username or password",
                    code: 401,
                }), { status: 401 });

                return new Response(JSON.stringify({
                    token: `${btoa(`${body.username}:${body.password}`)}`,
                }), { status: 200 });
            
            default:
                return new Response(JSON.stringify({
                    error: `'/${this.name}${path}' not found`,
                    code: 404,
                }), { status: 404 });
        };
    };
};

export default AuthRoute;
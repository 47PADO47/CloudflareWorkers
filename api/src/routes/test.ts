import BaseRoute from '../utils/BaseRoute';

class TestRoute extends BaseRoute {
    constructor() {
        super({
            name: "test",
        });
    }

    static async handle(request: Request): Promise<Response> {
        return new Response(JSON.stringify({
            message: "'/test' working"
        }), { status: 200 });
    };
};

export default TestRoute;
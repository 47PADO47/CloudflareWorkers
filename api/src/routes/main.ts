import BaseRoute from '../utils/BaseRoute';

class MainRoute extends BaseRoute {
    constructor() {
        super({
            name: "",
        });
    }

    static async handle(request: Request): Promise<Response> {
        return new Response("Hello World!");
    };
};

export default MainRoute;
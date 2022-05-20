import { BaseRouteClass, BaseRouteOptions } from "../types/BaseRoute";

class BaseRoute implements BaseRouteClass {
    name: string;
    constructor(opts: BaseRouteOptions = {
        name: "",
    }) {
        this.name = opts.name;
    };

    async handle(request: Request): Promise<Response> {
        throw new Error("Method not implemented.");
    };
};

export default BaseRoute;
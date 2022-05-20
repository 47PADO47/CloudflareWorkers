interface BaseRouteOptions {
    name: string;
};

interface BaseRouteClass {
    name: string;
    handle(request: Request): Promise<Response>;
};

export type {
    BaseRouteOptions,
    BaseRouteClass
}
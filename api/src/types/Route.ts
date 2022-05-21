export type Route = {
    name: string;
    handle: (request: Request) => Promise<Response>;
    auth?: boolean;
};
import BaseRoute from '../utils/BaseRoute';
import assets from '../../assets';

class AssetsRoute extends BaseRoute {
    constructor() {
        super({
            name: "assets",
        });
    }

    static async handle(request: Request): Promise<Response> {

        const url = new URL(request.url);
        const pathname = url.pathname.split(`/${this.name}`)[1];
        const [empty, path, file] = pathname.split('/');
        

        if (!pathname || !path || !file) return new Response(JSON.stringify({
            error: "Invalid path",
            code: 400,
        }), { status: 400 });

        const assetsPath = assets.find(asset => asset.name === `/${path}`);
        if (!assetsPath) return new Response(JSON.stringify({
            error: `"${path}" path not found`,
            code: 404,
        }), { status: 404 });

        const filePath = assetsPath.files.find(f => f.name === file);
        if (!filePath) return new Response(JSON.stringify({
            error: `"${file}" file not found`,
            code: 404,
        }), { status: 404 });

        return new Response(JSON.stringify(filePath?.content || "{}"), {
            status: 200,
        });

    };
};

export default AssetsRoute;
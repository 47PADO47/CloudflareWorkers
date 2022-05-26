import { Route } from '../types/Route';
import AuthRoute from './auth';
import MainRoute from './main';
import TestRoute from './test';
import VengeioRoute from './vengeio';
import AssetsRoute from './assets';

const routes = [
    {
        name: '',
        handle: MainRoute.handle,
    },
    {
        name: 'test',
        handle: TestRoute.handle,
        auth: true,
    },
    {
        name: 'vengeio',
        handle: VengeioRoute.handle,
    },
    {
        name: 'auth',
        handle: AuthRoute.handle,
    },
    {
        name: 'assets',
        handle: AssetsRoute.handle,
    }
] as Route[];

export default routes;
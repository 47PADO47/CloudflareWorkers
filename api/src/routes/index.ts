import { Route } from '../types/Route';
import MainRoute from './main';
import TestRoute from './test';
import VengeioRoute from './vengeio';

const routes = [
    {
        name: '',
        handle: MainRoute.handle,
    },
    {
        name: 'test',
        handle: TestRoute.handle,
    },
    {
        name: 'vengeio',
        handle: VengeioRoute.handle,
    },
] as Route[];

export default routes;
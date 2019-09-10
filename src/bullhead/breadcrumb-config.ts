import {LightBullState} from './state';
import {BreadcrumbConfig} from './utils/breadcrumbs';

const resolveShowName = (state: LightBullState, {id}: {id: string}): string => {
    const show = state.shows.collection.find(show => show.id === id);
    return show ? show.name : 'Unknown show'
};

export const BREADCRUMB_CONFIG: Array<BreadcrumbConfig<LightBullState>> = [
    {
        route: '/',
        exact: true,
        title: 'Home'
    },
    {
        route: '/shows',
        title: 'Shows',
        children: [
            {
                route: '/:id',
                titleResolver: resolveShowName
            }
        ]
    },
    {
        route: '/system',
        title: 'System'
    }
];

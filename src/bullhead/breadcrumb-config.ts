import {LightBullState} from './state';
import {BreadcrumbConfig} from './utils/breadcrumbs';

const resolveShowName = (state: LightBullState, {showId}: {showId: string}): string => {
    const show = state.model.shows[showId];
    return show ? show.name : 'Unknown show';
};

const resolveVisualName = (state: LightBullState, {visualId}: {visualId: string}): string => {
    const visual = state.model.visuals[visualId];
    return visual ? visual.name : 'Unknown visual';
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
                route: '/:showId',
                titleResolver: resolveShowName,
                children: [
                    {
                        route: '/visuals/:visualId',
                        titleResolver: resolveVisualName
                    }
                ]
            }
        ]
    },
    {
        route: '/system',
        title: 'System'
    }
];

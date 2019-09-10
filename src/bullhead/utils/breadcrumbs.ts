import {matchPath} from 'react-router';

export interface BreadcrumbConfig<S, T = {}> {
    route: string;
    title?: string;
    exact?: boolean;
    titleResolver?: (state: S, params: T) => string;
    hideWithoutChildren?: boolean;
    children?: Array<BreadcrumbConfig<S, any>>;
}

export interface BreadcrumbInfo {
    url: string;
    title: string;
}

export const computeBreadcrumbs = <S>(currentPath: string,
                                      state: S,
                                      configs: Array<BreadcrumbConfig<S>>, parentRoute: string = ''): Array<BreadcrumbInfo> => {
    for (let i = 0; i < configs.length; i++) {
        const config = configs[i];
        const route = parentRoute + config.route;

        const matchResult = matchPath(currentPath, {
            path: route,
            exact: config.exact || false,
            strict: false
        });

        if (matchResult) {
            const url = matchResult.url;
            const title = resolveTitle(state, matchResult.params, config);


            const rootInfo = {
                url: url,
                title: title
            };

            const infos = [rootInfo];
            if (config.children) {
                const childInfos = computeBreadcrumbs(currentPath, state, config.children, route);
                childInfos.forEach(childInfo => infos.push(childInfo));
            }
            return infos;
        }
    }

    return [];
};

const resolveTitle = <S, T extends any>(state: S, params: T, config: BreadcrumbConfig<S, T>): string => {
    if (config.title) {
        return config.title;
    } else if (config.titleResolver) {
        return config.titleResolver(state, params);
    }
    throw new Error('You either have to set title or titleResolver in BreadcrumbConfig');
};
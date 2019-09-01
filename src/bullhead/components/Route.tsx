import {RouteComponentProps} from '@reach/router';
import React, {FunctionComponent} from 'react';

type RouteProps = {
    component: React.ComponentType
} & RouteComponentProps;

export const Route: FunctionComponent<RouteProps> = ({component: ChildComponent, ...rest}) => (
    <ChildComponent {...rest}/>
);
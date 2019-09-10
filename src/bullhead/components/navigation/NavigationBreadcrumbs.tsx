import {Breadcrumbs, Link, Typography} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, {useMemo} from 'react';
import {connect} from 'react-redux';
import {Link as RouterLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {BREADCRUMB_CONFIG} from '../../breadcrumb-config';
import {LightBullState} from '../../state';
import {computeBreadcrumbs} from '../../utils/breadcrumbs';

interface Props extends RouteComponentProps {
    state: LightBullState
}

export const PureNavigationBreadcrumbs = (props: Props) => {
    const infos = useMemo(() => computeBreadcrumbs(props.location.pathname, props.state, BREADCRUMB_CONFIG),
        [props.location.pathname, props.state]);

    const breadcrumbItems = infos.map((info, index) => {
        if (index === infos.length - 1) {
            return <Typography key={info.url} color='textPrimary'>{info.title}</Typography>;
        }
        return <Link key={info.url} color='inherit' component={RouterLink} to={info.url}>{info.title}</Link>;
    });

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} maxItems={4}>
            {breadcrumbItems}
        </Breadcrumbs>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    state: state
});

export const NavigationBreadcrumbs = withRouter(connect(
    mapStateToProps
)(PureNavigationBreadcrumbs));
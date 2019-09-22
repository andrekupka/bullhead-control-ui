import React from 'react';
import {connect} from "react-redux";
import {Config, EffectMap} from "../../model/Config";
import {LightBullState} from "../../state";
import {selectConfig} from "../../state/model/config/selectors";


const StringListView = ({title, names}: { title: string, names: Array<string> }) => {
    if (!names || names.length <= 0) {
        return null;
    }
    return <>
        <h3>{title}</h3>
        <ul>
            {names.map(name => <li key={name}>{name}</li>)}
        </ul>
    </>
};

const EffectView = ({effects}: { effects: EffectMap }) => {
    if (!effects || Object.keys(effects).length <= 0) {
        return null;
    }
    return <>
        <h3>Effects</h3>
        <ul>
            {Object.keys(effects).map(key => <li key={key}>{key} &rarr; {effects[key]}</li>)}
        </ul>
    </>;
};

const ConfigView = ({config}: { config: Config }) => {
    return <>
        <StringListView title='Parts' names={config.parts}/>
        <EffectView effects={config.effects}/>
        <StringListView title='Features' names={config.features}/>
    </>;
};

interface Props {
    config: Config | null;
}

export const PureSystemView = ({config}: Props) => {
    return <>
        <h1>System</h1>
        <p>This is the system overview.</p>
        {config && <ConfigView config={config}/>}
    </>;
};

const mapStateToProps = (state: LightBullState) => ({
    config: selectConfig(state)
});

export const SystemView = connect(
    mapStateToProps
)(PureSystemView);

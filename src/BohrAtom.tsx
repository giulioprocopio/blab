import React from 'react';

import atomicData from './atomic-data.json';
import { Atom, Electron, Nucleus, Orbital } from './components';

function _atomicDataFrom(
    match: (value: (typeof atomicData)[0]) => boolean,
    safe: boolean = false
) {
    const filter = atomicData.filter(match);
    if (filter.length === 0) {
        if (safe) return undefined;
        throw new Error('No atomic data found for this element');
    }
    if (filter.length > 1 && !safe) {
        throw new Error('Multiple atomic data found for this element');
    }

    return filter[0];
}

function _atomicDataFromAtomicNumber(z: number, safe: boolean = false) {
    return _atomicDataFrom(
        (atomicData) => atomicData.atomic_number === z,
        safe
    );
}

type BohrAtomProps = {
    nucleusRadius: number;
    orbitalRadiusDelta: number;
    z: number;
};

class BohrAtom extends React.Component<BohrAtomProps> {
    static defaultProps = {
        nucleusRadius: 25,
        orbitalRadiusDelta: 15,
        z: 5
    };

    render() {
        const atomicData = _atomicDataFromAtomicNumber(this.props.z);
        if (!atomicData) return null;

        return (
            <Atom>
                <Nucleus
                    radius={this.props.nucleusRadius}
                    symbol={atomicData.atomic_symbol}
                />
                {atomicData.electron_config.map((electrons, i) => (
                    <Orbital
                        key={i}
                        omega={(2 * Math.PI) / electrons} // XXX: Temporary.
                        radius={
                            this.props.nucleusRadius +
                            (i + 1) * this.props.orbitalRadiusDelta
                        }>
                        {[...Array(electrons).keys()].map((_, j) => (
                            <Electron key={j} />
                        ))}
                    </Orbital>
                ))}
            </Atom>
        );
    }
}

export default BohrAtom;

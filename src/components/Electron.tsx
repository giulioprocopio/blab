import React from 'react';

import './style.scss';

type ElectronProps = {
    color: string;
    radius: number;
    _center: { x: number; y: number };
};

class Electron extends React.Component<ElectronProps> {
    static defaultProps = {
        color: 'black',
        radius: 5,
        _center: { x: 0, y: 0 }
    };

    render() {
        const c = this.props._center;

        return (
            <circle
                className='blab-electron'
                fill={this.props.color}
                r={this.props.radius}
                cx={c.x}
                cy={c.y}
            />
        );
    }
}

export default Electron;

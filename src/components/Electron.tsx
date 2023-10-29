import React from 'react';

type ElectronProps = {
    color: string;
    radius: number;
};

class Electron extends React.Component<ElectronProps> {
    static defaultProps = {
        color: 'black',
        radius: 3
    };

    render() {
        return <circle fill={this.props.color} r={this.props.radius} />;
    }
}

export default Electron;

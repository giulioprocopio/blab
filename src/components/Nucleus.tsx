import React from 'react';

import './style.scss';

type NucleusProps = {
    color: string;
    radius: number;
    symbol: string;
    symbolColor: string;
    symbolSize: number;
    symbolOffset: { x: number; y: number };
    _center: { x: number; y: number };
};

class Nucleus extends React.Component<NucleusProps> {
    static defaultProps = {
        color: 'black',
        radius: 25,
        symbol: 'B',
        symbolColor: 'white',
        symbolSize: 20,
        symbolOffset: { x: 0, y: 2 }, // Fix font baseline.
        _center: { x: 0, y: 0 }
    };

    render() {
        const c = this.props._center;

        return (
            <g className='blab-nucleus'>
                <circle
                    cx={c.x}
                    cy={c.y}
                    fill={this.props.color}
                    r={this.props.radius}
                />
                <text
                    className='blab-symbol'
                    dominantBaseline='middle'
                    fill={this.props.symbolColor}
                    fontSize={this.props.symbolSize}
                    textAnchor='middle'
                    x={c.x + this.props.symbolOffset.x}
                    y={c.y + this.props.symbolOffset.y}>
                    {this.props.symbol}
                </text>
            </g>
        );
    }
}

export default Nucleus;

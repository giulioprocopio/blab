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
        symbolSize: 30,
        symbolOffset: { x: 0, y: 3 }, // Fix font baseline.
        _center: { x: 0, y: 0 }
    };

    render() {
        const c = this.props._center;

        return (
            <svg className='blab-nucleus' overflow='visible' x={c.x} y={c.y}>
                <circle fill={this.props.color} r={this.props.radius} />
                <text
                    className='blab-nucleus-symbol'
                    dominantBaseline='middle'
                    fill={this.props.symbolColor}
                    fontSize={this.props.symbolSize}
                    textAnchor='middle'
                    x={this.props.symbolOffset.x}
                    y={this.props.symbolOffset.y}>
                    {this.props.symbol}
                </text>
            </svg>
        );
    }
}

export default Nucleus;

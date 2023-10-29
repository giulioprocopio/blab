import React from 'react';

type OrbitalProps = {
    children: React.ReactNode;
    color: string;
    lines: number;
    omega: number; // Angular velocity
    psi: number; // Phase
    radius: number;
    width: number;
    _center: { x: number; y: number };
};

class Orbital extends React.Component<OrbitalProps> {
    static defaultProps = {
        color: 'black',
        lines: 2,
        omega: 0,
        psi: 0,
        radius: 60,
        width: 4,
        _center: { x: 0, y: 0 }
    };

    render() {
        const c = this.props._center;

        // User may define more than one line.  Evaluate stroke tickness to fit
        // evenly spaced lines within the given width.
        const lineWidth = this.props.width / (2 * this.props.lines - 1);

        return (
            <svg className='blab-orbital' overflow='visible' x={c.x} y={c.y}>
                {[...Array(this.props.lines)].map((_, i) => {
                    return (
                        <circle
                            key={i}
                            fill='none'
                            r={this.props.radius - 2 * lineWidth * (i + 1)}
                            stroke={this.props.color}
                            strokeWidth={lineWidth}
                        />
                    );
                })}
                {this.props.children}
            </svg>
        );
    }
}

export default Orbital;

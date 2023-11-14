import React from 'react';

import './style.scss';

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
    // XXX: We don't really have nice way of evaluating the orbital radius, so
    // we just pick a default value a little larger than the nucleus radius.
    // Note though that when rendering multiple orbitals, their default radii
    // will overlap, at wich point the user should specify a radius.
    static defaultProps = {
        color: 'black',
        lines: 2,
        omega: 1,
        psi: 0,
        radius: 40,
        width: 4,
        _center: { x: 0, y: 0 }
    };

    render() {
        const c = this.props._center;

        const childCount = React.Children.count(this.props.children),
            childAngleDistance = (2 * Math.PI) / childCount;
        const children = React.Children.map(this.props.children, (child, i) => {
            if (React.isValidElement(child)) {
                const childAngle = childAngleDistance * i + this.props.psi;
                return React.cloneElement(child, {
                    _center: {
                        x: Math.cos(childAngle) * this.props.radius + c.x,
                        y: Math.sin(childAngle) * this.props.radius + c.y
                    }
                } as React.Attributes);
            }
        });

        // User may define more than one line.  Evaluate stroke tickness to fit
        // evenly spaced lines within the given width.
        const width = this.props.width / (2 * this.props.lines - 1),
            radius = this.props.radius + this.props.width / 2;

        return (
            <g
                className='blab-orbital'
                style={{
                    animation: `blab-spin ${
                        (2 * Math.PI) / this.props.omega
                    }s linear infinite`
                }}>
                {[...Array(this.props.lines)].map((_, i) => {
                    return (
                        <circle
                            key={i}
                            fill='none'
                            r={radius - 2 * width * i}
                            stroke={this.props.color}
                            strokeWidth={width}
                            cx={c.x}
                            cy={c.y}
                        />
                    );
                })}
                {children}
            </g>
        );
    }
}

export default Orbital;

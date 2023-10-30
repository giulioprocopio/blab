import React from 'react';

import './style.scss';

type AtomProps = {
    children: React.ReactNode;
};

type AtomState = {
    center: { x: number; y: number };
};

class Atom extends React.Component<AtomProps, AtomState> {
    state: AtomState = { center: { x: 0, y: 0 } };
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: AtomProps) {
        super(props);

        this.ref = React.createRef();
    }

    componentDidMount() {
        const parent = this.ref.current?.parentElement;
        if (parent) {
            const { width, height } = parent.getBoundingClientRect();
            this.setState({ center: { x: width / 2, y: height / 2 } });
        } else {
            console.error('Atom parent element not found');
        }
    }

    render() {
        const c = this.state.center;

        const children = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    _center: this.state.center
                } as React.Attributes);
            }
            return child;
        });

        return (
            <div className='blab-atom' ref={this.ref}>
                <svg
                    overflow='visible'
                    preserveAspectRatio='xMinYMin meet'
                    viewBox={`0 0 ${c.x * 2} ${c.y * 2}`}>
                    {children}
                </svg>
            </div>
        );
    }
}

export default Atom;

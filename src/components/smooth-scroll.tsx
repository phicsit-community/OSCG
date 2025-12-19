"use client";

import { ReactLenis} from 'lenis/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SmoothScroll({ children }: { children: any }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScroll;

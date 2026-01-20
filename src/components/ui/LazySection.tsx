"use client";

import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface LazySectionProps {
    children: ReactNode;
    height?: string;
    offset?: string;
}

export const LazySection = ({ children, height = "400px", offset = "200px" }: LazySectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        margin: offset as any
    });

    return (
        <div ref={ref} style={{ minHeight: isInView ? "auto" : height }}>
            {isInView ? children : null}
        </div>
    );
};

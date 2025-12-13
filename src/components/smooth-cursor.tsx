"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SmoothCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const cursorSize = 20;

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    };

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            const { clientX, clientY } = e;
            mouse.x.set(clientX - cursorSize / 2);
            mouse.y.set(clientY - cursorSize / 2);
        };

        const manageMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", manageMouseMove);
        window.addEventListener("mouseleave", manageMouseLeave);

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            window.removeEventListener("mouseleave", manageMouseLeave);
        };
    }, [isVisible, mouse.x, mouse.y]);

    if (!isVisible) return null;

    return (
        <motion.div
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
            }}
            className="fixed z-[9999] pointer-events-none w-5 h-5 bg-white rounded-full mix-blend-difference"
        />
    );
};

export default SmoothCursor;

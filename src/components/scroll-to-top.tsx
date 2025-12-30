"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function ScrollToTop() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            // Small timeout to ensure the new page content is rendered
            // then smoothly scroll to top instead of snapping
            setTimeout(() => {
                lenis.scrollTo(0, {
                    immediate: false,
                    force: true,
                    lock: true
                });
            }, 50);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname, lenis]);

    return null;
}

import { useEffect } from "react";
import dynamic from "next/dynamic";

const Calendly = () => {
    useEffect(() => {
        // Add Calendly widget script dynamically
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.head.appendChild(script);

        // Cleanup on unmount
        return () => {
            const existingScript = document.querySelector(
                'script[src="https://assets.calendly.com/assets/external/widget.js"]'
            );
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return (
        <div
            className="calendly-inline-widget min-w-[320px] md:h-[650px] h-[480px]"
            data-url="https://calendly.com/bodykore"
        ></div>
    );
};

// Ensure no server-side rendering
export default dynamic(() => Promise.resolve(Calendly), { ssr: false });

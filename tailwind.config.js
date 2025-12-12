import daisyui from "daisyui";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Keeping these for utility usage if needed, though DaisyUI maps them
                primary: "#4f46e5",
                secondary: "#8b5cf6",
                accent: "#3b82f6",
            }
        },
    },
    plugins: [
        daisyui,
    ],
    daisyui: {
        themes: [
            {
                scholarstream: {
                    "primary": "#4f46e5",
                    "secondary": "#8b5cf6",
                    "accent": "#3b82f6",
                    "neutral": "#0f172a",
                    "base-100": "#ffffff",
                    "base-200": "#f8fafc",
                    "info": "#3b82f6",
                    "success": "#10b981",
                    "warning": "#f59e0b",
                    "error": "#ef4444",
                },
            },
            "light",
        ],
    },
}

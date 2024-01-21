/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#E39F8C",
                    200: "#DF917C",
                    300: "#DB836B",
                    400: "#D7765B",
                    500: "#D3684A",
                    600: "#CF5A3A",
                    700: "#C55030",
                    800: "#B5492C",
                    900: "#A44328",
                },
                secondary: {
                    100: "#FFD700",
                    200: "#FFECB3",
                    300: "#FFE082",
                    400: "#FFC107",
                    500: "#FFB300",
                    600: "#FFB300",
                    700: "#FFA000",
                    800: "#FF8F00",
                    900: "#FF6F00",
                },
            },
            spacing: {
                128: "32rem",
                144: "36rem",
                160: "40rem",
                176: "44rem",
                192: "48rem",
                208: "52rem",
                224: "56rem",
                240: "60rem",
                256: "64rem",
                272: "68rem",
                288: "72rem",
                304: "76rem",
                320: "80rem",
                336: "84rem",
                352: "88rem",
                368: "92rem",
                384: "96rem",
                400: "100rem",
                "50%": "calc(50% - 5px)",
            },
        },
        keyframes: {
            growShrink: {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.2)" },
            },
            tick: {
                "100%": {
                    transform: "rotate(360deg)",
                },
            },
        },
        animation: {
            growShrink: "growShrink 1s ease-in-out infinite",
            tick: "tick 60s linear infinite",
        },
    },
    plugins: [],
};

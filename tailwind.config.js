/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#F8E0E6",
                    200: "#F48FB1",
                    300: "#EC407A",
                    400: "#D81B60",
                    500: "#C2185B",
                    600: "#AD1457",
                    700: "#880E4F",
                    800: "#7D1B52",
                    900: "#621C2C",
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
        },
        animation: {
            growShrink: "growShrink 1s ease-in-out infinite",
        },
    },
    plugins: [],
};

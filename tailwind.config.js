/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./src/**/*.{html,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#fcf4e5",
                    100: "#fbefd9",
                    200: "#f5dcb3",
                    300: "#efc582",
                    400: "#e7a350",
                    500: "#e2882d",
                    600: "#d37023",
                    700: "#af571f",
                    800: "#8c4520",
                    900: "#713a1d",
                    950: "#3d1d0d",
                },
                secondary: {
                    50: "#fffaeb",
                    100: "#fef0c7",
                    200: "#fde08a",
                    300: "#fdd163",
                    400: "#fcb423",
                    500: "#f6920a",
                    600: "#da6c05",
                    700: "#b54a08",
                    800: "#93390d",
                    900: "#78300f",
                    950: "#451703",
                },
                viking: {
                    50: "#f0fbfb",
                    100: "#d8f3f5",
                    200: "#b5e7ec",
                    300: "#82d4de",
                    400: "#60c2cf",
                    500: "#2d9dad",
                    600: "#288092",
                    700: "#266778",
                    800: "#275663",
                    900: "#244855",
                    950: "#132f39",
                },
                tangerine: {
                    50: "#fef3f2",
                    100: "#ffe4e1",
                    200: "#ffcec8",
                    300: "#ffada2",
                    400: "#fd8879",
                    500: "#f5533e",
                    600: "#e23620",
                    700: "#bf2916",
                    800: "#9d2617",
                    900: "#82261a",
                    950: "#470f08",
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
    plugins: [
        plugin(
            ({ matchUtilities, theme }) => {
                matchUtilities(
                    {
                        "icon-size": (value) => ({
                            width: value,
                            height: value,
                            minWidth: value,
                            minHeight: value,
                            fontSize: value,
                            lineHeight: value,
                            [`svg`]: {
                                width: value,
                                height: value,
                            },
                        }),
                    },
                    {
                        values: theme("iconSize"),
                    }
                );
            },
            {
                theme: {
                    iconSize: {
                        3: "0.75rem",
                        3.5: "0.875rem",
                        4: "1rem",
                        4.5: "1.125rem",
                        5: "1.25rem",
                        6: "1.5rem",
                        7: "1.75rem",
                        8: "2rem",
                        10: "2.5rem",
                        12: "3rem",
                        14: "3.5rem",
                        16: "4rem",
                        18: "4.5rem",
                        20: "5rem",
                        22: "5.5rem",
                        24: "6rem",
                    },
                },
            }
        ),
    ],
};

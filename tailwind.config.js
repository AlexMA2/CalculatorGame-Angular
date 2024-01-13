/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                primary: "#EAF1DF",
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
            },
        },
    },
    plugins: [],
};

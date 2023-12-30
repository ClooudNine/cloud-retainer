/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                'wish-item-appearance': {
                    '0%': {
                        transform: 'scale(8) translateX(-20px)',
                        filter: 'brightness(0%)',
                    },
                    '35%, 75%': {
                        transform: 'scale(1) translateX(-20px)',
                    },
                    '75%': {
                        filter: 'brightness(0%)',
                    },
                    '100%': {
                        transform: 'scale(1) translateX(0)',
                        filter: 'brightness(100%) drop-shadow(10px 22px 1px rgba(0, 0, 0, 1))',
                    },
                },
                'item-background-appearance': {
                    '0%, 70%': {
                        transform: 'translateX(-20px)',
                        opacity: 0,
                    },
                    '100%': {
                        transform: 'translateX(0)',
                        opacity: 1,
                    },
                },
                'item-description-appearance': {
                    '0%, 70%': {
                        transform: 'translateX(80px)',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                    },
                },
                'item-title-appearance': {
                    '0%, 70%': {
                        opacity: 0,
                    },
                    '100%': {
                        opacity: 1,
                    },
                },
                'item-icon-appearance': {
                    '0%, 60%': {
                        opacity: 0,
                    },
                    '60%': {
                        filter: 'drop-shadow(0px 0px 10px rgba(201, 192, 224, 0.5)) brightness(150%)',
                    },
                    '70%': {
                        opacity: 1,
                        filter: 'drop-shadow(0px 0px 10px rgba(201, 192, 224, 1)) brightness(150%)',
                    },
                    '100%': {
                        filter: 'drop-shadow(0px 0px 0px rgba(201, 192, 224, 0)) brightness(150%)',
                    },
                },
                'item-stars-appearance': {
                    '0%, 70%': {
                        opacity: 0,
                        transform: 'scale(2)',
                        filter: 'brightness(150%)',
                    },
                    '90%, 100%': {
                        opacity: 1,
                        transform: 'scale(1)',
                        filter: 'brightness(125%) drop-shadow(0px 0px 25px rgba(255, 249, 72, 1))',
                    },
                    '100%': {
                        filter: 'brightness(100%) drop-shadow(0px 0px 25px rgba(255, 249, 72, 0))',
                    },
                },
                'masterless-currency-appearance': {
                    '0%, 60%': {
                        opacity: 0,
                    },
                    '60%': {
                        boxShadow:
                            '100px 0 70px -50px rgba(83,59,122,1) inset, 300px 0 70px -50px rgba(254,213,255,1) inset, 500px 0 70px -50px rgba(132,81,209,255) inset',
                    },
                    '75%': {
                        boxShadow:
                            '100px 0 70px -50px rgba(83,59,122,1) inset, 300px 0 70px -50px rgba(229,103,255,1) inset, 500px 0 70px -50px rgba(132,81,209,255) inset',
                    },
                    '100%': {
                        boxShadow:
                            '200px 0 70px -50px rgba(94,52,145,255) inset, 500px 0 70px -50px rgba(53,42,73,255) inset',
                        opacity: 1,
                    },
                },
                'star-effect': {
                    '0%, 60%': {
                        opacity: 0,
                    },
                    '60%': {
                        zIndex: 10,
                        transform: 'scale(1.5)',
                        clipPath:
                            'polygon(50% 0, 70% 30%, 99% 48%, 70% 70%, 50% 100%, 30% 70%, 0 50%, 30% 30%)',
                    },
                    '70%': {
                        zIndex: 10,
                    },
                    '100%': {
                        clipPath:
                            'polygon(50% 0, 55% 45%, 99% 48%, 55% 55%, 50% 100%, 45% 55%, 0 50%, 45% 45%)',
                        zIndex: -10,
                        transform: 'scale(1)',
                        opacity: 1,
                    },
                },
                'banner-preview-appearance': {
                    '0%': {
                        opacity: 0,
                        transform: 'translateX(60px)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateX(0)',
                    },
                },
            },
            animation: {
                'wish-item-appearance': 'wish-item-appearance 1.3s forwards',
                'item-background-appearance': 'item-background-appearance 1.3s forwards',
                'item-description-appearance':
                    'item-description-appearance 1.3s forwards',
                'item-title-appearance': 'item-title-appearance 1.3s forwards',
                'item-icon-appearance': 'item-icon-appearance 2s forwards',
                'item-stars-appearance': 'item-stars-appearance 2.5s forwards',
                'masterless-currency-appearance':
                    'masterless-currency-appearance 2s forwards',
                'star-effect': 'star-effect 2s forwards',
                'banner-preview-appearance': 'banner-preview-appearance 0.8s',
            },
            dropShadow: {
                'shop-item': [
                    '0 5px 0 #ffffff',
                    '0 -5px 0 #ffffff',
                    '5px 0 0 #ffffff',
                    '-5px 0 0 #ffffff',
                ],
            },
            fontFamily: {
                genshin: ['var(--font-genshin)'],
            },
            cursor: {
                genshin: 'url("/common/genshin-cursor.cur"), default',
            },
        },
    },
    plugins: [],
};

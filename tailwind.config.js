/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            xs: '481px',
            ...defaultTheme.screens,
        },
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
                'masterless-stardust-appearance': {
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
                'masterless-starglitter-appearance': {
                    '0%, 60%': {
                        opacity: 0,
                    },
                    '60%': {
                        boxShadow:
                            '100px 0 70px -50px rgba(255,251,68,1) inset, 300px 0 70px -50px rgba(244,209,52,1) inset, 500px 0 70px -50px rgba(110,89,54,1) inset',
                    },
                    '75%': {
                        boxShadow:
                            '100px 0 70px -50px rgba(223,177,48,1) inset, 300px 0 70px -50px rgba(169,126,34,1) inset, 500px 0 70px -50px rgba(91,73,51,1) inset',
                    },
                    '100%': {
                        boxShadow:
                            '200px 0 70px -50px rgba(202,159,54,1) inset, 500px 0 70px -50px rgba(175,136,53,0.7) inset',
                        opacity: 1,
                    },
                },
                'star-effect': {
                    '0%, 60%': {
                        opacity: 0,
                    },
                    '60%': {
                        transform: 'scale(1.5)',
                        clipPath:
                            'polygon(50% 0, 70% 30%, 99% 48%, 70% 70%, 50% 100%, 30% 70%, 0 50%, 30% 30%)',
                    },
                    '100%': {
                        clipPath:
                            'polygon(50% 0, 55% 45%, 99% 48%, 55% 55%, 50% 100%, 45% 55%, 0 50%, 45% 45%)',
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
                'modal-appearance': {
                    '0%': {
                        opacity: 0,
                        transform: 'scale(0.95)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                },
                'obtain-item': {
                    '0%': {
                        transform: 'scale(0)',
                        opacity: 1,
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: 0,
                    },
                },
                'multi-wish-appearance': {
                    to: {
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
                'masterless-stardust-appearance':
                    'masterless-stardust-appearance 2s forwards',
                'masterless-starglitter-appearance':
                    'masterless-starglitter-appearance 2s forwards',
                'star-effect': 'star-effect 2s forwards',
                'banner-preview-appearance': 'banner-preview-appearance 0.8s forwards',
                'modal-appearance': 'modal-appearance 0.3s ',
                'obtain-item': 'obtain-item 0.6s forwards',
                'multi-wish-appearance': 'multi-wish-appearance 1s forwards',
            },
            dropShadow: {
                'shop-item': [
                    '0 5px 0 #ffffff',
                    '0 -5px 0 #ffffff',
                    '5px 0 0 #ffffff',
                    '-5px 0 0 #ffffff',
                ],
                'three-star-item': ['0 -8px 2px #b5e2fe', '0 8px 2px #b5e2fe'],
                'four-star-item': ['0 -14px 2px #a898fd', '0 14px 2px #a898fd'],
                'five-star-item': ['0 -20px 2px #fffd84', '0 20px 2px #fffd84'],
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

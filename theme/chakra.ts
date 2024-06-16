import {extendTheme} from '@chakra-ui/react'
import {Kanit, Poppins, Tangerine} from 'next/font/google';

const bodyFont = Poppins({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
});

const headingFont = Kanit({
    weight: ['600'],
    subsets: ['latin']
});

const writingFont = Tangerine({
    weight: ['700'],
    subsets: ['latin']
});

const colors = {
    // #e6e5c6
    primary: {
        '50': '#f9f8f1',
        '100': '#e6e5c6',
        '200': '#dbd9ac',
        '300': '#c8c381',
        '400': '#bbb264',
        '500': '#af9c51',
        '600': '#9a8145',
        '700': '#81663c',
        '800': '#6b5335',
        '900': '#59452e',
        '950': '#312417',
    }
}

export const global = {
    colors,
    fonts: {
        body: bodyFont.style.fontFamily,
        heading: headingFont.style.fontFamily,
        writing: writingFont.style.fontFamily,
    },
}

export const chakra = extendTheme(global)

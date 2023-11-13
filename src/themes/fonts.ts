import { app } from '../services/firebase';

export const desiredGoogleFonts = [
    'Arvo',
    'Josefin Sans',
    'Lato',
    'Merriweather',
    'Montserrat',
    'Nunito',
    'Open Sans',
    'Oswald',
    'Playfair Display',
    'Poppins',
    'Raleway',
    'Roboto',
    'Slabo 27px',
    'Source Sans Pro',
];

const desiredFontWeights = [400, 700];

const createGoogleFontsUrl = (fonts: Array<string>, weights: Array<number>) => {
    const baseUrl = 'https://fonts.googleapis.com/css2';
    const queryParams = fonts
        .map(font => {
            const fontName = encodeURIComponent(font); // Replace spaces with '+'
            const fontWeights = weights.join(';'); // Join all weights with ';'
            return `family=${fontName}:wght@${fontWeights}`;
        })
        .join('&'); // Join all font queries with '&'

    return `${baseUrl}?${queryParams}&display=swap`;
};

export function fetchGoogleFonts() {
    fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${app.options.apiKey}`
    );
}

export function createLinkToGoogleFonts() {
    const googleFontsUrl = createGoogleFontsUrl(
        desiredGoogleFonts,
        desiredFontWeights
    );
    const linkEl = document.createElement('link');
    linkEl.href = googleFontsUrl;
    linkEl.rel = 'stylesheet';
    document.head.appendChild(linkEl);
    return linkEl;
}

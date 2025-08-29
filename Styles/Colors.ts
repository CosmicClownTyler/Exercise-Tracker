import type { ColorTheme, ColorHex, ColorRGB } from '@/types/types';

export const DarkColorTheme: ColorTheme = {
    isDark: true,
    background: '#000000',
    primary: '#ffffff',
    secondary: '#999999',
    foreground: '#111111',
    borders: '#333333',
    accent: '#00aaff',
};
export const LightColorTheme: ColorTheme = {
    isDark: false,
    background: '#ffffff',
    primary: '#000000',
    secondary: '#666666',
    foreground: '#eeeeee',
    borders: '#cccccc',
    accent: '#0055ff',
};
export const Accents = {
    DarkRed: '#800000' as ColorHex,
    Red: '#FF0000' as ColorHex,
    LightRed: '#FF8080' as ColorHex,
    DarkOrange: '#804000' as ColorHex,
    Orange: '#FF8000' as ColorHex,
    LightOrange: '#FFBF80' as ColorHex,
    DarkYellow: '#808000' as ColorHex,
    Yellow: '#FFFF00' as ColorHex,
    LightYellow: '#FFFF80' as ColorHex,
    DarkGreen: '#008000' as ColorHex,
    Green: '#00FF00' as ColorHex,
    LightGreen: '#80FF80' as ColorHex,
    DarkAqua: '#008080' as ColorHex,
    Aqua: '#00FFFF' as ColorHex,
    LightAqua: '#80FFFF' as ColorHex,
    DarkBlue: '#000080' as ColorHex,
    Blue: '#0000FF' as ColorHex,
    LightBlue: '#8080FF' as ColorHex,
    DarkPurple: '#400080' as ColorHex,
    Purple: '#8000FF' as ColorHex,
    LightPurple: '#BF80FF' as ColorHex,
    DarkMagenta: '#800080' as ColorHex,
    Magenta: '#FF00FF' as ColorHex,
    LightMagenta: '#FF80FF' as ColorHex,
    DarkPink: '#800040' as ColorHex,
    Pink: '#FF0080' as ColorHex,
    LightPink: '#FF80BF' as ColorHex,
};


// Given a color in hex #RRGGBB format, return an object of RGB values
export function hexToRGB(color: ColorHex) {
    // Convert the color to a string and remove the #
    let colorString: string = String(color).toLowerCase();
    colorString = colorString.substring(1);

    // Get the individual colors
    const rHex: string = colorString.substring(0, 2);
    const gHex: string = colorString.substring(2, 4);
    const bHex: string = colorString.substring(4, 6);

    // Parse the numbers in hexadecimal
    const r: number = parseInt(rHex, 16);
    const g: number = parseInt(gHex, 16);
    const b: number = parseInt(bHex, 16);

    // Create the rgb object
    const rgb: ColorRGB = { r, g, b };

    // Return the rgb object
    return rgb;
};
// Given a color in RGB object format, return a hex string in #RRGGBB format
export function rgbToHex(color: ColorRGB) {
    // Deconstruct the separate colors
    const { r, g, b }: ColorRGB = color;

    // Convert to hexadecimal
    const rHex: string = r.toString(16);
    const gHex: string = g.toString(16);
    const bHex: string = b.toString(16);

    // Convert to hexadecimal string with exactly 2 characters (i.e. the string 'E' becomes '0E')
    const rHexString: string = ('00' + rHex).slice(-2);
    const gHexString: string = ('00' + gHex).slice(-2);
    const bHexString: string = ('00' + bHex).slice(-2);

    const hexString: ColorHex = `#${rHexString}${gHexString}${bHexString}`;

    return hexString as ColorHex;
};

// Given a color in hex #RRGGBB format, return the relative luminance (number between 0 and 1)
export function calcLuminance(color: ColorHex) {
    // all literal numbers in this function are taken from the calculation of relative luminance as defined in the pages linked below
    // https://www.w3.org/WAI/GL/wiki/Relative_luminance
    // https://en.wikipedia.org/wiki/Relative_luminance
    // https://en.wikipedia.org/wiki/SRGB#From_sRGB_to_CIE_XYZ

    // Get the individual colors from the hex code
    let { r, g, b }: ColorRGB = hexToRGB(color);

    // Convert the colors to decimals
    r /= 255;
    g /= 255;
    b /= 255;

    // The luminance values for each color
    let r_lum: number;
    let g_lum: number;
    let b_lum: number;

    // red
    if (r <= 0.04045) {
        r_lum = r / 12.92;
    }
    else {
        r_lum = ((r + 0.055) / 1.055) ** 2.4;
    }
    // green
    if (g <= 0.04045) {
        g_lum = g / 12.92;
    }
    else {
        g_lum = ((g + 0.055) / 1.055) ** 2.4;
    }
    // blue
    if (b <= 0.04045) {
        b_lum = b / 12.92;
    }
    else {
        b_lum = ((b + 0.055) / 1.055) ** 2.4;
    }

    r_lum *= 0.2126;
    g_lum *= 0.7152;
    b_lum *= 0.0722;

    return r_lum + g_lum + b_lum;
};

// Given two colors in hex #RRGGBB format, return the contrast ratio (number between 1 and 21)
export function calcContrastRatio(color1: ColorHex, color2: ColorHex) {
    let lum1: number = calcLuminance(color1);
    let lum2: number = calcLuminance(color2);

    if (lum1 < lum2) {
        const temp = lum1;
        lum1 = lum2;
        lum2 = temp;
    }

    return (lum1 + 0.05) / (lum2 + 0.05);
};

// Given two colors in hex #RRGGBB format, return true if the contrast between them is acceptable, otherwise return false
export function isValidContrast(color1: ColorHex, color2: ColorHex) {
    return calcContrastRatio(color1, color2) >= 3;
};

// Given an accent color in hex #RRGGBB format, return two colors with a visible contrast
// (this function dynamically determins if a color should be made darker or lighter to accompany the accent)
// (if the given accent color is dark, a lighter color will be provided with suitable contrast, and vice-versa)
export function calcContrastingAccentPair(accent: ColorHex) {
    // The two colors to return
    let lighter: ColorHex | undefined = undefined;
    let darker: ColorHex | undefined = undefined;

    // The contrast value to try
    let contrastValue: number = 1;
    const darkContrast: number = calcContrastRatio(accent, '#000000');
    const lightContrast: number = calcContrastRatio(accent, '#FFFFFF');
    let tempColor: ColorHex | undefined = undefined;

    // Use the accent and make a new darker color
    if (darkContrast > lightContrast) {
        lighter = accent;
        while ((!darker || !lighter) && contrastValue < 16) {
            tempColor = darkenColor(accent, 16 * contrastValue++);
            if (calcContrastRatio(lighter, tempColor) > 4.5) {
                darker = tempColor;
            }
        }
    }
    // Use the accent and make a new lighter color
    else {
        darker = accent;
        while ((!darker || !lighter) && contrastValue < 16) {
            tempColor = lightenColor(accent, 16 * contrastValue++);
            if (calcContrastRatio(darker, tempColor) > 4.5) {
                lighter = tempColor;
            }
        }
    }

    // If either a darker or a lighter color was not found, log a warning and use the most recently calculated color
    if (!darker) {
        console.warn('No color contrast found for accent color ' + accent);
        darker = tempColor;
    }
    if (!lighter) {
        console.warn('No color contrast found for accent color ' + accent);
        lighter = tempColor;
    }

    return { lighter: lighter as ColorHex, darker: darker as ColorHex };
};

// Given a color in hex #RRGGBB format, lighten the color by the given amount (#535353, 3 -> #565656)
export function lightenColor(color: ColorHex, amount: number) {
    return changeColor(color, amount) as ColorHex;
};
// Given a color in hex #RRGGBB format, darken the color by the given amount (#535353, 3 -> #505050)
export function darkenColor(color: ColorHex, amount: number) {
    return changeColor(color, -amount) as ColorHex;
};

// Given a color in hex #RRGGBB format, change a color by the given amount (positive = lighten, negative = darken)
function changeColor(color: ColorHex, amount: number) {
    // Get the rgb colors from the hex code
    let rgb: ColorRGB = hexToRGB(color);

    // Parse the numbers in hexadecimal
    rgb.r = clampColorValue(rgb.r + amount);
    rgb.g = clampColorValue(rgb.g + amount);
    rgb.b = clampColorValue(rgb.b + amount);

    return rgbToHex(rgb) as ColorHex;
};

// Clamp a color value between 0 and 255
function clampColorValue(value: number) {
    return value > 255 ? 255 : value < 0 ? 0 : value;
};
export const themes = {
    light: 'light',
    dark: 'dark',
}

export const getThemeFromLocalStorage = () => localStorage.getItem('theme') || themes.dark;

export const getTokenFromLocalStorage = () => localStorage.getItem('AUTH_TOKEN') || '';

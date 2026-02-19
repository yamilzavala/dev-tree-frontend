export const themes = {
    light: 'light',
    dark: 'dark',
}

export const getThemeFromLocalStorage = () => localStorage.getItem('theme') || themes.dark;

export const getTokenFromLocalStorage = () => localStorage.getItem('AUTH_TOKEN') || '';

export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

export function isValidUrl(url : string): boolean {
    try {
       new URL(url)
       return true
    } catch (error) {
        return false
    }
}
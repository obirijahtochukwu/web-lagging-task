export const cleanStringAndReturnLower = (inputStr?: string) => {
    if (!inputStr) return ''
    return inputStr.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}
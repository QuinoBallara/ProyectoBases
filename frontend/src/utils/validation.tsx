export const emailValidation = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const phoneValidation = (phone: string) => {
    return /^\d{10}$/.test(phone);
}

export const dateValidation = (date: string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export const idValidation = (id: string) => {
    return /^\d{5,8}$/.test(id);
}

export const checkValidNumber = (num: number) => {
    return num >= 0;
}

export const emailValidation = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const phoneValidation = (phone: string) => {
    return /^\d{9}$/.test(phone);
}

export const dateValidation = (date: string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export const idValidation = (id: string) => {
    return /^\d{5,8}$/.test(id);
}

export const checkInvalidNumber = (num: number) => {
    return num <= 0;
}

export const validateAge = (age: string) => {
    return /^\d{1,2}$/.test(age);
}

export const validateDescription = (description: string) => {
    return description.length > 0 && description.length < 255;
}

export const validateName = (name: string) => {
    return name.length > 0 && name.length < 50;
}
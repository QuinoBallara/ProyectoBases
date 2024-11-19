import { API_URL,API_ROUTES } from '../consts/apiRoutes'; 

export const addLogin = async (mail: string, password: string) => {
    const response = await fetch(`${API_URL}${API_ROUTES.logins.add}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password }),
    });
    return response.json();
};

export const getLogins = async () => {
    const response = await fetch(`${API_URL}${API_ROUTES.logins.get}`, {
        method: "GET",
    });
    return response.json();
};

export const getLoginByMail = async (mail: string) => {
    const response = await fetch(`${API_URL}${API_ROUTES.logins.getByMail(mail)}`, {
        method: "GET",
    });
    return response.json();
};

export const deleteLogin = async (mail: string) => {
    const response = await fetch(`${API_URL}${API_ROUTES.logins.delete(mail)}`, {
        method: "DELETE",
    });
    return response.json();
};

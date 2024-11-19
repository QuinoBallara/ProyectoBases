import { API_URL, API_ROUTES } from '../consts/apiRoutes'; 

export const addShift = async (shift) => {
    const response = await fetch(API_URL + API_ROUTES.shifts.add, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shift),
    });
    return response.json();
};

export const getShifts = async () => {
    const response = await fetch(API_URL + API_ROUTES.shifts.get, {
        method: 'GET',
    });
    return response.json();
};

export const getShiftById = async (shiftId) => {
    const response = await fetch(API_URL + API_ROUTES.shifts.getById(shiftId), {
        method: 'GET',
    });
    return response.json();
};

export const modifyShift = async (shiftId, shift) => {
    const response = await fetch(API_URL + API_ROUTES.shifts.modify(shiftId), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shift),
    });
    return response.json();
};

export const deleteShift = async (shiftId) => {
    const response = await fetch(API_URL + API_ROUTES.shifts.delete(shiftId), {
        method: 'DELETE',
    });
    return response.json();
};

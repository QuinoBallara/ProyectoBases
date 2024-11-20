import { API_URL, API_ROUTES } from '../consts/apiRoutes';

export const addEquipment = async (equipment) => {
    const response = await fetch(`${API_URL}${API_ROUTES.equipment.add}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipment),
    });
    return response.json();
};

export const getAllEquipment = async () => {
    const response = await fetch(`${API_URL}${API_ROUTES.equipment.get}`, {
        method: 'GET',
    });
    return response.json();
};

export const getEquipmentByActivity = async (id) => {
    const response = await fetch(`${API_URL}${API_ROUTES.equipment.getByActivityId(id)}`, {
        method: 'GET',
    });
    return response.json();
};

export const getEquipmentById = async (id) => {
    const response = await fetch(`${API_URL}${API_ROUTES.equipment.getById(id)}`, {
        method: 'GET',
    });
    return response.json();
};

export const modifyEquipment = async (id, equipment) => {
    const response = await fetch(`${API_URL}${API_ROUTES.equipment.modify(id)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipment),
    });
    return response.json();
};

export const deleteEquipment = async (id) => {
    const response = await fetch(`${API_URL}${API_ROUTES.equipment.delete(id)}`, {
        method: 'DELETE',
    });
    return response.json();
};

export default {
    addEquipment,
    getAllEquipment,
    getEquipmentByActivity,
    getEquipmentById,
    modifyEquipment,
    deleteEquipment,
};

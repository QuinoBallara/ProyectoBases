import { API_URL, API_ROUTES } from '../consts/apiRoutes';

async function addActivity(activity) {
    const response = await fetch(`${API_URL}${API_ROUTES.activities.add}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
    });
    const data = await response.json();
    return data;
}

async function addClass(data) {
    const response = await fetch(`${API_URL}${API_ROUTES.classes.add}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
}

async function getClasses() {
    const response = await fetch(`${API_URL}${API_ROUTES.views.classProps}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    return result;
}

async function getClassById(classId) {
    const response = await fetch(`${API_URL}${API_ROUTES.classes.getById(classId)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    return result;
}

async function modifyClass(classId, data) {
    const response = await fetch(`${API_URL}${API_ROUTES.classes.modify(classId)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    return result;
}

async function deleteClass(classId) {
    const response = await fetch(`${API_URL}${API_ROUTES.classes.delete(classId)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    return result;
}

export {
    addActivity,
    addClass,
    getClasses,
    getClassById,
    modifyClass,
    deleteClass
};

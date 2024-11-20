import { API_URL, API_ROUTES } from '../consts/apiRoutes';

async function addActivity(activity) {
    const response = await fetch(`${API_URL}${API_ROUTES.activities.add}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
    });
    const data = await response.json();
    return data;
}

async function getActivities() {
    const response = await fetch(`${API_URL}${API_ROUTES.activities.get}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function getActivityById(id) {
    const response = await fetch(`${API_URL}${API_ROUTES.activities.getById(id)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function modifyActivity(id, activity) {
    const response = await fetch(`${API_URL}${API_ROUTES.activities.modify(id)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
    });
    const data = await response.json();
    return data;
}

async function deleteActivity(id) {
    const response = await fetch(`${API_URL}${API_ROUTES.activities.delete(id)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export { addActivity, getActivities, getActivityById, modifyActivity, deleteActivity };

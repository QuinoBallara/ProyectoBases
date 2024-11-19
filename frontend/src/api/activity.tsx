import { API_URL, API_ROUTES } from '../consts/apiRoutes'; // Adjust the import path as needed

// Add Activity
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

// Get Activities
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

// Get Activity by ID
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

// Modify Activity
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

// Delete Activity
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

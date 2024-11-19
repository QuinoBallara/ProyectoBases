import { API_URL, API_ROUTES } from '../consts/apiRoutes';

async function addInstructor(instructor: { id: string, first_name: string, last_name: string }) {
    const response = await fetch(`${API_URL}${API_ROUTES.instructors.add}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(instructor),
    });
    const data = await response.json();
    return data;
}

async function getInstructors() {
    const response = await fetch(`${API_URL}${API_ROUTES.instructors.get}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

async function getInstructorById(instructorId: string) {
    const response = await fetch(`${API_URL}${API_ROUTES.instructors.getById(instructorId)}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

async function modifyInstructor(instructorId: string, instructor: { id: string, first_name: string, last_name: string }) {
    const response = await fetch(`${API_URL}${API_ROUTES.instructors.modify(instructorId)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(instructor),
    });
    const data = await response.json();
    return data;
}

async function deleteInstructor(instructorId: string) {
    const response = await fetch(`${API_URL}${API_ROUTES.instructors.delete(instructorId)}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}

export {
    addInstructor,
    getInstructors,
    getInstructorById,
    modifyInstructor,
    deleteInstructor
};

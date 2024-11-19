import { API_URL, API_ROUTES } from '../consts/apiRoutes'; 

export const addStudent = async (student) => {
    const response = await fetch(`${API_URL}${API_ROUTES.students.add}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
    return response.json();
};

export const getStudents = async () => {
    const response = await fetch(`${API_URL}${API_ROUTES.students.get}`, {
        method: 'GET',
    });
    return response.json();
};

export const getStudentById = async (studentId) => {
    const response = await fetch(`${API_URL}${API_ROUTES.students.getById(studentId)}`, {
        method: 'GET',
    });
    return response.json();
};

export const modifyStudent = async (studentId, student) => {
    const response = await fetch(`${API_URL}${API_ROUTES.students.modify(studentId)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
    return response.json();
};

export const deleteStudent = async (studentId) => {
    const response = await fetch(`${API_URL}${API_ROUTES.students.delete(studentId)}`, {
        method: 'DELETE',
    });
    return response.json();
};

import { API_URL, API_ROUTES } from '../consts/apiRoutes';

export async function addClassStudent(classStudent) {
    console.log(classStudent);
    const response = await fetch(`${API_URL}${API_ROUTES.class_students.add}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classStudent),
    });

    if (!response.ok) {
        throw new Error('Failed to add class student');
    }

    return response.json();
}

export async function getClassStudents() {
    const response = await fetch(`${API_URL}${API_ROUTES.class_students.get}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch class students');
    }

    return response.json();
}

export async function getClassStudentsByClassId(class_id) {
    const response = await fetch(`${API_URL}${API_ROUTES.class_students.getByClassId(class_id)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch class students');
    }

    return response.json();
}

export async function deleteClassStudent(class_id, student_id) {
    const response = await fetch(`${API_URL}${API_ROUTES.class_students.delete}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class_id, student_id }),
    })
    console.log(response);
    };
    

export default {
    addClassStudent,
    getClassStudents,
};

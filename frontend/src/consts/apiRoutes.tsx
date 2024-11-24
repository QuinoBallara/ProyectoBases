export const API_URL = 'http://localhost:5001';

export const API_ROUTES = {
  instructors: {
    base: '/instructors',
    get: '/instructors',
    getById: (id: string) => `/instructors/${id}`,
    add: '/instructors',
    modify: (id: string) => `/instructors/${id}`,
    delete: (id: string) => `/instructors/${id}`,
  },
  students: {
    base: '/students',
    get: '/students',
    getById: (id: string) => `/students/${id}`,
    add: '/students',
    modify: (id: string) => `/students/${id}`,
    delete: (id: string) => `/students/${id}`,
  },
  shifts: {
    base: '/shifts',
    get: '/shifts',
    getById: (id: string) => `/shifts/${id}`,
    add: '/shifts',
    modify: (id: string) => `/shifts/${id}`,
    delete: (id: string) => `/shifts/${id}`,
  },
  activities: {
    base: '/activities',
    get: '/activities',
    add: '/activities',
    getById: (id: string) => `/activities/${id}`,
    modify: (id: string) => `/activities/${id}`,
    delete: (id: string) => `/activities/${id}`,
  },
  classes: {
    base: '/classes',
    get: '/classes',
    add: '/classes',
    getById: (id: string) => `/classes/${id}`,
    modify: (id: string) => `/classes/${id}`,
    delete: (id: string) => `/classes/${id}`,
  },
  class_students: {
    base: '/class-students',
    get: '/class-students',
    add: '/class-students',
    getByClassId: (classId: string) => `/class-students/${classId}`,
  },
  equipment: {
    base: '/equipment',
    get: '/equipment',
    add: '/equipment',
    getById: (id: string) => `/equipment/${id}`,
    modify: (id: string) => `/equipment/${id}`,
    delete: (id: string) => `/equipment/${id}`,
    getByActivityId: (activityId: string) => `/equipment/activity/${activityId}`,
  },
  logins: {
    base: '/logins',
    get: '/logins',
    add: '/logins',
    getByMail: (mail: string) => `/logins/${mail}`,
    delete: (mail: string) => `/logins/${mail}`,

  },
  views: {
    activityRevenue: '/activity_revenue',
    studentActivity: '/student_activity',
    shiftClass: '/shift_class',
    classProps: '/class_props',
  },
};
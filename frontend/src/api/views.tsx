import { API_URL, API_ROUTES } from '../consts/apiRoutes';

export const activityRevenue = async () => {
  try {
    const response = await fetch(`${API_URL}${API_ROUTES.views.activityRevenue}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch activity revenue: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const studentActivity = async () => {
  try {
    const response = await fetch(`${API_URL}${API_ROUTES.views.studentActivity}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch student activity: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const shiftClass = async () => {
  try {
    const response = await fetch(`${API_URL}${API_ROUTES.views.shiftClass}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shift class: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const classProps = async () => {
  try {
    const response = await fetch(`${API_URL}${API_ROUTES.views.classProps}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch class properties: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

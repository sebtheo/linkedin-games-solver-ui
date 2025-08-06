import { SolutionResponse, DatesResponse } from "../types";

const API_BASE_URL = "https://linkedin-solver.sebtheo.uk/api";

export const fetchSolution = async (
  date?: string,
): Promise<SolutionResponse> => {
  try {
    const url = date
      ? `${API_BASE_URL}/solutions/?date=${date}`
      : `${API_BASE_URL}/solutions/`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch solution: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching solution:", error);
    throw error;
  }
};

export const fetchAvailableDates = async (): Promise<DatesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dates/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch dates: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching dates:", error);
    throw error;
  }
};

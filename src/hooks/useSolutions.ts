import { useState, useEffect } from "react";
import { fetchSolution, fetchAvailableDates } from "../services/api";
import { SolutionResponse, DatesResponse } from "../types";
import { getFormattedToday } from "../utils/dateUtils";

export const useSolutions = (initialDate?: string) => {
  const [currentSolution, setCurrentSolution] =
    useState<SolutionResponse | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(
    initialDate || getFormattedToday(),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch available dates
  useEffect(() => {
    const getDates = async () => {
      try {
        const datesResponse: DatesResponse = await fetchAvailableDates();
        setAvailableDates(datesResponse.dates);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch dates"),
        );
      }
    };

    getDates();
  }, []);

  // Fetch solution for the current date
  useEffect(() => {
    const getSolution = async () => {
      setIsLoading(true);
      try {
        const solution = await fetchSolution(currentDate);
        setCurrentSolution(solution);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch solution"),
        );
        setCurrentSolution(null);
      } finally {
        setIsLoading(false);
      }
    };

    getSolution();
  }, [currentDate]);

  const changeDate = (date: string) => {
    if (availableDates.includes(date)) {
      setCurrentDate(date);
    }
  };

  return {
    currentSolution,
    availableDates,
    currentDate,
    isLoading,
    error,
    changeDate,
  };
};

import { FETCH_FAILURE_MESSAGE, LOADING_STATUS } from "../constants";

export const fetchFromAPI = async (url, retries) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(FETCH_FAILURE_MESSAGE);
        }

        const data = await response.json();
        if (data.error) throw new Error(FETCH_FAILURE_MESSAGE);

        const parsedData = JSON.parse(data);
        return {
            status: LOADING_STATUS.SUCCEEDED,
            data: Array.isArray(parsedData) ? parsedData : [parsedData],
        };
    } catch (error) {
        if (retries === 0)
            return {
                status: LOADING_STATUS.FAILED,
                error: error.message,
            };

        return await fetchFromAPI(url, retries - 1);
    }
};

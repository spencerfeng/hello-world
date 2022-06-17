import { useEffect, useState } from "react";

import { LOADING_STATUS } from "../constants";
import { fetchFromAPI } from "../utils/fetchFromAPI";

export const useFetchData = (apiEndpoint, retries) => {
    const [data, setData] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(LOADING_STATUS.IDLE);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        if (loadingStatus === LOADING_STATUS.IDLE) {
            const fetchData = async () => {
                const result = await fetchFromAPI(apiEndpoint, retries);

                if (result.status === LOADING_STATUS.FAILED) {
                    setLoadingStatus(LOADING_STATUS.FAILED);
                    setErrorText(result.error);
                } else {
                    setLoadingStatus(LOADING_STATUS.SUCCEEDED);
                    setData(result.data);
                }
            };

            setLoadingStatus(LOADING_STATUS.LOADING);
            void fetchData().catch((error) => {
                setLoadingStatus(LOADING_STATUS.FAILED);
                setErrorText(error.message);
            });
        }
    }, [loadingStatus, apiEndpoint, retries]);

    return { data, loadingStatus, errorText };
};

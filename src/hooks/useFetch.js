import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    if (loading) toast.loading("Loading Data", { id: "loading" });


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setLoading(false);
            toast.success("Data Loaded Successfully")
            toast.remove("loading");
        } catch (error) {
            setError(error);
            setLoading(false);
            toast.error("Data Loading Failed")

        }
    }

    return { data, loading, error };

}   

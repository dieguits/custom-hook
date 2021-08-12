import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({
            loading: true,
            error: null,
            data: null
        });

        axios.get(url)
            .then((data) => {

                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data: data.data
                    });
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'Cant load the information'
                })
            });

        return () => {
            console.log('dismount')
        }
    }, [url]);

    return state;

}

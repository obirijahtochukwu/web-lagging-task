'use server';

import axios from "axios";

const makeGetRequest = async (
    apiRoute: string,
    headers={},
) => {
    try {
        const res = await fetch(apiRoute, {
            method: 'GET',
            headers,
        });

        const jsonRes = await res.json();
        if (!res.ok) {
            const errorMsg = 'Something went wrong. Please try again later';
            throw Error(errorMsg);
        }

        return jsonRes;
    } catch (error) {
        throw error;
    }
}

const makeAxiosGetRequest = async (
    apiRoute: string,
) => {
    try {
        const res = (await axios.get(apiRoute)).data;
        return res;
    } catch (error) {
        throw error;
    }
}

const makeAxiosPostRequest = async (
    apiRoute: string,
    data={},
    headers={},
) => {
    try {
        const res = (await axios.post(apiRoute, data, {
            headers,
        })).data;

        return res;
    } catch (error) {
        throw error;
    }
}

const makeAxiosPatchRequest = async (
    apiRoute: string,
    data={},
    headers={},
) => {
    try {
        const res = (await axios.patch(apiRoute, data, {
            headers,
        })).data;

        return res;
    } catch (error) {
        throw error;
    }
}

const makeAxiosPutRequest = async (
    apiRoute: string,
    data={},
    headers={},
) => {
    try {
        const res = (await axios.put(apiRoute, data, {
            headers,
        })).data;

        return res;
    } catch (error) {
        throw error;
    }
}

export {
    makeGetRequest,
    makeAxiosGetRequest,
    makeAxiosPostRequest,
    makeAxiosPatchRequest,
    makeAxiosPutRequest,
}
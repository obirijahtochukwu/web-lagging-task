import { toast } from "sonner";
import apiBaseUrl from "./config"
import axios, { AxiosError } from "axios";
import { makeAxiosPostRequest, makeGetRequest } from "./functions";

class PlaceService {
    private getPlaceEndpoint(endpoint: string, searchParams?: string | null | undefined) {
        return `${apiBaseUrl}/places/${endpoint.length < 1 ? '' : endpoint + '/'}${searchParams ?? ''}`;
    }

    async createNewPlace (token: string, data={}): Promise<IPlace> {
        try {
            const res = (await axios.post(`${this.getPlaceEndpoint('create')}`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })).data;
            toast.success('Successfully created new place!');

            return res as IPlace;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            throw error;
        }
    }

    async editPlace (token: string, placeId: number, data={}): Promise<IPlace> {
        try {
            const res = (await axios.put(`${this.getPlaceEndpoint(`${placeId}/update`)}`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })).data;
            toast.success('Successfully edited place details!');

            return res as IPlace;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            throw error;
        }
    }

    async getAllPlaces () {
        try {
            const res = await makeGetRequest(`${this.getPlaceEndpoint('')}`)
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getSinglePlaceName (placeId: number) {
        try {
            const res = await fetch(`${this.getPlaceEndpoint(`get_place_name/${placeId}`)}`);
            if (!res.ok) {
                throw Error('Something went wrong, please try again later');
            }

            const jsonRes = await res.json();
            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async getSinglePlace (placeId: number) {
        try {
            const res = await makeGetRequest(`${this.getPlaceEndpoint(`${placeId}`)}`);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getUserPlaces (token?: string | null) {
        try {
            const res = await makeGetRequest(
                `${this.getPlaceEndpoint('my-places')}`,
                {
                    'Authorization': `Token ${token}`,
                }
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getAllStyles () {
        try {
            const res = await makeGetRequest(`${this.getPlaceEndpoint('styles')}`);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async createNewStyle (token: string, data={}): Promise<IMartialArtStyle> {
        try {
            const res = await makeAxiosPostRequest(
                `${this.getPlaceEndpoint('styles/create')}`,
                data,
                {
                    'Authorization': `Token ${token}`,
                }
            );
            toast.success('Successfully added new style!');

            return res as IMartialArtStyle;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            throw error;
        }
    }

    async getAllPlaceTypes () {
        try {
            const res = await makeGetRequest(`${this.getPlaceEndpoint('place-types')}`);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getAllCatersTo () {
        try {
            const res = await makeGetRequest(`${this.getPlaceEndpoint('caters-to')}`);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getAllAgeGroups () {
        try {
            const res = await makeGetRequest(`${this.getPlaceEndpoint('age-groups')}`);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async searchPlace (queryParams?: string | undefined | null) {
        try {
            const res = await makeGetRequest(`${this.getPlaceEndpoint('', queryParams)}`);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getPlaceViewStats (token?: string | null) {
        try {
            const res = await makeGetRequest(`${this.getPlaceEndpoint('views-stats')}`, {
                'Authorization': `Token ${token}`,
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

    async addNewReview (
        token: string, 
        data={},
    ): Promise<IPlaceReviews> {
        try {
            const res = await makeAxiosPostRequest(
                `${this.getPlaceEndpoint('reviews')}`,
                data,
                {
                    'Authorization': `Token ${token}`,
                }
            );
            toast.success('Successfully added new review!');

            return res as IPlaceReviews;
        } catch (error) {
            let errorMsg = 'Something went wrong, please try again later';
            if (error instanceof AxiosError && error.response?.data?.errorMsg) errorMsg = error.response?.data?.errorMsg;
            
            toast.error(errorMsg);
            throw error;
        }
    }
}

export {
    PlaceService,
}
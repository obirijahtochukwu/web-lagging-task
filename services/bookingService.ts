import { toast } from "sonner";
import apiBaseUrl from "./config";
import { makeAxiosPatchRequest, makeAxiosPostRequest, makeGetRequest } from "./functions";

class BookingService {
    private getBookingEndpoint(endpoint: string) {
        return `${apiBaseUrl}/bookings/${endpoint.length < 1 ? '' : endpoint + '/'}`;
    }

    async createNewBooking (token: string, data={}) {
        try {
            const res = await makeAxiosPostRequest(
                `${this.getBookingEndpoint('create')}`,
                data,
                {
                    'Authorization': `Token ${token}`,
                },
            );
            toast.success('Successfully created new booking!');

            return res as IBooking;
        } catch (error) {
            toast.error('Something went wrong, please try again later');        
            throw error;
        }
    }

    async getOwnerBookings (token?: string | null) {
        try {
            const res = await makeGetRequest(`${this.getBookingEndpoint('owner-bookings')}`, {
                'Authorization': `Token ${token}`,
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getUserBookings (token?: string | null) {
        try {
            const res = await makeGetRequest(`${this.getBookingEndpoint('user-bookings')}`, {
                'Authorization': `Token ${token}`,
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

    async cancelBooking (token: string, bookingId: number, data={}) {
        try {
            const res = await makeAxiosPostRequest(
                `${this.getBookingEndpoint(bookingId + '/' + 'cancel')}`,
                data,
                {
                    'Authorization': `Token ${token}`,
                }
            );
            toast.success('Successfully updated canceled booking!');

            return res as IBooking;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            throw error;
        }
    }

    async manageBookingStatus (token: string, bookingId: number, data={}) {
        try {
            const res = await makeAxiosPatchRequest(
                `${this.getBookingEndpoint(bookingId + '/' + 'owner-manage')}`,
                data,
                {
                    'Authorization': `Token ${token}`,
                }
            );
            toast.success('Successfully updated status for booking!');

            return res as IBooking;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            throw error;
        }
    }
}

export {
    BookingService,
}
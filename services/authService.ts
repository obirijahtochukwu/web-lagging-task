import { toast } from "sonner";
import apiBaseUrl from "./config"

class AuthService {
    private getAuthEndpoint(endpoint: string) {
        return `${apiBaseUrl}/users/${endpoint}/`;
    }

    async registerUser (data={}) {
        try {
            const res = await fetch(`${this.getAuthEndpoint('register')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = jsonRes[Object.keys(jsonRes || {})[0]] ?? 'Something went wrong. Please try again later';
                toast.error(errorMsg);
                
                throw Error(errorMsg);
            }

            toast.success('Successfully registered account!');

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async loginUser (data={}) {
        try {
            const res = await fetch(`${this.getAuthEndpoint('login')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = jsonRes[Object.keys(jsonRes || {})[0]] ?? 'Something went wrong. Please try again later';
                toast.error(errorMsg);
                
                throw Error(errorMsg);
            }

            toast.success('Successfully logged in!');

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async requestPasswordReset (data={}) {
        try {
            const res = await fetch(`${this.getAuthEndpoint('forgot-password')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = jsonRes[Object.keys(jsonRes || {})[0]] ?? 'Something went wrong. Please try again later';
                toast.error(errorMsg);
                
                throw Error(errorMsg);
            }

            toast.success('Successfully sent email to reset account password!');

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async resetPassword (data={}) {
        try {
            const res = await fetch(`${this.getAuthEndpoint('reset-password')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = jsonRes[Object.keys(jsonRes || {})[0]] ?? 'Something went wrong. Please try again later';
                toast.error(errorMsg);
                
                throw Error(errorMsg);
            }

            toast.success('Successfully reset account password! Please login');

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async logoutUser () {
        try {
            const res = await fetch(`${this.getAuthEndpoint('logout')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = jsonRes[Object.keys(jsonRes || {})[0]] ?? 'Something went wrong. Please try again later';
                toast.error(errorMsg);
                
                throw Error(errorMsg);
            }

            toast.success('Successfully logged out!');

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }
}

export {
    AuthService,
}
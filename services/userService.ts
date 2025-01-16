import apiBaseUrl from "./config"

class UserService {
    getUserEndpoint(endpoint: string) {
        return `${apiBaseUrl}/users/${endpoint}/`;
    }

    async getUserDetail (token: string) {
        try {
            const res = await fetch(`${this.getUserEndpoint('details')}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = jsonRes[Object.keys(jsonRes || {})[0]] ?? 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }
}

export {
    UserService,
}
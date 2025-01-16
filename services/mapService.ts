class MapService {
    private getMapEndpoint(endpoint: string) {
        return `/api/map-detail${endpoint.length < 1 ? '' : endpoint + '/'}`;
    }

    async getMapDetail () {
        try {
            const res = await fetch(`${this.getMapEndpoint('')}`, {
                method: 'GET',
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes?.data;
        } catch (error) {
            throw error;
        }
    }
}

export {
    MapService,
}
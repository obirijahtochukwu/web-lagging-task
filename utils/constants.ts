export class AppConstants {
    static get tokenKey () {
        return 'MARTIAL_DETAIL'
    }

    static getSavedToken () {
        return localStorage.getItem(this.tokenKey);
    }
}
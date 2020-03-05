export default class PermissionChecker {
    constructor(currentUser) {
        this.currentUser = currentUser;
        this.roles = currentUser ? currentUser.roles : [];
    }

    get isAuthenticated() {
        return !!this.currentUser && !!this.currentUser.id;
    }
}
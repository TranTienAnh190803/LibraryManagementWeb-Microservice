import { jwtDecode } from "jwt-decode";
import axiosUserService from "../Config/AxiosUserService.js";

class UserService {
    static async login(loginForm) {
        return await axiosUserService.post("/login", loginForm);
    }

    static async getAllUser(role) {
        return await axiosUserService.get(`/admin/get-all-user?role=${role}`);
    }

    // Logout
    static logout() {
        localStorage.removeItem("token");
    }
 
    // Check Token
    static isTokenExpired() {
        try {
            const token = localStorage.getItem("token");
            const info = jwtDecode(token);
            const expireTime = info.exp;
            const currentTime = Date.now() / 1000;
            return expireTime < currentTime;
        } catch (error) {
            return true;
        }
    }

    static isAuthenticate() {
        try {
            const token = localStorage.getItem("token");
            const info = jwtDecode(token);
            if (typeof info === "object" && !this.isTokenExpired())
                return true;
            return false;
        } catch (error) {
            return false;
        }
    }

    static isAdmin() {
        try {
            const token = localStorage.getItem("token");
            const info = jwtDecode(token);
            if (typeof info === "object" && info.role === "ADMIN" && !this.isTokenExpired())
                return true;
            return false;
        } catch (error) {
            return false;
        }
    }

    static isLibrarian() {
        try {
            const token = localStorage.getItem("token");
            const info = jwtDecode(token);
            if (typeof info === "object" && info.role === "LIBRARIAN" && !this.isTokenExpired())
                return true;
            return false;
        } catch (error) {
            return false;
        }
    }

    static isMember() {
        try {
            const token = localStorage.getItem("token");
            const info = jwtDecode(token);
            if (typeof info === "object" && info.role === "MEMBER" && !this.isTokenExpired())
                return true;
            return false;
        } catch (error) {
            return false;
        }
    }
}

export default UserService;
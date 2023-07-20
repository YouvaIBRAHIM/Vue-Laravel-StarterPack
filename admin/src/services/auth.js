import { reactive } from 'vue'
import router from "@/router";
import axiosInstance from "@/services/axios";

export const store = reactive({
    user: null,
    errors: [],
    status: null,
    async getToken() {
        await axiosInstance.get("/sanctum/csrf-cookie");
    },
    async getUser() {
        await this.getToken();
        try {
            const data = await axiosInstance.get("/api/user");
            if (data) {
                return true
            }
        } catch (error) {
            return false;
        }
    },
    async handleLogin(data) {
        this.errors = [];
        await this.getToken();

        try {
            const response = await axiosInstance.post("/login", {
                email: data.email,
                password: data.password,
            });
            if (response?.status === 202) {
                router.push("/")
            }
        } catch (error) {
            console.log("🚀 ~ file: auth.js:37 ~ handleLogin ~ error:", error)
        }
    },
    async handleLogout() {
        await axiosInstance.post("/logout");
        this.user = null;
    },
});

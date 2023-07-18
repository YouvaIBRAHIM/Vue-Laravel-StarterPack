import { store } from "@/services/auth.js";
import router from "@/router";

export default function isLogged({ next }) {
    if (store.user) {
        return next();
    }
    
    router.push({name: "Login"});
}
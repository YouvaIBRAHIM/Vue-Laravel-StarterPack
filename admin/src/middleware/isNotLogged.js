import { store } from "@/services/auth.js";
import router from "@/router";

export default function isLogged({ next, from }) {
    if (!store.user) {
        return next();
    }
    
    router.push({name: from.name});
}
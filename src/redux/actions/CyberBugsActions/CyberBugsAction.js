import { SIGNIN_API } from "../../types/CyberBugsTypes/CyberBugsTypes";

export const signInCyberBugsAction = (email, password) => ({
    type: SIGNIN_API,
    userLogin: {
        email: email,
        password: password
    }
})
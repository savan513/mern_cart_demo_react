import axios from 'axios';
import Cookies from 'js-cookie';
import React, { createContext, useEffect, useReducer} from 'react'
import BASE_URL from './helper';

const userStateContext = createContext();
const userDispatchContext = createContext();

// const addUserData = (udata) => {
//     console.log("addUserdata-----udata",udata)
//     return {
//         type: "ADD_USER_DATA",
//         user_name: udata.user_name,
//         user_email: udata.user_email
//     }
// }

// const removeUserData = () => {
//     return {
//         type: "REMOVE_USER_DATA"
//     }
// }

const userDataReducer = (state, action) => {
    switch (action.type) {
        case "ADD_USER_DATA": return {
            ...state,
            userLogin: true,
            userName: action.user_name,
            userEmail: action.user_email
        }
        case "REMOVE_USER_DATA": return {
            ...state,
            userLogin: false,
            userName: "",
            userEmail: ""
        }
        default: return state;
    }
}

export default function UserReducer({ children }) {
    const token = Cookies.get("cartproject");
    const initState = {
        userLogin: false,
        userName: "",
        userEmail: ""
    }

    useEffect(() => {
        if (!token) {
            userDispatch({ type: "REMOVE_USER_DATA" })
            //  setInitState({
            //     userLogin: false,
            //     userName: "",
            //     userEmail: ""
            // })
        }
        else {
            axios.post(BASE_URL+"getuserdetail", { token: token })
                .then(res => {
                    userDispatch({ type: "ADD_USER_DATA", user_name: res.data.user_name, user_email: res.data.user_email })
                    //  setInitState({
                    //     userLogin: true,
                    //     userName: res.data.user_name,
                    //     userEmail: res.data.user_email
                    //  })
                }).catch(err => {
                    console.log(err);
                })
        }

    }, [token])

    const [userState, userDispatch] = useReducer(userDataReducer, initState)

    return (
        <userDispatchContext.Provider value={userDispatch}>
            <userStateContext.Provider value={userState}>
                {children}
            </userStateContext.Provider>
        </userDispatchContext.Provider>
    )
}

export { userDispatchContext, userStateContext }
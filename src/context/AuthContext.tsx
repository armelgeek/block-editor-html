import React, {
    createContext,
    useCallback,
    useEffect,
    useReducer,
} from "react";
import jwtDecode from "jwt-decode";
import kw from "../utils/musicSdk/kw";
import { encode, decode } from "base-64";
import { getData, removeData, saveData } from "../plugins/storage";
import { storageDataPrefix } from "../config/constant";
import _ from 'lodash';
interface User {
    id?: string | null;
    email?: string | null;
    username?: string | null;
    photo?: string | null;
}

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any | null;
    message: string | null;
    isVerified: boolean;
    code: number;
    email: string;
    password: string;
    blockedUntil: any |  undefined;

}

interface LoginSuccessAction {
    type: "LOGIN_SUCCESS";
    payload: {
        accessToken: string;
        refreshToken: string;
        isAuthenticated: true;
        user: User;
    };
}

interface LoginFailAction {
    type: "LOGIN_FAIL";
    payload: string;
}

interface SetUserAction {
    type: "SET_USER";
    payload: User;
}

interface SetLoadingAction {
    type: "SET_LOADING";
}

type RefreshTokenAction = {
    type: "REFRESH_TOKEN";
    payload: any;
};
type SetErrorAction = {
    type: "SET_MESSAGE";
    payload: string;
};

interface LogoutAction {
    type: "LOGOUT";
}
interface SetImageProfilAction {
    type: "SET_IMAGE_PROFIL";
    payload: any;
}
interface SetCheckVerifiedAccount {
    type: "CHECK_VERIFIED_ACCOUNT";
}
interface SetCodeAction {
    type: "UPDATE_CODE";
    payload: number;
}
interface SetEmailAction {
    type: "SET_EMAIL";
    payload: string;
}
interface SetPasswordAction {
    type: "SET_PASSWORD";
    payload: string;
}
interface SetTokenAction {
    type: "SET_TOKEN";
    payload: string;
}
type AuthAction =
    | LoginSuccessAction
    | LoginFailAction
    | SetUserAction
    | SetLoadingAction
    | RefreshTokenAction
    | LogoutAction
    | SetImageProfilAction
    | SetErrorAction
    | SetCodeAction
    | SetEmailAction
    | SetPasswordAction
    | SetCheckVerifiedAccount
    | SetTokenAction;

const initialState: AuthState = {
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
    message: null,
    isVerified: true,
    code: 1234,
    email: "",
    password: "",
    blockedUntil: null
};

const tokenExpired = (token: string): boolean => {
    if (token !== "") {
        const expiry = JSON.parse(decode(token.split(".")[1])).exp;
        return Math.floor(new Date().getTime() / 1000) >= expiry;
    } else {
        return true;
    }
};

const AuthContext = createContext<{
    state: AuthState;
    dispatch: any;
    login: (
        email: string,
        password: string,
        toggleCodeActivation: any
    ) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
    setUser: (payload: any) => void;
    setImageProfil: (payload: any) => void;
}>({
    state: initialState,
    dispatch: () => {},
    login: async () => {},
    logout: () => {},
    checkAuth: () => {},
    setUser: () => {},
    setImageProfil: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            saveData(storageDataPrefix.accessToken, action.payload.accessToken).then(r => {});
            if (action.payload.refreshToken) {
                saveData(storageDataPrefix.refreshToken, action.payload.refreshToken).then(r =>  {});
            }
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case "CHECK_VERIFIED_ACCOUNT":
            return {
                ...state,
                isAuthenticated: false,
                isVerified: false,
                isLoading: false,
                user: null,
                token: null,
            };
        case "SET_IMAGE_PROFIL":
            return {
                ...state,
                user: {
                    ...state.user,
                    photo: action.payload,
                },
                isLoading: false,
            };
        case "LOGIN_FAIL":
            removeData(storageDataPrefix.accessToken).then(r => {});
            removeData(storageDataPrefix.refreshToken).then(r => {});
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                message: action.payload,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            };

        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "SET_EMAIL":
            return {
                ...state,
                email: action.payload,
            };

        case "SET_MESSAGE":
            return {
                ...state,
                message: action.payload,
            };
        case "UPDATE_CODE":
            return {
                ...state,
                code: action.payload,
            };
        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload,
            };
        case "SET_PASSWORD":
            return {
                ...state,
                password: action.payload,
            };

        // return ;
        case "LOGOUT":
            removeData(storageDataPrefix.accessToken).then(r =>  {});
            removeData(storageDataPrefix.refreshToken).then(r => {});
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                token: null,
                message: null,
            };

        default:
            return state;
    }
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                   children,
                                                               }: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const user: any = {
        id: "",
        email: "",
        username: "",
        photo: "",
    };
    const login = async (
        email: string,
        password: string,
        toggleCodeActivation: any
    ) => {
        try {
            dispatch({ type: "SET_LOADING" });
            let requestObj = kw.loginHandle(email, password).promise;
            await requestObj
                .then((response: any) => {
                    const { accessToken, refreshToken, isVerified } = response;

                    if (!isVerified) {
                        toggleCodeActivation();
                        return;
                    }
                    const decodedToken =jwtDecode(accessToken) as any;
                    if (decodedToken != null) {
                        dispatch({
                            type: "LOGIN_SUCCESS",
                            payload: {
                                accessToken,
                                refreshToken,
                                isAuthenticated: true,
                                user: {
                                    id: decodedToken.id as string,
                                    email: decodedToken.email as string,
                                    username: decodedToken.username as string,
                                    photo: decodedToken.photo as string,
                                },
                            },
                        });
                    }
                })
                .catch((error) => {
                    if (error.statusCode == 409) {
                        dispatch({ type: "CHECK_VERIFIED_ACCOUNT" });
                    }

                    dispatch({ type: "SET_MESSAGE", payload: error.message });
                });
        } catch (error: any) {
            //console.log("error", error);
            if (error.statusCode == 409) {
                dispatch({ type: "CHECK_VERIFIED_ACCOUNT" });
            }
            dispatch({ type: "SET_MESSAGE", payload: error.message });
        }
    };
    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };
    const setUser = (payload: any) => {
        dispatch({ type: "SET_USER", payload: payload });
    };
    const setImageProfil = (url: string) => {
        dispatch({ type: "SET_IMAGE_PROFIL", payload: url });
    };
    const checkAuth = async () => {
        const accessToken = (await getData(
            storageDataPrefix.accessToken
        )) as string;
        // console.log("check access token", accessToken);
        const refreshToken = (await getData(
            storageDataPrefix.refreshToken
        )) as string;
        //console.log("check refresh token", refreshToken);
        if (!_.isUndefined(accessToken)) {
            if (tokenExpired(accessToken)) {
                // console.log("not connected,but expire token");
                const newAccessToken = kw.refreshTokenHandle(refreshToken).promise;
                await newAccessToken
                    .then(async (response: any) => {
                        // console.log('refreshtoken',response);
                        if(response === undefined) return;
                        const { accessToken } = response;
                        await saveData(storageDataPrefix.accessToken, accessToken);
                        const meInfo = kw.getMeInfoHandle(accessToken).promise;
                        await meInfo
                            .then((user: any) => {
                                dispatch({
                                    type: "LOGIN_SUCCESS",
                                    payload: {
                                        accessToken: accessToken,
                                        refreshToken,
                                        isAuthenticated: true,
                                        user: user,
                                    },
                                });
                            })
                            .catch((error) => {
                                dispatch({ type: "SET_MESSAGE", payload: error.message });
                                return;
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        // throw new Error("mela leka failed");
                    });
            } else {
                //console.log("continue token not expire");
                const meInfo = kw.getMeInfoHandle(accessToken).promise;
                await meInfo
                    .then((response: any) => {
                        dispatch({
                            type: "LOGIN_SUCCESS",
                            payload: {
                                accessToken: accessToken,
                                refreshToken,
                                isAuthenticated: true,
                                user: response,
                            },
                        });
                    })
                    .catch((error) => {
                        dispatch({ type: "SET_MESSAGE", payload: error.message });
                        return;
                    });
            }
        }
    }
    useEffect(() => {
        // Appel initial de checkAuth
        checkAuth().then(r => {});

        // Appel de checkAuth toutes les 5 minutes (300 000 millisecondes)
        const interval = setInterval(() => {
            checkAuth().then(r => {});
        }, 30000);

        // Nettoyage de l'intervalle lorsqu'il n'est plus nécessaire
        return () => clearInterval(interval);
    }, []);
    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
                login,
                logout,
                checkAuth,
                setUser,
                setImageProfil,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };

import { registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./";

export const chechingAuthentication = (email, password) => {
    return async ( dispatch ) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        // llamar a funcion de autenticar con google
        const result = await signInWithGoogle();
        // en caso de error, llamar a funcion de salir con el mensaje de error
        if(!result.ok) dispatch(logout(result.errorMessage));
        // en caso de todo ok
        dispatch(login(result));
    }
}

export const startCreatingUserWitEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});
        // en caso de error, llamar el logout con el mensaje de error
        if(!ok) return dispatch(logout({errorMessage}));
        // en caso de todo ok
        dispatch(login({uid, displayName, email, photoURL}));
    }
}
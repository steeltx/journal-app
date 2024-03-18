import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle =  async () => {
    try {
        // indicar la autenticacion con Firebase definido anteriormante y google
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName ,email, photoURL, uid } = result.user;
        return {
            ok: true,
            // informacion del usuario
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName}) => {
    try {
        // llamar a firebase
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        // si todo es correcto, obtener los datos
        const { uid, photoURL} = resp.user;
        // actualizar el usuario actual
        await updateProfile(FirebaseAuth.currentUser, {displayName})
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        } 
    }
} 
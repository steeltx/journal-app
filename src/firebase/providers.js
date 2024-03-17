import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
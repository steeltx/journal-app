import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewnote, setActiveNote } from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        // indicar que inicia en proceso de guardar
        dispatch(savingNewnote());

        const { uid } = getState().auth;

        const newNote = 
        {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        // ingresar en la url/colección indicada
        const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notes`) );
        // crear la nueva nota en firebase
        await setDoc(newDoc, newNote);
        //establecer el id creado desde firebase
        newNote.id = newDoc.id;
        //despachar desde el slice
        dispatch(addNewEmptyNote(newNote));
        // indicar que es la nota activa
        dispatch(setActiveNote(newNote));
    }
}
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewnote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        // indicar que inicia en proceso de guardar
        dispatch(savingNewnote());

        const { uid } = getState().auth;

        const newNote = 
        {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
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

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID no existe');
        const notes = await loadNotes(uid);
        // llamar a funcion que agregar las notas en el state
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        // eliminar la propiedad ID de la nota
        const noteToFireStore = {...note};
        delete noteToFireStore.id;
        // referencia del documento a modificar
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        // realizar el merge del registro
        await setDoc(docRef, noteToFireStore, { merge: true});
        // actualizar la nota en el estado
        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async (dispatch) => {
        dispatch(setSaving());
        //await fileUpload (files[0]);
        const fileUploadPromises = [];
        // crear un arreglo de promesas
        for (const file of files) {
            fileUploadPromises.push(fileUpload (file));
        }
        // llamar todas las promesas y esperar las urls respuesta
        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async ( dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        // se crea la referencia del documento
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        // eliminar el documento indicado en la referencia anterior
        await deleteDoc(docRef);
        // eliminar del estado local
        dispatch(deleteNoteById(note.id));
    }
}
import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = '') => {
    if(!uid) throw new Error('El UID no existe');
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    // obtener todos los documentos de la colección indicada
    const docs = await getDocs(collectionRef);
    const notes = [];
    // recorrer todos los docs y llamar la funcion data para obtener los valores
    docs.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()});
    })
    return notes;
}
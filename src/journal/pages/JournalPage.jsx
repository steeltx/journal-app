import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../view";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";

export const JournalPage = () => {
    
    const dispatch = useDispatch();

    // si esta guardando, deshabilitar el boton de agregar
    const { isSaving, active } = useSelector(state => state.journal);

    const onClickNewNote = () => {
        dispatch(startNewNote());
    }

    return (
        <JournalLayout>
            {
                // si existe una nota activa, mostrar la vista de nota
                (!!active) 
                ? <NoteView />
                :  <NothingSelectedView />
            }

            <IconButton
                onClick={onClickNewNote}
                disabled={isSaving}
                size="large"
                sx={{
                    color: "white",
                    backgroundColor: "error.main",
                    ":hover": { backgroundColor: "error.main", opacity: 0.9},
                    position: "fixed",
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{fontSize: 30}}/>
            </IconButton>
        </JournalLayout>
    )
}

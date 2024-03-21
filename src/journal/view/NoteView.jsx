import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal";

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    // cada que se actualice el formulario, se almacena en state
    useEffect(() => {
        dispatch(setActiveNote(formState));
    },[formState]);

    return (
        <Grid 
            className="animate__animated animate__fadeIn animate__faster"
            container 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{mb: 1}}>
            <Grid item>
                <Typography fontSize={39} fontWeight="ligth">{dateString}</Typography>
            </Grid>
            <Grid item>
                <Button color="primary" sx={{padding: 2}}>
                    <SaveOutlined sx={{fontSize: 30, mr: 1}} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{border: "none", mb: 1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <ImageGallery />
        </Grid>
    )
}

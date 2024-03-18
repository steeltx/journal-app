import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {

    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation ] = useState({});

    useEffect(() => {
        createValidators();
    },[formState]);

    const isFormValid = useMemo( () => {
        // recorrer todos los campos y si es diferente a null, es que existe un problema
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;
        }
        return true;
    },[ formValidation ]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};
        // recorrer todos los campos
        for(const formField of Object.keys(formValidations)){
            // obtener la funcion y el mensaje de error de las validaciones recibidas
            const [fn, errorMessage ] = formValidations[formField];
            // llenar el objeto con el nombre de la propiedad + Valid y mensaje en caso de error
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        // set del estado local
        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}
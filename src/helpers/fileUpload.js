
export const fileUpload = async (file) => {
    //if(!file) throw new Error('No hay archivos');
    if(!file) return null;
    const cloudUrl = "";
    // crear el body de la peticion post
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file',file);
    try {
        // realizar la peticion con el body creado con el archivo
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if(!resp.ok) throw new Error('No se pudo subir imagen');
        const cloudResponse = await resp.json();
        return cloudResponse.secure_url;
    } catch (error) {
        //throw new Error(error.message);
        return null;
    }
}
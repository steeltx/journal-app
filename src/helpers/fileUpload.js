
export const fileUpload = async (file) => {
    //if(!file) throw new Error('No hay archivos');
    if(!file) return null;
    // para el testing usar el string de la url en lugar de env
    const cloudUrl = import.meta.env.VITE_CLOUDINADY_URL;
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
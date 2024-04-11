import { fileUpload } from "../../helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dfcoinvcp',
    api_key: '626393767669395',
    api_secret: 'kTqEhmvqmNTb6AE6-CWMhsk735I',
    secure: true
});

describe('pruebas en carga de archivos', () => {

    test('debe de subir el archivo correctamente a cloudinary', async () => {
        // descargar la imagen
        const imageUrl = 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob],'foto.jpg');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments =url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');
        const cloudResp = await cloudinary.api.delete_resources(['journal/'+imageId],{
            resource_type: 'image'
        });
        //console.log({cloudResp});

    });


    test('debe de retornar null', async () => {
        const file = new File([],'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });


});
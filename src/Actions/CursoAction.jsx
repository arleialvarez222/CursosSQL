import HttpCliente from '../servicios/HttpCliente';

export const GuardarCurso = async (curso, imagen) => {
    const endPointCurso = '/cursos';
    const promesaCurso = HttpCliente.post(endPointCurso, curso);

    if(imagen){
        const endPointImagen = '/documento';
        const promesaImagen = HttpCliente.post(endPointImagen, imagen);
        return await Promise.all([promesaCurso, promesaImagen]);
    }else{
        return await Promise.all([promesaCurso]);
    }
};

export const PaginacionCurso = (paginador) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/cursos/report', paginador).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        });
    })
}
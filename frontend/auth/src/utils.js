import {toast} from 'react-toastify';
export const handlescucess = (msg) =>{
    toast.success(msg , {
        position : 'top-right'
    })
}
export const handlerror = (msg) =>{
    toast.error(msg , {
        position : 'top-right'
    })
}

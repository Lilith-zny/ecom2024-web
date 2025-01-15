import axios from "axios";

export const createCategory = async (token, form) => {
    return axios.post('https://ecom2024-api-one.vercel.app/api/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listCategory = async () => {
    return axios.get('https://ecom2024-api-one.vercel.app/api/category')
}
export const removeCategory = async (token, id) => {
    return await axios.delete('https://ecom2024-api-one.vercel.app/api/category/'+id,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
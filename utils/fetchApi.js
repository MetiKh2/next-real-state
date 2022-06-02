import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';


export const  fetchApi = async (url)=>{
    const {data}=await axios.get((url),{
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '5692ec18a9msh666a3c0cd88a55dp186ff9jsn771e76ca9db9'
        }
    })
    return data
}
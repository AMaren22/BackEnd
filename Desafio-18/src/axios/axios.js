import axios from "axios";

const getAxiosProducts = async () =>{
    try{
    const resp = await axios.get('http://localhost:8080/api/list')
    console.log(resp.data);
    }catch(error){
        console.log(error);
    }
}

const dataProduct = {
    name: "Televisor AXIOS",
    price: 100000,
    code: "TvA0002",
    stock: 40
}

const postAxiosProduct = async () =>{
    try{
        const resp = await axios.post('http://localhost:8080/api/save', dataProduct)
        console.log(resp.data);
    }catch(error){
        console.log(error);
    }
}

await getAxiosProducts()
await postAxiosProduct()
await getAxiosProducts()

import messageManager from "../services/normalizer.service.js"


export const getOriginal = async (req, res) =>{
    try{
        const data = await messageManager.original()
        res.json({data})
    }catch(error){
        console.log(error);
    }
}

export const getNormalizer = async (req, res) =>{
    try{
        await messageManager.normalizer()
        const data = messageManager.getNormalize()
        res.json({data})
    }catch(error){
        console.log(error);
    }
}

export const getDesnormalize = async (req, res) =>{
    try{
        const data = await messageManager.desnormalize()
        res.json({data})
    }catch(error){
        console.log(error);
    }
}
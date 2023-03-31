import twilio from "twilio";
import { config } from "../config/config";
import { logger } from "../config/logs.config";

export const twilioClient = twilio(config.SID, config.TOKEN)


export const sendSMS = async(phone: string) =>{
    try{
        const message = {
            body: 'Su pedido a sido realizado con éxito, en estos momentos lo estamos preparando',
            from: config.PHONE,
            to: `+54${phone}`
        };
        return await twilioClient.messages.create(message)
    }catch(error){
        logger.error(error)
    }
}
export const sendWPP = async (phone: string,msg: string) =>{
    try{
        const message = {
            body: msg,
            from: config.PHONE_WPP,
            to: `whatsapp:+549${phone}`
        }
        return await twilioClient.messages.create(message)
    }catch(error){
        logger.error(error)
    }
}
import apiServiceMeta from "./apiMeta";

const messageService = {

    enviarMensajeWhatsapp: (mensaje) => {
        const data = { 
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "59173277937",
            "type": "text", 
            "text": { 
                "preview_url": false,
                "body": mensaje
            }
        }
        return apiServiceMeta.post("/messages", data)
    },

    
}

export default messageService;
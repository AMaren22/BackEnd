export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Entrega final E-commerce',
            version: '1.0.0',
            description: 'Entrega del proyecto final del curso de backend de Coderhouse'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Local Server'
            },
            {
                 url: 'http://url.railways.com',
                 description: 'Production server'
            }
        ]
    },
    apis: ['./src/docs/*.yml']
}
***************************** PRUEBA DE PRODUCTOS ***************************************



//AGREGO 3 PRODUCTOS

curl --location --request POST 'http://localhost:8080/api/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "Celular Motorola Moto G52 128GB Negro",
    "descripcion": "SmartPhone",
    "codigo": 1001,
    "foto": "https://images.fravega.com/f500/3718e2f904770c5a92c1d8578a4bd588.jpg",
    "precio": 70000 ,
    "stock": 30
}'

curl --location --request POST 'http://localhost:8080/api/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "Notebook Dell 15,6” Ryzen 5 8GB 256GB SSD Inspiron 15 3515 24DV0",
    "descripcion": "Notebook",
    "codigo": 1002,
    "foto": "https://images.fravega.com/f500/ae40dd821ce32f7dac145b2b7324ac57.jpg",
    "precio": 180000,
    "stock": 3
}'

curl --location --request POST 'http://localhost:8080/api/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "Smart Tv Sansei Tds2243fipi Led Full Hd 43",
    "descripcion": "Smart Tv",
    "codigo": 1003,
    "foto": "https://images.fravega.com/f500/3488c8fab923411f331522c2be832371.jpg",
    "precio": 79000,
    "stock": 14
}'

// ACTUALIZO UN PRODUCTOS

curl --location --request PUT 'http://localhost:8080/api/productos/02ed2c31-a525-49ae-8734-dea0c480cc6a' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "Smart Tv Sansei Tds2243fipi Led Full Hd 43",
    "descripcion": "Smart Tv",
    "codigo": 1003,
    "foto": "https://images.fravega.com/f500/3488c8fab923411f331522c2be832371.jpg",
    "precio": 100000,
    "stock": 7
}'

// ELIMINO UN PRODUCTOS

curl --location --request DELETE 'http://localhost:8080/api/productos/6bfa6bc7-33fa-421c-883f-479f95d62f36'


************************************** PRUEBA DE CARRITO ********************************

//CREO 3 carritos

curl --location --request POST 'http://localhost:8080/api/carrito'

curl --location --request POST 'http://localhost:8080/api/carrito'

curl --location --request POST 'http://localhost:8080/api/carrito'

// AGREGO PRODUCTOS A UN CARRITO

curl --location --request POST 'http://localhost:8080/api/carrito/5cf32d45-72d2-4d36-af98-c83f816716ca/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id":"02ed2c31-a525-49ae-8734-dea0c480cc6a"
}'

curl --location --request POST 'http://localhost:8080/api/carrito/5cf32d45-72d2-4d36-af98-c83f816716ca/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id":"cda7d2a9-4ac0-4a1e-8c9d-098e65be799b"
}'

curl --location --request POST 'http://localhost:8080/api/carrito/a3986ae8-a18b-4be5-a698-077de3f5fb8e/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id":"cda7d2a9-4ac0-4a1e-8c9d-098e65be799b"
}'

// MUESTRO LOS PRODUCTOS DE LOS carritos

curl --location --request GET 'http://localhost:8080/api/carrito/5cf32d45-72d2-4d36-af98-c83f816716ca/productos'

curl --location --request GET 'http://localhost:8080/api/carrito/a3986ae8-a18b-4be5-a698-077de3f5fb8e/productos'

curl --location --request GET 'http://localhost:8080/api/carrito/b729cb98-b398-4640-96c9-17362c1c1f7a/productos'

// ELIMINO UN CARRITO

curl --location --request DELETE 'http://localhost:8080/api/carrito/b729cb98-b398-4640-96c9-17362c1c1f7a'


// ELIMINO UN PRODUCTO DE UN CARRITO

curl --location --request DELETE 'http://localhost:8080/api/carrito/5cf32d45-72d2-4d36-af98-c83f816716ca/productos/cda7d2a9-4ac0-4a1e-8c9d-098e65be799b'




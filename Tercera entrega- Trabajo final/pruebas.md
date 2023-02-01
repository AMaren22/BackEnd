# Creación de usuario => Nos envia un mail con los datos al finalizar

curl --location --request POST 'http://localhost:8080/api/signup' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AMU1Rbjf42xyzDvEmMJpxqkND3k4KYa7r.28kpUiawiRZwUid1agUB5qCZNFC3SergBtyEfCg%2B2R8' \
--data-raw '{
    "email": "email.com",
    "password": "1234",
    "name": "Augusto",
    "adress": "La Plata",
    "age": 28,
    "phone": "+542302573864",
    "avatar": "Foto"
}'

# Creación de productos => Creamos 3 productos

curl --location --request POST 'http://localhost:8080/api/productos' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AMU1Rbjf42xyzDvEmMJpxqkND3k4KYa7r.28kpUiawiRZwUid1agUB5qCZNFC3SergBtyEfCg%2B2R8' \
--data-raw '{
  "nombre": "Smart Tv Sansei Tds2243fipi Led Full Hd 43",
  "descripcion": "Smart Tv",
  "codigo": 1003,
  "foto": "https://images.fravega.com/f500/3488c8fab923411f331522c2be832371.jpg",
  "precio": 100000,
  "stock": 7
}'

curl --location --request POST 'http://localhost:8080/api/productos' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AnVPSKrhfYI3DsfXhwzBaGEVF63L38i6m.MQTz4lelWRep5oLvzxqWsg9SmDaMG5ifpPNq0HJ5q8Q' \
--data-raw '{
  "nombre": "Celular Motorola Moto G52 128GB Negro",
  "descripcion": "SmartPhone",
  "codigo": 1001,
  "foto": "https://images.fravega.com/f500/3718e2f904770c5a92c1d8578a4bd588.jpg",
  "precio": 70000,
  "stock": 30
}'

curl --location --request POST 'http://localhost:8080/api/productos' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AnVPSKrhfYI3DsfXhwzBaGEVF63L38i6m.MQTz4lelWRep5oLvzxqWsg9SmDaMG5ifpPNq0HJ5q8Q' \
--data-raw '{
  "nombre": "Notebook Dell 15,6” Ryzen 5 8GB 256GB SSD Inspiron 15 3515 24DV0",
  "descripcion": "Notebook",
  "codigo": 1002,
  "foto": "https://images.fravega.com/f500/ae40dd821ce32f7dac145b2b7324ac57.jpg",
  "precio": 180000,
  "stock": 3
}'

# Creamos un Carrito => Nos devuelve la id del carrito en este caso => 63dacb44092737cf0f3cf666

curl --location --request POST 'http://localhost:8080/api/carrito' \
--header 'Cookie: connect.sid=s%3AnVPSKrhfYI3DsfXhwzBaGEVF63L38i6m.MQTz4lelWRep5oLvzxqWsg9SmDaMG5ifpPNq0HJ5q8Q'

# Agregamos productos al carrito

curl --location --request POST 'http://localhost:8080/api/carrito/63dacb44092737cf0f3cf666/productos' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AuPsaFbiZBQ-CjqrJ64trobBCuNcbzAmo.1O1oQcwTSFjeYQnlBR7EA1hOokVCWu3oiKMGoMV7KDI' \
--data-raw '{
    "id": "63dac98a092737cf0f3cf650"
}
'

curl --location --request POST 'http://localhost:8080/api/carrito/63dacb44092737cf0f3cf666/productos' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AuPsaFbiZBQ-CjqrJ64trobBCuNcbzAmo.1O1oQcwTSFjeYQnlBR7EA1hOokVCWu3oiKMGoMV7KDI' \
--data-raw '{
    "id": "63dac96e092737cf0f3cf64e"
}
'

# Nos logueamos

curl --location --request POST 'http://localhost:8080/api/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3A5ci66XZtEWK1Pls_NHVEBGcl8W_J1yLn.zq%2Fl69G%2BBHpYVk9MC0VpD5yX6fini492FNWK6b2WA1w' \
--data-raw '{
    "email": "email.com",
    "password": "1234"
}'

# Hacemos la compra => Nos llega mail y wpp al admin y msg al comprador

curl --location --request GET 'http://localhost:8080/api/carrito/63dacb44092737cf0f3cf666/buy' \
--header 'Cookie: connect.sid=s%3A2kiQl_chM6QBVLpttdTid38rQUCuw0VZ.iaG3yMhDc6VjUFjGvgiObGaoSQM9qQRGLXYbi8A51Xw'
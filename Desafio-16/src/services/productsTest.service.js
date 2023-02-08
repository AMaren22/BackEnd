export const productsTest = () =>{
    const products = []
    for (let i = 0; i < 5; i++) {
        products.push({
          id: faker.database.mongodbObjectId(),
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          thumbnail: faker.image.technics(640, 480, true),
        });
    }
    return products
}
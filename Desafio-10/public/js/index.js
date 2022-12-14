const TITLE = document.querySelector('#title')
const PRICE = document.querySelector('#price')
const THUMBNAIL = document.querySelector('#url')
const PRODUCT = document.querySelector('#formProduct')
const TBODY = document.querySelector('#tbody')
const CHAT = document.querySelector('#formMessage')
const EMAIL = document.querySelector('#email')
const MSG = document.querySelector('#msg')
const BOX = document.querySelector('#messageContainer')

const socket = io()

PRODUCT.addEventListener('submit', (e) =>{
    e.preventDefault()

    let newProduct = {
        title: TITLE.value,
        price: PRICE.value,
        thumbnail: THUMBNAIL.value
    }
    socket.emit('addProduct', newProduct)

    TITLE.value = ""
    PRICE.value = ""
    THUMBNAIL.value = ""
})
const addTableProduct = (data) =>{
    const trInput = document.createElement('tr')
    const id = document.createElement('td')
    const title = document.createElement('td')
    const price = document.createElement('td')
    const thumbnail = document.createElement('td')
    const tdImage = document.createElement('td')
    const image = document.createElement('img')

    
    id.innerText = data.id
    title.innerText = data.title
    price.innerText = data.price
    image.setAttribute('src', data.thumbnail)
    image.setAttribute('alt', 'Imagen no disponible') 
    
    trInput.appendChild(id)
    trInput.appendChild(title)
    trInput.appendChild(price)
    trInput.appendChild(tdImage)
    tdImage.appendChild(image)
    TBODY.appendChild(trInput)
}
socket.on('addTable',(data) =>{
    addTableProduct(data)
})

CHAT.addEventListener('submit',(e) =>{
    e.preventDefault()

    let newMessage = {
        email: EMAIL.value,
        msg: MSG.value
    }
    socket.emit('newMessage', newMessage)
    EMAIL.value= ''
    MSG.value = ''
})

const addMessage = (data) =>{
    const messageContainer = document.createElement('div')
    const messageEmail = document.createElement('p')
    const messageTime = document.createElement('span')
    const messageText = document.createElement('p')

    messageContainer.setAttribute('class', 'message')
    messageEmail.setAttribute('class', 'meta')
    messageEmail.innerText = data.email
    messageText.setAttribute('class', 'text')
    messageText.innerText = data.msg
    messageTime.innerText = data.time

    messageContainer.appendChild(messageEmail)
    messageEmail.appendChild(messageTime)
    messageContainer.appendChild(messageText)

    BOX.appendChild(messageContainer)
}

socket.on('renderMessage', (data) =>{
    addMessage(data)
})



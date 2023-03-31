const CHAT = document.querySelector('#formMessage')
const EMAIL = document.querySelector('#email')
const MSG = document.querySelector('#msg')
const BOX = document.querySelector('#messageContainer')

const socket = io()

CHAT.addEventListener('submit', (e) =>{
    e.preventDefault()

    let newMessage = {
        email: EMAIL.value,
        message: MSG.value
    }
    socket.emit('newMessage', newMessage)
    EMAIL.value = ''
    MSG.value = ''
})

const addMessage = (data) =>{
    const messageContainer = document.createElement('div')
    const messageEmail = document.createElement('p')
    const messageTime = document.createElement('span')
    const messageText = document.createElement('p')
    const messageType = document.createElement('span')

    messageContainer.setAttribute('class', 'message')
    messageEmail.setAttribute('class', 'meta')
    messageEmail.innerText = data.email
    messageText.setAttribute('class', 'text')
    messageText.innerText = data.message
    messageTime.innerText = data.timestamp
    messageType.innerText = data.type

    messageContainer.appendChild(messageEmail)
    messageEmail.appendChild(messageTime)
    messageEmail.appendChild(messageType)
    messageContainer.appendChild(messageText)

    BOX.appendChild(messageContainer)
}

socket.on('renderMessage', (data) =>{
    addMessage(data)
})
const chatHistory = document.getElementById('chat-history');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');

// Substituir pela URL da função do chat
const srvFunctionURL = 'http://127.0.0.1:5000/chat';

sendButton.addEventListener('click', () => {
    const userMessage = userMessageInput.value.trim();
    if (userMessage) {
        sendMessageToChat(userMessage);
        sendUserMessageToServer(userMessage);
        userMessageInput.value = '';
    }
});

function sendMessageToChat(message, sender = 'Usuario') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<b>${sender}:</b> ${message}`;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function sendUserMessageToServer(message) {
    fetch(srvFunctionURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
        .then(response => response.json())
        .then(data => {
            const srvResponse = data.replace(/\n/g, '<br>');
            const formattedResponse = `<p>${srvResponse}</p>`;
            sendMessageToChat(formattedResponse, 'Euroman');
	})
        .catch(error => {
            console.error('Erro ao enviar mensagem para o servidor:', error);
        });
}

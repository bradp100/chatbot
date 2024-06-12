document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message !== '') {
        addMessage(`You: ${message}`);
        input.value = '';

        // Send the message to the server via AJAX
        fetch('/api/messages/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')  // Add CSRF token for security
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                addMessage(`Bot: ${data.message}`);
            } else {
                addMessage(`Error: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage('Error: Could not send message to the server.');
        });
    }
});

function addMessage(message) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message';
    messageContainer.textContent = message;
    document.getElementById('messages').appendChild(messageContainer);
    messageContainer.scrollIntoView();
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


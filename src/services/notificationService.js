let notificationElement = document.querySelector('.notification');

export function showNotification(message) {
    notificationElement.querySelector('span').textContent = message;
    notificationElement.style.display = 'block';

    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, 4000);
}
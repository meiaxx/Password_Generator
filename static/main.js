document.addEventListener('DOMContentLoaded', function () {
    const passwordElement = document.getElementById('password');
    const copyButton = document.getElementById('copy-password');
    copyButton.style.display = 'none'; // Ocultar el botón por defecto
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);

        // Verifica si al menos un checkbox está marcado
        if (!formData.get('lowercase') && !formData.get('uppercase') && !formData.get('digits') && !formData.get('special_chars')) {
            passwordElement.innerHTML = 'Debes seleccionar al menos una opción.';
        } else {
            fetch('/generate_password', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                passwordElement.innerHTML = 'Contraseña generada: ' + data;

                // Si se genera la contraseña con éxito, muestra el botón "Copiar Contraseña" y centra verticalmente
                copyButton.style.display = 'block';
                copyButton.style.margin = 'auto';

                // Agrega el evento de clic para copiar la contraseña
                copyButton.addEventListener('click', function () {
                    const textArea = document.createElement('textarea');
                    textArea.value = data;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    alert('Contraseña copiada al portapapeles');
                });
            });
        }
    });
});



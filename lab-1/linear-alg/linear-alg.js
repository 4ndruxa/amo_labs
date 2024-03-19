window.onload = function() {
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', calculateEquation);

    function calculateEquation() {
        const aInput = document.getElementById('input-a').value;
        const bInput = document.getElementById('input-b').value;
        const cInput = document.getElementById('input-c').value;

        // Перевірка чи введені значення є числами
        if (isNaN(aInput) || isNaN(bInput) || isNaN(cInput)) {
            alert('Помилка! Будь ласка, введіть числові значення для a, b та c.');
            return;
        }
        // Обчислення
        const a = parseFloat(aInput);
        const b = parseFloat(bInput);
        const c = parseFloat(cInput);

        const result = ((a * c) ** 2) + ((b * c) ** 3) + ((c * c) ** 4);

        document.getElementById('result').innerText = `Результат: ${result}`;
    }
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt'; 
    fileInput.multiple = 'multiple';

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const values = e.target.result.split(',');
            const aFromFile = parseFloat(values[0]);
            const bFromFile = parseFloat(values[1]);
            const cFromFile = parseFloat(values[2]);

            // Перевірка чи значення з файлу є числами
            if (isNaN(aFromFile) || isNaN(bFromFile) || isNaN(cFromFile)) {
                alert('Помилка! Неправильний формат даних у файлі. Будь ласка, перевірте його.');
                return;
            }

            document.getElementById('input-a').value = aFromFile;
            document.getElementById('input-b').value = bFromFile;
            document.getElementById('input-c').value = cFromFile;

            console.log('Значення з файлу: a =', aFromFile, ', b =', bFromFile, ', c =', cFromFile);
        };

        reader.readAsText(file);
    });

    document.body.appendChild(fileInput);
}

window.onload = function() {
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', calculateEquation);

    function calculateEquation() {
        const bInput = document.getElementById('input-b').value;
        const zInput = document.getElementById('input-z').value;
        const dInput = document.getElementById('input-d').value;
        const wInput = document.getElementById('input-w').value;
        const fInput = document.getElementById('input-f').value;

        // Перевірка чи введені значення є числами
        if (isNaN(bInput) || isNaN(zInput) || isNaN(dInput) || isNaN(wInput) || isNaN(fInput)) {
            alert('Помилка! Будь ласка, введіть числові значення для b, z, d, w та f.');
            return;
        }

        const b = parseFloat(bInput);
        const z = parseFloat(zInput);
        const d = parseFloat(dInput);
        const w = parseFloat(wInput);
        const f = parseFloat(fInput);

        // Перевірка на область допустимих значень
        if (z === 0) {
            alert('Помилка! Значення z не може бути рівним 0.');
            return;
        }
        // Обчислення
        let y;

        if (b / z > d) {
            y = Math.sin(w * f);
        } else {
            y = Math.cos(w * f);
        }

        document.getElementById('result').innerText = `Результат: ${y}`;
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
            const bFromFile = parseFloat(values[0]);
            const zFromFile = parseFloat(values[1]);
            const dFromFile = parseFloat(values[2]);
            const wFromFile = parseFloat(values[3]);
            const fFromFile = parseFloat(values[4]);

            // Перевірка чи значення з файлу є числами
            if (isNaN(bFromFile) || isNaN(zFromFile) || isNaN(dFromFile) || isNaN(wFromFile) || isNaN(fFromFile)) {
                alert('Помилка! Неправильний формат даних у файлі. Будь ласка, перевірте його.');
                return;
            }

            document.getElementById('input-b').value = bFromFile;
            document.getElementById('input-z').value = zFromFile;
            document.getElementById('input-d').value = dFromFile;
            document.getElementById('input-w').value = wFromFile;
            document.getElementById('input-f').value = fFromFile;

            console.log('Значення з файлу: b =', bFromFile, ', z =', zFromFile, ', d =', dFromFile, ', w =', wFromFile, ', f =', fFromFile);
        };

        reader.readAsText(file);
    });

    document.body.appendChild(fileInput);
}

window.onload = function() {
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', calculateEquation);

    // Функція для обчислення факторіалу числа
    function factorial(n) {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    function calculateEquation() {
        const aInput = document.getElementById('input-a').value;
        const bInput = document.getElementById('input-b').value;

        // Перевірка чи введені значення є числами
        if (isNaN(aInput) || isNaN(bInput)) {
            alert('Помилка! Будь ласка, введіть числові значення для a та b. ');
            return;
        }

        const a = parseFloat(aInput);
        const b = parseFloat(bInput);

        // Перевірка на область допустимих значень

        // Перевірка те, що а не може бути меншим за 0
        if (a < 0) {
            alert('Помилка! Недопустиме значення для a. Перевірте введені дані.');
            return;
        }

        // Перевірка на те, що a не може бути меншим за b
        if (a < b) {
            alert('Помилка! a не може бути меншим за b. Перевірте введені дані.');
            return;
        }

        // Обчислення знаменника (a - b)!
        const denominator = factorial(a - b);

        // Обчислення виразу
        const fact_a = factorial(a);
        const result = (fact_a * b) / denominator;

        // Виведення результату в елемент "result"
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

            // Перевірка чи значення з файлу є числами
            if (isNaN(aFromFile) || isNaN(bFromFile)) {
                alert('Помилка! Неправильний формат даних у файлі. Будь ласка, перевірте його.');
                return;
            }

            document.getElementById('input-a').value = aFromFile;
            document.getElementById('input-b').value = bFromFile;

            console.log('Значення з файлу: a =', aFromFile, ', b =', bFromFile);
        };

        reader.readAsText(file);
    });

    document.body.appendChild(fileInput);
}

window.onload = function() {
    const sortButton = document.getElementById('sortButton');
    sortButton.addEventListener('click', sortArray);

    function sortArray() {
        const inputArray = document.getElementById('inputArray').value.trim();
        const array = inputArray.split(',').map(Number);

        if (array.some(isNaN)) {
            document.getElementById('sortResult').innerText = 'Помилка! Будь ласка, введіть числові значення.';
            return;
        }

        console.log('Масив до сортування:', array);

        const startTime = performance.now(); // Початковий час виконання алгоритму

        const sortedArray = sort(array);

        const endTime = performance.now(); // Кінцевий час виконання алгоритму

        const executionTime = endTime - startTime; // Обчислення часу виконання у мілісекундах

        console.log('Відсортований масив:', sortedArray);

        document.getElementById('sortResult').innerText = `${sortedArray}`;
        document.getElementById('time4alg').innerText = `Час виконання алгоритму: ${executionTime} мілісекунд.`;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt'; 
    fileInput.multiple = 'multiple';

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const inputArray = e.target.result.trim();
            const array = inputArray.split(',').map(Number);

            if (array.some(isNaN)) {
                document.getElementById('sortResult').innerText = 'Помилка! Будь ласка, введіть числові значення.';
                return;
            }

            console.log('Масив з файлу:', array);

            const startTime = performance.now(); // Початковий час виконання алгоритму

            const sortedArray = sort(array);

            const endTime = performance.now(); // Кінцевий час виконання алгоритму

            const executionTime = endTime - startTime; // Обчислення часу виконання у мілісекундах

            console.log('Відсортований масив:', sortedArray);

            document.getElementById('inputArray').value = inputArray;
            document.getElementById('sortResult').innerText = `${sortedArray}`;
            document.getElementById('time4alg').innerText = `Час виконання алгоритму: ${executionTime} мілісекунд.`;
        };

        reader.readAsText(file);
    });

    document.body.appendChild(fileInput);

    // Функція для генерації випадкових значень
    document.getElementById('generateValuesButton').addEventListener('click', function() {
        var numOfValues = parseInt(document.getElementById('numOfValues').value);
        var minValue = parseInt(document.getElementById('minValue').value);
        var maxValue = parseInt(document.getElementById('maxValue').value);

        if (isNaN(numOfValues) || isNaN(minValue) || isNaN(maxValue)) {
            document.getElementById('sortResult').innerText = 'Помилка! Будь ласка, введіть числові значення.';
            return;
        }

        var generatedValues = [];

        for (var i = 0; i < numOfValues; i++) {
            var randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
            generatedValues.push(randomValue);
        }

        document.getElementById('inputArray').value = generatedValues.join(', ');
    });
}

function sort(arr) {
    let operationsCount = 0; // Лічильник операцій

    for (let i = arr.length - 1; i > 0; i--) {
        let maxIndex = 0;
        for (let j = 1; j <= i; j++) {
            operationsCount += 1; 
            if (arr[j] > arr[maxIndex]) {
                maxIndex = j;
            }
        }
        // Обмін максимального елемента з елементом на позиції i
        [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
        operationsCount += 1; 
    }

    document.getElementById('kstOP').innerText = `Кількість операцій: ${operationsCount}`;

    return arr;
}

const crosswordData = [
  [{
    "1":"Прибор для измерения давления разряженных газов.",
    "2":"Электрическое устройство предназначенное для преобразования переменного тока одного напряжения в переменный ток другого напряжения.",
    "3":"Логическое отрицание.",
    "4":"Логическое сложение.",
    "5":"... - называется участок электрической цепи с одним и тем же током.",
    "6":"Устройство для передачи тепловой энергии от одной среды к другой.",
    "7":"В ФСА этой буквой обозначается время.",
    "8":"Совокупность электрических элементов, соединенных для передачи сигнала или энергии.",
    "9":"Установление зависимости между показаниями прибора и входной величины.",
    "10":"Устройство для автоматического поддержания заданного параметра."
  }],
  [
    [null,null,null,null,null,null,null,1,"В","А","К","У","У","М","Е","Т","Р"],
    [null,null,null,2,"Т","Р","А","Н","С","Ф","О","Р","М","А","Т","О","Р"],
    [null,null,null,null,null,null,null,null,3,"И","Н","В","Е","Р","С","И","Я"],
    [null,null,null,null,null,null,4,"Д","И","З","Ъ","Ю","Н","К","Ц","И","Я"],
    [null,null,null,null,5,"В","Е","Т","В","Ь","Ю",null,null,null,null,null,null],
    [6,"Т","Е","П","Л","О","О","Б","М","Е","Н","Н","И","К",null,null,null],
    [null,null,null,null,null,null,null,null,null,7,"К",null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,8,"Ц","Е","П","Ь",null,null,null],
    [null,null,null,null,null,null,9,"К","А","Л","И","Б","Р","О","В","К","А"],
    [null,null,null,null,10,"Р","Е","Г","У","Л","Я","Т","О","Р",null,null,null]
  ]
]


const crosswordContainer = document.getElementById("crossword");
const rowNumbersContainer = document.getElementById("row-numbers");
const questionsContainer = document.getElementById("questions");

crosswordContainer.style.display = "grid";
crosswordContainer.style.gridTemplateColumns = `repeat(17, 30px)`;
crosswordContainer.style.gap = "1px";

crosswordData[1].forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
        const cellDiv = document.createElement("div");
        if (cell !== null && typeof cell === "number") {
            cellDiv.textContent = cell + ".";
            cellDiv.classList.add("row-number");
        } else if (cell !== null && typeof cell !== "number") {
            cellDiv.textContent = cell;
            cellDiv.classList.add("filled-cell");
            if (cellIndex === 10) { // Если буква находится в 11-й колонке
                cellDiv.id = "main-letter";
            }
        } else {
            cellDiv.classList.add("empty-cell");
        }
        crosswordContainer.appendChild(cellDiv);
    });
});

// Добавляем вопросы
for (const [num, question] of Object.entries(crosswordData[0][0])) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    questionDiv.innerHTML = `<strong>${num}.</strong> ${question}`;
    questionsContainer.appendChild(questionDiv);
}

// Логика кликов по словам
document.addEventListener("DOMContentLoaded", () => {
    let crossword = document.getElementById("crossword");
    let cells = Array.from(crossword.children);

    let currentWord = [];

    cells.forEach((cell, index) => {
        if (!isNaN(parseInt(cell.textContent))) { 
            if (currentWord.length > 0) {
                attachClickListener(currentWord);
                currentWord = [];
            }
        } else {
            currentWord.push(cell);
        }
    });

    if (currentWord.length > 0) {
        attachClickListener(currentWord);
    }

    function attachClickListener(word) {
        word.forEach(letter => {
            letter.addEventListener("click", () => {
                word.forEach(l => {
                    if (l.id === "main-letter") {
                        l.classList.add("main"); // Красный цвет
                    } else {
                        l.classList.add("visible"); // Обычное открытие
                    }
                });
            });
        });
    }
});


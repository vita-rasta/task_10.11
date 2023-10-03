// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  { "index": "0", "kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  { "index": "1", "kind": "Дуриан", "color": "зеленый", "weight": 35},
  { "index": "2", "kind": "Личи", "color": "розово-красный", "weight": 17},
  { "index": "3", "kind": "Карамбола", "color": "желтый", "weight": 28},
  { "index": "4", "kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  const parentFruits = document.querySelector('.fruits__list');
  parentFruits.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let fruit__item = document.createElement('li');
    fruit__item.innerHTML = `<div class = "fruit__info"> <div>index: ${fruits[i].index}</div><div> <div>kind: ${fruits[i].kind}</div> <div>color: ${fruits[i].color}</div> <div>weight: ${fruits[i].weight}</div> </div>`;
    fruit__item.classList.add('fruit__item');

    switch (fruits[i].color) {
      case 'фиолетовый':
        fruit__item.classList.add('fruit_violet');
        break;
      case 'зеленый':
        fruit__item.classList.add('fruit_green');
        break;
      case 'розово-красный':
        fruit__item.classList.add('fruit_carmazin');
        break;
      case 'желтый':
        fruit__item.classList.add('fruit_yellow');
        break;
      case 'светло-коричневый':
        fruit__item.classList.add('fruit_lightbrown');
        break;

    }
    parentFruits.appendChild(fruit__item);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let fruitsOrig = [...fruits];
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let fruitsRandom = getRandomInt(0, fruits.length - 1);
    result.push(fruits[fruitsRandom]);
    fruits.splice(fruitsRandom, 1);
  }

  fruits = result;

  if (fruits == fruitsOrig) {
    alert('Ошибка!');
  };

};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива


const filterFruits = () => {
  let minWeight = document.querySelector('.minweight__input').value;
  let maxWeight = document.querySelector('.maxweight__input').value;
  let fruitsFilter = fruits.filter((item) => {
    // TODO: допишите функцию
     return item.weight >= minWeight && item.weight <= maxWeight;
  });
  console.log(fruitsFilter);
  fruits = fruitsFilter;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();  
});


/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  if (a.color < b.color) {
    return -1;
  } else if (a.color > b.color) {
    return 1;
  } else {
    return 0;
  }
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (comparation(arr[j], arr[j + 1]) > 0) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // Реализация быстрой сортировки
    if (arr.length <= 1) {
      return arr;
    }

    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    const left = [];
    const right = [];

    arr.forEach(item => {
      if (comparation(item, pivot) === -1) {
        left.push(item);
      } else {
        right.push(item);
      }
    });

    return [...this.quickSort(left, comparation), pivot, ...this.quickSort(right, comparation)];
  },
  
  

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
  
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'

});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});

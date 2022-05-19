# Тестовое задание от NewGen Vision

## Условие задачи:

На сайте UniPage есть подборка интересных языковых курсов. У каждого курса есть цена, которая является диапазоном.

*Например:*

* от 100 до 200 рублей;

* от 500 рублей;

* до 400 рублей.

Пользователю сайта нужно найти подходящие ему курсы. Для этого есть фильтр, где пользователь может задать подходящий ему диапазон цен.

## Требование:

Опишите, как можно отфильтровать список курсов, чтобы выдались только подходящие по цене? Реализуйте на JavaScript (или TypeScript) функцию, проводящую такую фильтрацию.

## Входные данные:

    // Список курсов
    let courses = [
        { name: "Courses in England", prices: [0, 100] }, 
        { name: "Courses in Germany", prices: [500, null] }, 
        { name: "Courses in Italy", prices: [100, 200] }, 
        { name: "Courses in Russia", prices: [null, 400] },
        { name: "Courses in China", prices: [50, 250] },
        { name: "Courses in USA", prices: [200, null] },
        { name: "Courses in Kazakhstan", prices: [56, 324] },
        { name: "Courses in France", prices: [null, null] },
    ];

    // Варианты цен (фильтры), которые ищет пользователь
    let requiredRange1 = [null, 200];
    let requiredRange2 = [100, 350];
    let requiredRange3 = [200, null];



## Вывод:
```
   // [подходящие курсы для каждого варианта фильтра]
```
Дополнительно, вы также можете реализовать алгоритм сортировки курсов по цене.

# Выполнение задания
## Фильтрация
Реализована фильтрация списка функций на языке JavaScript. В данном задании значение поля prices может быть не определено, то есть равно "null". Так как требуется вывести все подходящие по цене курсы, то будем их включать в список. В функции обработаны ситуации со значением "null". В данной реализации использовано нестрогое сравнение,то есть включающее границы. 
```
function filter(courses, requiredRange) {
    min = requiredRange[0];
    max = requiredRange[1];
    //обработаем ситуацию, когда пользователь не указал один из диапазонов
    if (min === null)
        min = 0;
    if (max == null)
        max = Number.MAX_SAFE_INTEGER; 
    resultFiltration = [];
    for (i in courses){
        coursesMin = courses[i].prices[0];
        coursesMax = courses[i].prices[1];
        //обрабатываем ситуацию с null
        //если минимум = null
        if (coursesMin === null && coursesMax != null)
            coursesMin = coursesMax;
        //если максимум = null
        if (coursesMin != null && coursesMax === null)
            coursesMax = coursesMin; 
        //если оба равны null, то добавляем в ручную    
        if (coursesMin === null && coursesMax === null){
            resultFiltration.push(courses[i]);
            continue; //можно не писать, так как дальнейшее условие не выполнится, 
                      //но это сделано для безопасности и простоты читаемости кода
        }
        if ((courses[i].prices[0]>=min && courses[i].prices[0]<=max) || 
            (courses[i].prices[1]>=min && courses[i].prices[1]<=max)){
            resultFiltration.push(courses[i]);
        }
    }
  return resultFiltration;
}
```
## Сортировка
Реализуем для данного задания быструю сортировку, так как она имеет отличный показатель средней сложности O(n log n) и высокую производительность относительно с другими, менее эффективными алгоритмами такими как - buble sort или insert sort для больших наборов данных. Подробнее можно прочитать [здесь](https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%81%D1%82%D1%80%D0%B0%D1%8F_%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0).

```
   function sort(items, left, right) {
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
            sort(items, left, index - 1);
        }
        if (index < right) {
            sort(items, index, right);
        }
    }
    return items;
}

function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)].prices[0],
        i       = left,
        j       = right;
    while (i <= j) {
        while (items[i].prices[0] < pivot) {
            i++;
        }
        while (items[j].prices[0] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function swap(items, firstIndex, secondIndex){
    const temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

```

## Итоговая функция фильтрации, возвращающая отфильтрованный список

*Пояснение*: перед возвратом списка, вызываем для него функцию сортировки, и возвращаем уже отсортированный список.
```
function filter(courses, requiredRange) {
    min = requiredRange[0];
    max = requiredRange[1];
    //обработаем ситуацию, когда пользователь не указал один из диапазонов
    if (min === null)
        min = 0;
    if (max == null)
        max = Number.MAX_SAFE_INTEGER; 
    resultFiltration = [];
    for (i in courses){
        coursesMin = courses[i].prices[0];
        coursesMax = courses[i].prices[1];
        //обрабатываем ситуацию с null
        //если минимум = null
        if (coursesMin === null && coursesMax != null)
            coursesMin = coursesMax;
        //если максимум = null
        if (coursesMin != null && coursesMax === null)
            coursesMax = coursesMin; 
        //если оба равны null, то добавляем в ручную    
        if (coursesMin === null && coursesMax === null){
            resultFiltration.push(courses[i]);
            continue; //можно не писать, так как дальнейшее условие не выполнится, 
                      //но это сделано для безопасности и простоты читаемости кода
        }
        if ((courses[i].prices[0]>=min && courses[i].prices[0]<=max) || 
            (courses[i].prices[1]>=min && courses[i].prices[1]<=max)){
            resultFiltration.push(courses[i]);
        }
    }
    resultFiltration = sort(resultFiltration);   
  return resultFiltration;
}
```
## Тестирование 
### Проверим для данных let requiredRange1 = [null, 200];
![alt text](https://i.ibb.co/qm0cC4t/2022-05-19-22-56-19.png)
### Проверим для данных let requiredRange2 = [100, 350];

![alt text](https://i.ibb.co/jG6z7t5/2.png)

### Проверим для данных let requiredRange3 = [200, null];
![alt text](https://i.ibb.co/nnrdQ5X/3.png)

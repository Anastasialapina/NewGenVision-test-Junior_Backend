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
    
function filter(courses, requiredRange) {
    min = requiredRange[0];
    max = requiredRange[1];
    //обработаем ситуацию, когда пользователь не указал один из диапазонов
    if (min === null)
        min = 0;
    if (max === null)
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
            continue; //можно не писать, так как дальнейшее условие не выполнится, но это сделано для безопасности и простоты читаемости кода
        }
        if ((courses[i].prices[0]>=min && courses[i].prices[0]<=max) || (courses[i].prices[1]>=min && courses[i].prices[1]<=max)){
            resultFiltration.push(courses[i]);
        }
    }
    resultFiltration = sort(resultFiltration);   
  return resultFiltration;
}

    
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



answer1 = filter(courses, requiredRange1);
console.log(answer1);
answer2 = filter(courses, requiredRange2);
console.log(answer2);
answer3 = filter(courses, requiredRange3);
console.log(answer3);

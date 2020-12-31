$(document).ready(function(){

    //storing the elements in an array
    let arr =  [];
    let list = []
    $('.grid-item').each(function(){
        arr.push(this);
        list.push(Number($(this).text()))
    })
    let count = 0;

    //converting a list into a matrix
    let matrix = [
        [list[0], list[1], list[2]], 
        [list[3], list[4], list[5]], 
        [list[6], list[7], list[8]]
    ]
    
    //adding a class to the element that click was performed on
    $('.grid-item').click(function(){

        //adding a class
        $(this).addClass('highlighter')
        let currentValue = $(this).text()
        if(Number(currentValue) !== 0){
                let currentIndex = index(Number(currentValue), matrix);
                let source = index(0, matrix);
                let isValid = validSwap(source[0], source[1],  currentIndex[0], currentIndex[1]);

                if(isValid){
                    //incrementing count to get the total moves we have made
                    count++;
                    $('#moves').text(count);

                    //swapping the values in the matrix
                    let temp = matrix[currentIndex[0]][currentIndex[1]];
                    matrix[source[0]][source[1]] = temp;
                    matrix[currentIndex[0]][currentIndex[1]] = 0;
                    
                    //flattening the matrix and assigning it to the list array to find the (index of the)element to be changed
                    let flatArray = iFlat(matrix);
                    list = flatArray
                    
                    //swapping values
                    $(this).text('');
                     console.log(currentValue)
                     $('.grid-item').each(function(){
                        if(Number($(this).text()) === 0){
                            $(this).text(currentValue);
                        }
                    })
                    $(this).text('');
                }
        }
        
        //removing the class from other elements
        for(i of arr){
            if(i !== this && $(i).hasClass('highlighter')){
                $(i).removeClass('highlighter')
            }
        }
    })
})

//finding Index
let index = (curr, mat) => {
    let i = 0;
    let j = 0;
    for(let x of mat){
        if(x[0] === curr) {
            j = 0;
            break;
        }   
        else if(x[1] === curr){
            j = 1;
            break;
        } 
        else if(x[2] === curr){
            j = 2;
            break
        }
         i++;
    }
    return [i, j]
}

//validSwap
let validSwap = (x, y, i, j) => {
    if(((i === x+1 || i === x-1) &&  (j ===y)) || (i === x) && (j === y+1 || j === y-1)){
            return true;
    }
    return false;
}

//flattening array
let iFlat = mat => mat.flat()
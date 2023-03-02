



function main(){
    let input = document.getElementById("input").value;
    for(l = 1; l <= 32; l++){
        document.getElementById("img"+l).style.display = "none";
    }
    console.log(toBinary(input));
    printImages(toBinary(input));
}

function toBinary(input){
    let output = [];
    for(i = 0; i < input.length; i++){
        output.push(input[i].charCodeAt(0).toString(2).padStart(8, "0"));
    }
    return (output);
}

function printImages(input){
    console.log(input.length)
    let counter = 0;
    for(i = 0; i < input.length; i++){
        temp = input[i];
        //console.log(input[i]);
        for(j = 0; j < temp.length; j++){
            console.log(temp[j]);
            counter++;
            document.getElementById("img"+counter).style.display = "inline"; 
            document.getElementById("img"+counter).src="temp"+temp[j]+".png";
        }
    }
}
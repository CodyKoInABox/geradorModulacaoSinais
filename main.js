function main(){
    let input = document.getElementById("input").value;
    for(l = 1; l <= 80; l++){

        //hide binary numbers
        document.getElementById("binary"+l).style.display = "none";

        //hide binary images
        document.getElementById("binaryIMG"+l).style.display = "none";

        //hide amplitude modulation
        document.getElementById("amplitudeIMG"+l).style.display = "none";

        //hide frequency modulation
        document.getElementById("frequencyIMG"+l).style.display = "none";
    }

    printImages(toBinary(input));
}

function toBinary(input){
    let output = [];
    for(i = 0; i < input.length; i++){
        output.push(input[i].charCodeAt(0).toString(2).padStart(8, "0"));
    }
    return output;
}

function testNeighbors(position, array, counter){
    let string = "";
    let returnValue = 0;

    for(let l = 0; l < array.length; l++){
        string += array[l]
    }

    let newArray = string.split('');
    //console.log(string)
    //console.log(newArray)
    //console.log("counter="+counter)
    let currentPosition = newArray[counter-1]
    //console.log("currentposition="+currentPosition)

    //testing the current position for neighbors


    //from 0 to 1 to 0
    if(currentPosition == "1" && newArray[counter-2] == "0" && newArray[counter] == "0"){
        returnValue = 4;
    }

    //from 0 to 1
    else if(currentPosition == "1" && newArray[counter-2] == "0"){
        returnValue = 2;
    }

    //from 1 to 0
    else if(currentPosition == "1" && newArray[counter] == "0"){
        returnValue = 3;
    }

    //from 1 to 1
    else if(currentPosition == "1" && newArray[counter-2] == "1" || currentPosition == "1" && newArray[counter] == "1"){
        returnValue = 1;
    }

    //if 0
    else{
        returnValue = 0;
    }

    return returnValue;
}

function printImages(input){
    let counter = 0;
    for(i = 0; i < input.length; i++){
        let temp = input[i];
        for(j = 0; j < temp.length; j++){
            counter++;

            let neighbors = parseInt(testNeighbors(temp[j], input, counter));
            console.log("neighbors="+neighbors)

            //show binary numbers
            document.getElementById("binary"+counter).style.display = "inline"; 
            document.getElementById("binary"+counter).src="assets/binary"+temp[j]+".png";

            //show binary images (need neighbors)
            document.getElementById("binaryIMG"+counter).style.display = "inline"; 
            document.getElementById("binaryIMG"+counter).src="assets/binaryIMG"+neighbors+".png";

            //show amplitude modulation
            document.getElementById("amplitudeIMG"+counter).style.display = "inline"; 
            document.getElementById("amplitudeIMG"+counter).src="assets/amplitudeIMG"+temp[j]+".png";

            //show frequency modulation
            document.getElementById("frequencyIMG"+counter).style.display = "inline"; 
            document.getElementById("frequencyIMG"+counter).src="assets/frequencyIMG"+temp[j]+".png";
        }
    }
}
//funcao chamada sempre que o input do HTML muda
function main(){
    //pega o texto que o usuario colocou no input
    let input = document.getElementById("input").value;
    
    //esse loop tira as imagens da tela, o numero 80 ali significa a quantidade maxima de caracteres binarios, ou seja, o numero maximo de "partes de grafico" possiveis em cada categoria
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

    //chama a funcao que mostra as imagens, e envia para ela o input do usuario em forma de valor binario
    printImages(toBinary(input));
}

//funcao que transforma um input alfanumerico em um output binario
function toBinary(input){

    //cria uma array para organizar o output
    let output = [];

    //loop para transformar cada caractere em binario
    for(i = 0; i < input.length; i++){
        //o .push envia o binario para a array de output, o charCodeAt(0) transforma de alfanumerico para o valor ASCII, o .toString(2) transforma de ASCII em binario e o .padStart(8, "0") certifica que o binario tenha base 8, ele adiciona o numero "0" no inicio do codigo binario CASO o codigo tenha MENOS de 8 caracteres 
        output.push(input[i].charCodeAt(0).toString(2).padStart(8, "0"));
    }
    return output;
}

//funcao que testa os vizinhos de um byte, necessario para mostrar as imagens corretas no sinal binario
function testNeighbors(position, array, counter){
    let string = "";
    let returnValue = 0;

    for(let l = 0; l < array.length; l++){
        string += array[l]
    }

    let newArray = string.split('');
    
    let currentPosition = newArray[counter-1]

    
    //testa a posicao atual e seus vizinhos

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

//funcao que mostra as imagens
function printImages(input){
    let counter = 0;
    for(i = 0; i < input.length; i++){
        let temp = input[i];
        for(j = 0; j < temp.length; j++){
            counter++;

            
            let neighbors = testNeighbors(temp[j], input, counter);

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

    //isso faz com que o botao de baixar PDF suma quando o input esta vazio
    if(input==""){
        document.getElementById("buttonPDF").style.display = "none";
    }
    else{
        document.getElementById("buttonPDF").style.display = "inline";
    }
}
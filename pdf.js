//esse script cuida da parte do PDF com a ajuda de uma biblioteca chamada "jsPDF"
// https://parall.ax/products/jspdf

const { jsPDF } = window.jspdf;

let doc;
let counter;

//funcao chamada quando no clique do botao de baixar PDF, ela so serve para chamar as outras funcoes
function downloadPDF(){
    createPDF()
    template()
    getImages()
    addImages()
    savePDF();
}

//funcao que cria o PDF
function createPDF(){
    doc = new jsPDF({
        //faz com que o PDF fique deitado
        orientation: "landscape",
        //define a unidade como milimetros
        unit: "mm",
        //define o tamanho do PDF como A4, ou seja, 297mm por 210mm
        format: "a4",
    });
}


//funcao que adiciona um template ao PDF
function template(){
    //coloca o input do usuario como um titulo no topo da pagina
    let title = document.getElementById("input").value;
    doc.setFontSize(22);
    doc.text(title, 148.5, 10, 'center');

    //coloca o link do github no canto inferior esquerdo com um fonte menor do que a titulo
    doc.setFontSize(9);
    doc.text("Criado usando codykoinabox.github.io/geradorModulacaoSinais", 0.5, 209);

    //coloca um QR Code levando ao GitHub no canto inferior direito
    doc.addImage("assets/qrCode.png", "PNG", 278.5, 191.5, 18, 18)
}

//funcao que conta quantas imagens existem no HTML, ou seja, quantas "partes" de grafico estao sendo mostradas
function getImages(){
    counter = 0
    for(let i = 1; i <= 80; i++){
        if(document.getElementById("binary"+i).style.display == "inline"){
            counter++;
        }
        else{
            i=81;
        }
    }
}

//funcao que adiciona as imgens (graficos) ao PDF
function addImages(){
    for(let j = 1; j <= counter; j++){
        //pega a source de cada imagem do grafico e salva elas em uma variavel para que a parte do "doc.addImage" fique mais organizada
        let binary = document.getElementById("binary"+j).src;
        let binaryIMG = document.getElementById("binaryIMG"+j).src;
        let amplitudeIMG = document.getElementById("amplitudeIMG"+j).src;
        let frequencyIMG = document.getElementById("frequencyIMG"+i).src;

        //multiplica o tamanho de cada imagen (3.7mm) pelo numero total de imagens ja impressas e soma isso com 0.5mm (a margem entre a primeira imagem e a borda do PDF) para colocar as imagens uma do lado da outra  
        let locationX = 0.5 + j * 3.7;
        let size = 3.7;

        //binary
        doc.addImage(binary, "PNG", locationX, 30, size, size)
        //binary Image
        doc.addImage(binaryIMG, "PNG", locationX, 40, size, size)
        //amplitude
        doc.addImage(amplitudeIMG, "PNG", locationX, 50, size, size)
        //frequency
        doc.addImage(frequencyIMG, "PNG", locationX, 60, size, size)
    }
}

//funcao que salva o PDF no computador do usuario
function savePDF(){
    //coloca o nome do PDF como "ModulacaoDeSinais_INPUT.png" onde INPUT=Input do usuario, alem disso, caso o input contenha espacos, esses serao trocados por _
    let namePDF = "ModulacaoDeSinais_" + document.getElementById("input").value + ".pdf";
    doc.save(namePDF.replace(" ", "_"));
}
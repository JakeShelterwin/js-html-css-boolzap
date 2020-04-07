// Creare in JAVASCRIPT una griglia formata da 8x8 rettangolini tutti vuoti.
// 15 di questi rettangolini (scelti a caso dal programma) se cliccati mostrano dei fiori, gli altri saranno il prato che li circonda. In alto alla griglia creata ci sono i contatori col numero di caselle con fiori cliccate e il numero di caselle prato cliccate.
// In fondo ci sono 2 bottoni: uno mostra termina il gioco mostrando la posizione di tutto, l'altro la mostra e poi resetta la griglia e il punteggio

$(document).ready(function(){

// dichiarazione e inizializzazione variabili che utilizzerò
var appoggoContainer = $(".tablecontainer");
var arrayIndici = [];
// tenere la conta dei fiori trovati o del solo prato
var fioriTrovati = 0, soloPrato = 0;


//genero le celle del documento
for(var i=0; i<64; i++){
  // append() - Inserts content at the end of the selected elements
  appoggoContainer.append("<div class='square'></div>");
  // console.log("quadrato");
}

//La funzione genera un array di 15 valori diversi
function generaArray (){
  for (var i=0; i<15; i++) {
    //genero un numero casuale fra 0 e 63 (quindi 64 potenziali numeri casuali)
    //e lo assegno alla variabile indiceAppoggio
    var indiceAppoggio = Math.floor(Math.random()*64);
    //inArray(valore, array) --> resituisce l'indice di "valore" all'interno dell'array
    //Se ritorna -1 significa che "valore" non è presente nell'array.
    // Quindi con questo if sto dicendo: se il valore non è presente lo aggiungo all"array
    if ($.inArray(indiceAppoggio, arrayIndici)===(-1) ) {
      arrayIndici.push(indiceAppoggio);
      console.log("il numero non c'era");
    } else {
    //nel caso in cui il valore ci fosse, tolgo 1 al contatore del ciclo
    i--;
    console.log("Il numero c'era");
    }
  }
}

//La richiamo, e genero un array di 15 valori diversi
generaArray();

// ordino l'array cosi controllo meglio se ci sono ripetizioni nel successivo consol log di debug
// arrayIndici.sort();
console.log(arrayIndici);

//Creo la funzione con la quale aggiungo a 15 caselle la classe fiore,
//le caselle sono selezionate grazie ai numeri generati casualmente dalle funzioni precedenti
//e salvati dentro l'array "arrayIndici".
function posizionaFiore () {
  for(var i=0; i<15; i++){
    // eq() Reduce the set of matched elements to the one at the specified index.
    //in soldoni: prendimi l'elemento contenuto in arrayIndici che ha indice i
    // e aggiungi la classe fiore all'elemento square corrispondente
    $(".square").eq(arrayIndici[i]).addClass("fiore");
  }
}
//la utilizzo subito
posizionaFiore();


//COMPORTAMENTO CHE I DIV CON LA CLASSE SQUARE TENGONO QUANDO VENGONO CLICCATI
  $('.square').click(
    function () {
      if($(this).hasClass('active')){
        console.log("OH! l'hai già cliccato!");
      } else if($(this).hasClass('fiore')){
        $(this).css('background', 'url("img/fiore.png');
        $(this).css('background-size', 'contain');
        fioriTrovati++;
        $(this).addClass('active');
        // $(this).attr('active', 'vero');
        console.log("Fiori Trovati: " + fioriTrovati);
        $('.pFiori').html("Fiori Trovati: " + fioriTrovati);
      } else {
        $(this).css('background', 'url("img/prato.png');
        soloPrato++;
        $(this).addClass('active');
        console.log("Prato Trovato: " + soloPrato);
        $('.pPrato').html("Prato Trovato: " + soloPrato);
      }
    }
  );


  // GESTISCO IL COMPORTAMENTO DEL BOTTONE PER ABBANDONARE LA PARTITA E MOSTRARE LA SOLUZIONE
  $(".mostraSoluzione").on({
  //quando clicco sul bottone do a ogni cella il background corrispondende mostrando le posizioni
  click: function(){
    $('.square').css('background', 'url("img/prato.png');
    $('.square.fiore').css('background', 'url("img/fiore.png');
    $('.square.fiore').css('background-size', 'contain');
  }
  });

  // GESTISCO IL COMPORTAMENTO DEL BOTTONE PER RICOMINCIARE IL GIOCO
  $(".ricomincia").on({
  //quando clicco sul bottone do a ogni cella il background corrispondende
  mousedown: function(){
    $('.square').css('background', 'url("img/prato.png');
    $('.square.fiore').css('background', 'url("img/fiore.png');
    $('.square.fiore').css('background-size', 'contain');
  },
  //quando rilascio il bottone del mouse resetto il gioco
  mouseup: function(){
    //tolgo a tutti gli square le classi active o fiore se ce l'hanno
    $('.square').removeClass("active fiore");
    //rendo a tutti gli square il background di partenza
    $('.square').css('background', 'url("img/pratoChiaro.png');
    //svuoto l'array cosi che generaArray possa riempirlo di numeri nuovi
    // e posizionaFiore usare quei numeri per posizionare i fiori
    arrayIndici = [];
    generaArray();
    posizionaFiore();
    //azzero i punteggi
    fioriTrovati = 0, soloPrato = 0;
    //e li restituisco in html
    $('.pFiori').html("Fiori Trovati: " + fioriTrovati);
    $('.pPrato').html("Prato Trovato: " + soloPrato);
  }
  });




});

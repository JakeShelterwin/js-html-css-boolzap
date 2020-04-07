// DESCRIZIONE:
// Milestone 1:
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse (quindi tutto statico);
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde (quindi solo quello NON aggiungiamo dinamicamente anche quello bianco di risposta)

$(document).ready(function(){


  // dichiarazione e inizializzazione variabili che utilizzerò
  var inputUtente, chat;
  chat=$(".chatBoard");

  //gestisco cosa succede quando faccio click sull'input della chat
  $(".inputUtente input").on({
  //quando clicco sul bottone do a ogni cella il background corrispondende mostrando le posizioni
  focus: function(){
    //al focus, sostituisco l'icona del microfono con quella dell'aeroplanino
    $(".invia").html("<i class='fas fa-paper-plane'></i> ")
  },

  //test per far riapparire l'icona del microfono quando tolgo il focus ma non funziiona
  //nel modo che volgio io
  // blur: function(){
  //   $(".invia").html("<i class='fas fa-microphone'></i> ")
  // }

  });

  //gestisco cosa succede quando faccio click sul div invia
  $(".invia").on({
  //quando clicco sul bottone do a ogni cella il background corrispondende mostrando le posizioni
  click: compariBolla
  });

  //gestisco cosa succede quando premo il tasto invia sulla selezione .inputUtente input
  $(".inputUtente input").keypress(function(e) {
    // 13 sta a significare il tasto invio, è witch resistuisce il tasto pigiato
    //For key or mouse events, "which" property indicates the specific key or button that was pressed.
    if (e.which == 13) {
      compariBolla();
      $(".invia").html("<i class='fas fa-paper-plane'></i> ")
    }
  });

  //Con questo dico che quando clicco ovunque nel container tranne che nell'input,
  // l'icona deve tornare quella del microfono
  $(".colonnaContatti, .chatUser, .opzioni, .chatBoard, .emoj").on({
  //quando clicco sul bottone do a ogni cella il background corrispondende mostrando le posizioni
  click: function(){
    $(".invia").html("<i class='fas fa-microphone'></i> ");
  }
  });

  //questa funzione inserisce l'input dell'utente ottenuto sopra all'nterno della nuvoletta
  //di whatsapp con tutte le classi associate
  function compariBolla (){
    //prendo dall'html il valore che l'utente ha inserito
    inputUtente=$(".inputUtente input").val();
    //SE l'input dell'utente non è vuoto
    if (inputUtente!==""){
      //recupero l'ora per assegnarla al messaggio inviato
      var data = new Date();
      var time = data.getHours() + ":" + data.getMinutes()
      //aggiungo con append (dunque senza sostituire eventuali elementi precedenti) l'input dell'utente con tutte le classi appropriate
      chat.append( '<div class="messaggio inviato"><p>'+ inputUtente +'</p><span class="orarioMessaggio">'+ time + '<i class="fas fa-check"></i><i class="fas fa-check"></i></span></div>' );
      //azzero il campo input, così che riprenda il valore di placeholder
      inputUtente=$(".inputUtente input").val("");
      //ripristino l'icona del microfono
      $(".invia").html("<i class='fas fa-microphone'></i> ")
    }
    //SE L'INPUT E' VUOTO MI LIMITO A RIPRISTINARE L'ICONA GIUSTA
    else {
      $(".invia").html("<i class='fas fa-microphone'></i> ")
    }
  }

});

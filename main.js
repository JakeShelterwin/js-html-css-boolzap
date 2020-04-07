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
  click: function(){
    //sostituisco l'icona del microfono con quella dell'aeroplanino
    $(".invia").html("<i class='fab fa-telegram-plane'></i> ")
    //svuoto il placeholder appena voglio scriverci
    $(this).attr('placeholder', '')
  }

  });

  //gestisco cosa succede quando faccio click sul tasto invia
  $(".invia").on({
  //quando clicco sul bottone do a ogni cella il background corrispondende mostrando le posizioni
  click: function(){
    // appena ho finito di scrivere, rimetto nel plceholder il testo che voglio
    $(".inputUtente input").attr('placeholder', 'Scrivi un messaggio')
    //prendo dall'html il valore che l'utente ha inserito
    inputUtente=$(".inputUtente input").val();
    //aggiungo con append (dunque senza sostituire eventuali elementi precedenti) l'input dell'utente con tutte le classi appropriate
    chat.append( '<div class="messaggio inviato"><p>'+ inputUtente +'</p><span class="orarioMessaggio">13:30 <i class="fas fa-check"></i><i class="fas fa-check"></i></span></div>' );
    //azzero il campo input
    inputUtente=$(".inputUtente input").val("");
    //ripristino l'icona del microfono
    $(".invia").html("<i class='fas fa-microphone'></i> ")
  }
  });

  // $(".colonnaContatti, .chatUser, .opzioni, .chatBoard ").on({
  // //quando clicco sul bottone do a ogni cella il background corrispondende mostrando le posizioni
  // click: function(){
  //   $(".invia").html("<i class='fas fa-microphone'></i> ")
  // }
  // });
});

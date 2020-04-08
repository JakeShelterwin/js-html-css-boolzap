// DESCRIZIONE:
// Milestone 1:
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse (quindi tutto statico);
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde (quindi solo quello NON aggiungiamo dinamicamente anche quello bianco di risposta)
// Milestone 2:
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

$(document).ready(function(){


  // dichiarazione e inizializzazione variabili che utilizzerò
  var inputUtente, ricercaUtente;
  var chat = $(".chatBoard");
  //recupero l'ora per assegnarla ai messaggi e all'ultimo accesso
  var data = new Date();
  var time = data.getHours() + ":" + data.getMinutes();


  //gestisco cosa succede quando faccio focus e blur sull'input della chat
  $(".inputUtente input").on({
    focus: function(){
      //al focus, sostituisco l'icona del microfono con quella dell'aeroplanino
      $(".invia i").removeClass('fa-microphone').addClass('fa-paper-plane');
    },
    //quando tolgo il focus ripristino l'icona del microfono
    blur: function(){
      $('.invia i').removeClass('fa-paper-plane').addClass('fa-microphone');
    }
  });


  //gestisco cosa succede quando faccio click sul div invia
  $(".invia").on({
    //quando clicco sul div che ha classe "invia" eseguo la funzione inviaMessaggio
    click: inviaMessaggio
  });

  //gestisco cosa succede quando premo il tasto invio sulla selezione .inputUtente input
  $(".inputUtente input").keypress(function(e) {
    // 13 sta a significare il tasto invio, è witch resistuisce il tasto pigiato
    //For key or mouse events, "which" property indicates the specific key or button that was pressed.
    if (e.which == 13) {
      inviaMessaggio();
      $(".invia i").removeClass('fa-microphone').addClass('fa-paper-plane');
    }
  });

  //gestisco cosa succede quando cerco qualcosa nella barra di ricerca
  $(".barraRicerca input").on({
    //gestisco l'evento alla digitazione e richiamo la funziona cercaContatto
    keyup : cercaContatto
  });


  //questa funzione inserisce l'input dell'utente all'interno della nuvoletta di whatsapp
  // con tutte le classi associate, genera la risposta dopo 1 secondo e aggiusta l'interfaccia
  // di conseguenza (stato online, ultimo messaggio nella lista delle chat: aggionato)
  function inviaMessaggio (){
    //prendo dall'html il valore che l'utente ha inserito
    inputUtente=$(".inputUtente input").val();
    //SE l'input dell'utente non è vuoto
    if (inputUtente!==""){
      //aggiungo con append (dunque senza sostituire eventuali elementi precedenti) l'input dell'utente con tutte le classi appropriate
      chat.append( '<div class="messaggio inviato"><p>'+ inputUtente +'</p><span class="orarioMessaggio">'+ time + '<i class="fas fa-check"></i><i class="fas fa-check"></i></span></div>' );
      //azzero il campo input, così che riprenda il valore di placeholder
      inputUtente=$(".inputUtente input").val("");
      //ripristino l'icona del microfono
      $('.invia i').removeClass('fa-paper-plane').addClass('fa-microphone');

      //mentre il mittende risponde indico in alto che lo sta facendo:
      $(".statoENome span").html("Sta scrivendo...");

      //AGGIUNTA RISPOSTA, deve trascorrere 1 secondo dalla comparsa della risposta
      //quindi uso setTimeout e imposto 1000 secondi d'attesa
      setTimeout(riceviMessaggio, 1000);
    }
    //SE L'INPUT E' VUOTO MI LIMITO A RIPRISTINARE L'ICONA GIUSTA
    else {
      $('.invia i').removeClass('fa-paper-plane').addClass('fa-microphone');
    }
  }

  function riceviMessaggio(){
    chat.append( '<div class="messaggio ricevuto"><p>'+ 'ok' +'</p><span class="orarioMessaggio">'+ time + ' <i class="fas fa-share"></i></span></div>' );

    //APPENA INVIATO IL MESSAGGIO IL MITTENTE SI DISCONNETTE, QUINDI AGGIORNO IL SUO L'ULTIMO ACCESSO
    //questo solo per l'utente che mi ha risposto grazie a
    $(".statoENome span").html("Ultimo accesso oggi alle " + time);

    //NELLA LISTA DELLE CHAT INSERISCO L'ULTIMO MESSAGGIO AGGIORNATO per il contatto in cui mi trovo
    $(".contatto.cliccato .ultimoMesChat").html("ok");

  }

  //QUESTA FUNZIONE A PARTIRE DALL'INPUT DELL'UTENTE FILTRA I CONTATTI CHE MATCHANO LA RICERCA
  function cercaContatto(){
    //Salvo la ricerca dell'utente e per evitare problemi metto tutto in lowercase
    ricercaUtente=$(".barraRicerca input").val().toLowerCase();
    if (ricercaUtente!==""){
      $(".contatto").each(function() {
        //.find( selector ) Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
        // .find(selettore) trova i discendenti (col selettore) di ciascun elemento individuato
        //includes è caseSensitive allora metto i nomi tutti in lowerCase
        var nomeOriginario=$(this).find(".nomeContatto").text().toLowerCase();
        // stringa1.includes(stringa2) --> rende true se stringa2 è contenuta in stringa1
        if ((nomeOriginario).includes(ricercaUtente)) {
          $(this).show();
        }
        else{
          $(this).hide();
        }
      });
    }
    //SE L'INPUT E' VUOTO, posso mostrare tutto
    else {
      $(".contatto").show();
    }
  }

});

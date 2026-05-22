let giochi = [{
    titolo: 'Clash of Clans',
    produttore: 'SuperCell',
    genere: 'MMO',
    stato: 'Giocato'
},
{
    titolo: 'Rush Royale',
    produttore: 'SuperCell',
    genere: 'Mena Menz',
    stato: 'Giocato'
},
{
    titolo: 'Brawl Stars',
    produttore: 'SuperCell',
    genere: 'MMO',
    stato: 'Da giocare'
},
{
    titolo: 'BlockBust',
    produttore: 'SuperCell',
    genere: 'RPG',
    stato: 'Nuovo Gioco'
},
{
    titolo: 'Sudoku',
    produttore: 'Sudoku.com',
    genere: 'Tavola',
    stato: 'Da giocare'
}];


let filtroCorrente = '';
let ordinamentoCorrente = '';
let ricercaCorrente = '';
const inizio = document.querySelector('#inizio');
const aggiungi = document.querySelector('#aggiungi');
const cerca = document.querySelector('#cerca');
const contatore = document.querySelector('#contatore');
const lista = document.querySelector('#lista');
const titoloInput = document.querySelector('#titoloGioco');
const produttoreInput = document.querySelector('#produttore');
const genereInput = document.querySelector('#genere');
const statoInput = document.querySelector('#stato')
const filtroStato = document.querySelector('#filtroStato');
const filtroOrdine = document.querySelector('#filtroOrdine');
const darkModeBtn = document.querySelector('#darkModeBtn');
const totale = document.querySelector('#totale');
const giocati = document.querySelector('#giocati');
const daGiocare = document.querySelector('#daGiocare');
const progressBar = document.querySelector('#progressBar');

render();

/* RENDER()
   Una sola funzione che ridipinge la lista. A ogni chiamata:
   1) parte dall'array completo,
   2) filtra,
   3) ordina,
   4) svuota il container DOM,
   5) ricrea gli elementi DOM per gli oggetti risultanti.
   Aggiorna anche conteggi e statistiche.
   Salva lo stato in localStorage in fondo a render() (cerca tu come funziona).
*/

/* SCRIVI QUI LA TUA RISPOSTA */
aggiungi.addEventListener('submit', (event) => {
    event.preventDefault();
    const nuovoGioco = {
        titolo: titoloInput.value,
        produttore: produttoreInput.value,
        genere: genereInput.value,
        stato: statoInput.value
    };
    giochi.push(nuovoGioco);
    titoloInput.value = '',
    produttoreInput.value = '',
    genereInput.value = '',
    statoInput.value = 'Nuovo gioco'
    render();
});

filtroStato.addEventListener('change', () => {
    render();
});

filtroOrdine.addEventListener('change', () => {
    render();
});

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('darkMode');
})

function render() {
    lista.textContent = '';
    const giochiFiltrati = giochi.filter((gioco) => {
        if (filtroStato.value === 'Tutti') {
            return true;
        }
        return gioco.stato === filtroStato.value;
    });
    if (filtroOrdine.value === 'a-z') {
        giochiFiltrati.sort((a, b) => {
            return a.titolo.localeCompare(b.titolo)
        });
    }
    if (filtroOrdine.value === 'z-a') {
        giochiFiltrati.sort((a, b) => {
            return b.titolo.localeCompare(a.titolo);
        })
    }
    {
        if (filtroOrdine.value === 'produttore') {
            giochiFiltrati.sort((a, b) => {
                return a.produttore.localeCompare(b.produttore);
            })
        }
    }
    totale.textContent = giochi.length;
    const giochiGiocati = giochi.filter((gioco) => {
        return gioco.stato === 'Giocato';
    });
    const giochiDaGiocare = giochi.filter((gioco) => {
        return gioco.stato === 'Da giocare';
    });
    daGiocare.textContent = giochiDaGiocare.length;
giochiFiltrati.forEach((gioco) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const titolo = document.createElement('h3');
    titolo.textContent = gioco.titolo;
    const sottoTitolo = document.createElement('p');
    sottoTitolo.textContent = `${gioco.produttore} - ${gioco.genere}`;
    const badge = document.createElement('span');
    badge.textContent = gioco.stato;
    if (gioco.stato === 'Giocato') {
        badge.classList.add('giocato')
    } else if (gioco.stato === 'Da giocare') {
        badge.classList.add('daGiocare');
    } else {
        badge.classList.add('nuovoGioco');
    }
    //bottoni
    const statoGioco = document.createElement('button');
    statoGioco.textContent = gioco.stato;
    statoGioco.addEventListener('click', () => {
        if (gioco.stato === 'Da giocare') {
            gioco.stato = 'Giocato';
        } else {
            gioco.stato = 'Da giocare';
        }
        render();
    });
    statoGioco.classList.add('statoGioco')
    const modifica = document.createElement('button');
    modifica.textContent = 'Modifica';
    modifica.classList.add('modificaBtn');
    modifica.addEventListener('click', () => {
        const inputTitolo = document.createElement('input');
        inputTitolo.value = gioco.titolo;
        const inputSottoTitolo = document.createElement('input');
        inputSottoTitolo.value = `${gioco.produttore} - ${gioco.genere}`;
        inputTitolo.classList.add('inputModifica');
        inputSottoTitolo.classList.add('inputModificaDue');
        card.replaceChild(inputTitolo, titolo);
        card.replaceChild(inputSottoTitolo, sottoTitolo);
        inputTitolo.addEventListener('blur', () => {
            gioco.titolo = inputTitolo.value;
        });
        inputTitolo.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                gioco.titolo = inputTitolo.value;
            }
        });
        inputSottoTitolo.addEventListener('blur', () => {
            const parti = inputSottoTitolo.value.split('-');
            gioco.produttore = parti[0].trim();
            gioco.genere = parti[1].trim();
            render();
        })
        inputSottoTitolo.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const parti = inputSottoTitolo.value.split('-');
                gioco.produttore = parti[0].trim();
                gioco.genere = parti[1].trim();
                render();
            }
        });
        inputTitolo.focus();
    })
    const elimina = document.createElement('button');
    elimina.textContent = 'Elimina';
    elimina.classList.add('eliminaBtn');
    elimina.addEventListener('click', () => {
        const btnElimina = giochi.indexOf(gioco);
        giochi.splice(btnElimina, 1);
        render();
    });
    //append
    card.appendChild(elimina);
    card.appendChild(modifica);
    card.appendChild(statoGioco);
    card.appendChild(badge);
    card.appendChild(titolo);
    card.appendChild(sottoTitolo);
    lista.appendChild(card);
});
}





/* FORM CON VALIDAZIONE
   addEventListener("submit") sul form.
   event.preventDefault().
   Leggi i valori con .value.trim().
   Se uno dei campi obbligatori e' vuoto, mostra errore e return.
   Altrimenti push allo stato, form.reset(), render().
   Id univoco con Date.now().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* INTERAZIONI BASE — eliminare, modificare, contare
   - Elimina: filter per id, render(). Event delegation sul container.
   - Modifica in-place: button "Modifica". Al click il testo diventa <input>,
     si conferma con Invio o blur.
   - Conteggi dinamici dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* RICERCA, FILTRO, ORDINAMENTO
   - Ricerca live: <input> con event "input". Salva in stato e render().
   - Filtro: <select> con event "change". Salva in stato e render().
   - Ordinamento: due button (o select). Salva in stato e render().
   I tre si compongono dentro render() in fila.
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* NOTIFICHE TEMPORANEE
   Funzione notifica(testo) che imposta il testo del <div id="notifica">,
   lo mostra (display: block), poi dopo 3000ms (setTimeout) lo nasconde.
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* TEMA CHIARO/SCURO
   Un button che chiama document.body.classList.toggle("dark").
   In CSS scrivi le regole opposte (es. body.dark { background: #111; ... }).
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* PERSISTENZA — localStorage (cerca tu su MDN)
   - In fondo a render(), salva lo stato:
       localStorage.setItem("dati", JSON.stringify(stato));
   - All'avvio, prima della prima render(), carica:
       const salvato = localStorage.getItem("dati");
       if (salvato) stato = JSON.parse(salvato);
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* RIORDINO ↑ ↓
   Due button su ogni elemento. Click su ↑ scambia con il precedente nell'array,
   ↓ con il successivo. Event delegation. Poi render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* ESPORTAZIONE / IMPORTAZIONE JSON (cerca tu su MDN)
   - Esporta: crea un Blob con JSON.stringify(stato), genera un URL con
     URL.createObjectURL e simula il click su un <a download>.
   - Importa: <input type="file"> + FileReader per leggere il contenuto come
     testo, JSON.parse, sostituisci lo stato, render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* STATISTICHE GRAFICHE
   Almeno due indicatori: contatori grandi e/o barre orizzontali
   (<div> con width: X% in base al dato). Aggiorna dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* MULTI-VISTA — lista / card / tabella
   Una variabile globale "vista" che render() legge per decidere quale HTML
   produrre. Tre button cambiano "vista" e chiamano render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* CATEGORIE
   Aggiungi un campo categoria nello schema. Nel form un <select> per sceglierla.
   In render(), raggruppa con reduce in { categoria: [elementi] } e disegna un
   header per categoria con sotto la lista di quella categoria.
*/

/* SCRIVI QUI LA TUA RISPOSTA */
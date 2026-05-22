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
const percentualeTesto = document.querySelector('#percentualeTesto');
const cercaInput = document.querySelector('#ricerca');
const notifica = document.querySelector('#notifica');
const formGioco = document.querySelector('#formGioco');
const erroreForm = document.querySelector('#errorForm');

render();

formGioco.addEventListener('submit', (event) => {
    event.preventDefault();
    if (
        titoloInput.value.trim() === '' ||
        produttoreInput.value.trim() === '' ||
        genereInput.value.trim() === ''
    ) {
        erroreForm.textContent = 'Compila tutti i campi!';
        return;
    }
    erroreForm.textContent = '';
    const nuovoGioco = {
        titolo: titoloInput.value,
        produttore: produttoreInput.value,
        genere: genereInput.value,
        stato: statoInput.value
    };
    giochi.push(nuovoGioco);
    mostraNotifica('Gioco aggiunto!');
    titoloInput.value = '';
    produttoreInput.value = '';
    genereInput.value = '';
    statoInput.value = 'Nuovo gioco';
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
});

cercaInput.addEventListener('input', () => {
    render();
});

function render() {
    lista.textContent = '';
    const giochiFiltrati = giochi.filter((gioco) => {
        const matchStato = filtroStato.value === 'Tutti' || gioco.stato === filtroStato.value;
        const matchRicerca = gioco.titolo.toLowerCase().includes(cercaInput.value.toLowerCase()) || gioco.produttore.toLowerCase().includes(cercaInput.value.toLowerCase());
        return matchStato && matchRicerca;
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
    giocati.textContent = giochiGiocati.length;
    const giochiDaGiocare = giochi.filter((gioco) => {
        return gioco.stato === 'Da giocare';
    });
    daGiocare.textContent = giochiDaGiocare.length;
    const totaleGiochi = giochi.length;

    const tot = giochi.length;
    const giocatiTot = giochi.filter((gioco) => {
        return gioco.stato === 'Giocato';
    }).length;
    const percentuale = tot === 0 ? 0 : Math.round((giocatiTot / tot) * 100);
    progressBar.style.width = percentuale + '%';
    percentualeTesto.textContent = percentuale + '%';
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
            mostraNotifica('Stato aggiornato!');
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
            mostraNotifica('Modifica effettuata!');
        })
        const elimina = document.createElement('button');
        elimina.textContent = 'Elimina';
        elimina.classList.add('eliminaBtn');
        elimina.addEventListener('click', () => {
            const btnElimina = giochi.indexOf(gioco);
            giochi.splice(btnElimina, 1);
            render();
            mostraNotifica('Gioco eliminato!');
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

function mostraNotifica(testo) {

    notifica.textContent = testo;

    notifica.style.display = 'block';

    setTimeout(() => {
        notifica.style.display = 'none';
    }, 3000);
}



/* FORM CON VALIDAZIONE
   addEventListener("submit") sul form.
   event.preventDefault().
   Leggi i valori con .value.trim().
   Se uno dei campi obbligatori e' vuoto, mostra errore e return.
   Altrimenti push allo stato, form.reset(), render().
   Id univoco con Date.now().
*/

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




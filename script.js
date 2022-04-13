/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const selezioni = [];

const rispostePossibili = document.querySelectorAll('.risposta');

//chiamo le funzioni per ogni questionId
for(let i of rispostePossibili){
        if(i.dataset.questionId==='one'){
                i.addEventListener('click', selezionaRisposta1);
        }
        if(i.dataset.questionId==='two'){
                i.addEventListener('click', selezionaRisposta2);
        }
        if(i.dataset.questionId==='three'){
                i.addEventListener('click', selezionaRisposta3);
        }
}

function selezionaRisposta1(event){

        selezioni[event.currentTarget.dataset.questionId]=event.currentTarget.dataset.choiceId; //salvo le risposte in questa lista
        //console.log(selezioni);

        //seleziono la risposta (metto il box azzurro e il checked)
        const click=event.currentTarget;
        click.classList.add('rispostaSelezionata');
        click.querySelector('.checkbox').src='./images/checked.png';

        for(let i of rispostePossibili){
                if((i.dataset.choiceId !== click.dataset.choiceId)&& (i.dataset.questionId===click.dataset.questionId)){
                        //metto la trasparenza in tutte le immagini dove non clicco
                        let overlay = i.querySelector('.overlay');
                        overlay.classList.remove('hidden');

                        //cambio risposta
                        i.classList.remove('rispostaSelezionata');
                        let imgCheckbox=i.querySelector('.checkbox');
                        imgCheckbox.src='./images/unchecked.png';
                        let overlay2=click.querySelector('.overlay');
                        overlay2.classList.add('hidden');  
                }
        }
        controllo();
}

function selezionaRisposta2(event){

        selezioni[event.currentTarget.dataset.questionId]=event.currentTarget.dataset.choiceId;
        //console.log(selezioni);

        const click=event.currentTarget;
        click.classList.add('rispostaSelezionata');
        click.querySelector('.checkbox').src='./images/checked.png';

        for(let i of rispostePossibili){
                if((i.dataset.choiceId !== click.dataset.choiceId)&& (i.dataset.questionId===click.dataset.questionId)){

                        let overlay = i.querySelector('.overlay');
                        overlay.classList.remove('hidden');
                        
                        i.classList.remove('rispostaSelezionata');
                        let imgCheckbox=i.querySelector('.checkbox');
                        imgCheckbox.src='./images/unchecked.png';
                        let overlay2=click.querySelector('.overlay');
                        overlay2.classList.add('hidden');  
                }
        }
        controllo();
}

function selezionaRisposta3(event){

        selezioni[event.currentTarget.dataset.questionId]=event.currentTarget.dataset.choiceId;
        //console.log(selezioni);

        const click=event.currentTarget;
        click.classList.add('rispostaSelezionata');
        click.querySelector('.checkbox').src='./images/checked.png';

        for(let i of rispostePossibili){
                if((i.dataset.choiceId !== click.dataset.choiceId)&& (i.dataset.questionId===click.dataset.questionId)){

                        let overlay = i.querySelector('.overlay');
                        overlay.classList.remove('hidden');
                        
                        i.classList.remove('rispostaSelezionata');
                        let imgCheckbox=i.querySelector('.checkbox');
                        imgCheckbox.src='./images/unchecked.png';
                        let overlay2=click.querySelector('.overlay');
                        overlay2.classList.add('hidden');    
                }
        }
        controllo();
}

//funzione che controlla se ho dato 3 risposte
function controllo(){
        let count=0;
        for(let i in selezioni){
                count++;
        }
        if(count==3){
                for(const j of rispostePossibili){
                        j.removeEventListener('click', selezionaRisposta1);
                        j.removeEventListener('click', selezionaRisposta2);
                        j.removeEventListener('click', selezionaRisposta3);
                }
                mostraRisultato();
        }
        
}

//funzione che mi dice quale risposta andra' a scegliere in base all'ordine di selezione o di frequenza di una risposta
function condizioni(){
        if((selezioni.one === selezioni.two) || (selezioni.one === selezioni.three)){
                return selezioni.one;
        }
        if((selezioni.two === selezioni.one) || (selezioni.two === selezioni.three)){
                return selezioni.two;
        }
        if((selezioni.three===selezioni.one) || (selezioni.three===selezioni.two)){
                return selezioni.three;
        }else{
                return selezioni.one;
        }

}

//funzione che fa apparire il risultato
function mostraRisultato(){
        const risultato = condizioni();
        const res=document.querySelector('#results');

        const title=RESULTS_MAP[risultato].title;
        const contents=RESULTS_MAP[risultato].contents;

        res.querySelector('#title').textContent=title;
        res.querySelector('#description').textContent=contents;
        res.classList.remove('hidden');
    
        //metto la possibilità di resettare il test
        const pulsante = document.querySelector('#button');
        pulsante.addEventListener('click', ricominciaQuiz);
    }
    

//funzione per resettare tutto
function ricominciaQuiz(event){

        //svuoto la lista
        delete selezioni.one;
        delete selezioni.two;
        delete selezioni.three;

        //faccio scomparire la risposta
        const risultato=document.querySelector('#results');
        risultato.classList.add('hidden');

        for(let i of rispostePossibili){
                //rimuovo tutte cose dalle immagini (come se si fosse resettato tutto effettivamente)
                i.querySelector('.overlay').classList.add('hidden');
                i.classList.remove('rispostaSelezionata');
                i.querySelector('.checkbox').src='./images/unchecked.png';

                //richiamo le funzioni per rifare il test
                if(i.dataset.questionId === "one"){             
                        i.addEventListener('click',selezionaRisposta1);
                }
                if(i.dataset.questionId === "two"){ 
                        i.addEventListener('click',selezionaRisposta2);            
                }
                if(i.dataset.questionId === "three"){
                        i.addEventListener('click',selezionaRisposta3);  
                }
        }
}
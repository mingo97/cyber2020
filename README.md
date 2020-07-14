# Guida d'utilizzo
### Progetto Software Cybersecurity a.a 2019/2020
##### Fratini - Mezzanotti - Miccoli - Pantalone
.
> Descrizione dei passaggi da eseguire per l'installazione e il test del progetto.


## Installazione Quorum Wizard
 Seguire le istruzioni del seguente link per ottenere una blockchain privata con 3 nodi: https://docs.goquorum.com/en/latest/Wizard/GettingStarted/
 
 Verificare il suo corretto funzionamento con l'esempio al seguente link: https://docs.goquorum.com/en/latest/Wizard/Interacting/
 
 ## Installazioni pacchetti npm
 Scaricare **Node.js** seguendo la seguente guida: https://www.npmjs.com/get-npm
 Per il funzionamento del software è necessario installare i seguenti pacchetti:
 ```zsh 
 $ npm install image-hash
 $ npm install crypto
 $ npm install readline
 $ npm install web3
 ```
 
 ## Avvio del progetto
 Entrare da terminale nella cartella creata da Quorum Wizard e lanciare lo script di avvio:
 ```zsh 
 $ cd network/3-nodes-raft-tessera-bash
 $ ./start.sh
 ```
 Se l'operazione ha esito positivo, entrare nel **Nodo 1** :
 ```zsh 
 $ ./attach.sh 1
 ```
Il nodo 1 si presenta con una console JavaScript Geth. Va ora eseguito il **deploy** dello smart contract:
 ```zsh 
 > loadScript("script_smartContract_hash.js")
 ```
 
 **NOTA:** Non chiudere il terminale del nodo 1 durante l'esecuzione.
 Si ha esito positivo se il contratto viene minato e se gli viene assegnato un **address**. Si può vedere, eseguendo il comando *smartContract*, quali sono gli attributi e i metodi del contratto stesso.
 
Copiare l'**address** ottenuto e sostituire questo all'interno del file *transazione.js* nel campo:
```js 
 var address = "indirizzo del contratto"
 ```
 Ora è stato eseguito il **deploy** del contratto e settato lo script per comunicare con esso da una console esterna al nodo stesso.
 
  ## Test del progetto
  Mantenedo il terminale da cui è stato fatto il loadScript aperto, aprirne uno nuovo per testare la scrittura e lettura di transazioni sulla blockchain.
  Il primo passo è quello di calcolare l'hash delle misure e quello dell'immagine. In questo repository sono presenti un'immagine formato JPG e un file di testo contenente delle misure.
  Con il seguente comando, si esegue lo script per l'hash il quale crea due file di testo contenenti i due codici:
 ```zsh 
 $ node hash_calculate.js
 ```
 Il terminale richiederà di inserire il percorso delle misure e delle immagini:
 ```zsh 
 Inserire il percorso delle misure: misure.txt
 Inserire il percorso delle immagini: ./1.JPG
 ```
 Una volta terminata l'esecuzione verificare la presenza dei due file di testo sopra descritti.
 Il passo successivo è quello di collegarsi con la blockchain e di scrivere gli hash appena calcolati su di essa:
  ```zsh 
 $ node transazione.js
 ```
 Per verificare l'effettiva scrittura si hanno due strade:
 1) Dalla console Javascript Geth del nodo 1 con il seguente comando:
  ```zsh 
 > smartContract.getImageByID(1)
 ```
 2) Aprire il file *transazione.js* e commentare la riga di codice relativa alla scrittura e togliere il commento da quella relativa alla lettura, come nell'esempio seguente:
 ```js 
 // Scrittura transazione

// console.log("Hash immagine: " + Hash_Imm);
// console.log("Hash misure: " + Hash_Mis);
// contract.methods.addImage(Hash_Imm,Hash_Mis).send({from:account})


// Lettura transazione. 
// Il metodo getImageByID ha come parametro l'indice della transazione che si vuole visualizzare.

contract.methods.getImageByID(1).call((err, result) => {console.log(result)})
 ```
 
### Note sul test
Per costruzione dello smart contract, solo colui che compie il deploy del contratto (OWNER) è in grado di scrivere su blockchain. Tutti gli altri nodi possono solo leggere le transazioni. Per provare questa caratteristica, commentare come in seguito le seguenti righe di codice all'interno del file *transazione.js*:
```zsh 
// NODO 1
// const rpcURL = "http://localhost:22000"
// const account = "0xed9d02e382b34818e88b88a309c7fe71e65f419d"

// NODO 2
const rpcURL = "http://localhost:22001"
const account = "xca843569e3427144cead5e4d5999a3d0ccf92b8e"
 ```
 Con il comando:
  ```zsh 
 $ node transazione.js
 ```
 Si può notare come, cambiando l'indirizzo del nodo e il corrispettivo account, questo, se diverso da colui che ha fatto il deploy, può solo leggere le transazioni non scriverle.
 
 ## Chiusura del progetto
 Lanciando il comando:
 ```zsh 
 $ ./stop.sh
 ```
 si terminano tutti i processi relativi ai 3 nodi.

 
  
 

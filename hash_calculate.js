/*
    File JavaScript per il calcolo dei codici hash.
    
    Progetto di Cybersecurity - UNIVPM
    a.a. 2019\2020
    
    Fratini-Mezzanotti-Miccoli-Pantalone

*/

var { imageHash }= require('image-hash');
var fs = require('fs');
var crypto = require('crypto');
const readline = require('readline');

let Hash_Imm;
let Hash_Mis;
const question = (str) => new Promise(resolve => rl.question(str, resolve));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const step = {
    
    start: async () => {
        return step.percorso();	
    },
    
    percorso: async () => {
        const percorsoMis = await question("Inserisci il percorso delle misure: ");
        const percorsoImm = await question("Inserisci il percorso delle immagini: ");
        
        // Metodo Hash per il file .txt
        fs.createReadStream(percorsoMis).
        pipe(crypto.createHash('sha256').
        setEncoding('hex')).
        on('finish', function () {
            Hash_Mis = (this.read()) 
	        //console.log('var hashMis = "' + Hash_Mis + '";')
            
            // Scrittura su file
            fs.writeFile('hashMis.txt', Hash_Mis, function (err) {
                if (err) throw err;
                console.log('Hash misure salvata!');
            });
        });
        
        // Metodo Hash per il file .JPG
        imageHash(percorsoImm, 16, true, (error, data) => {
            if (error) throw error; 
            Hash_Imm = (data); 
            //console.log('var hashImm = "' + Hash_Imm + '";');
        
            // Scrittura su file
            fs.writeFile('hashImm.txt', Hash_Imm, function (err) {
                if (err) throw err;
                console.log('Hash immagine salvata!');
            });
        });
        return step.end();	
    },
    
    end: async () => {
        rl.close();
    },
};

//Invocazione della routine
step.start(); 
/*
    File JavaScript per la lettura e scrittura di transazioni su block chain.
    
    Progetto di Cybersecurity - UNIVPM
    a.a. 2019\2020
    
    Fratini-Mezzanotti-Miccoli-Pantalone

*/

var fs = require('fs');
const readline = require('readline');      
const Web3 = require('web3')

// Lettura sincrona dei due file contenenti i codici hash

var Hash_Imm = fs.readFileSync('hashImm.txt', 'utf8');
var Hash_Mis = fs.readFileSync('hashMis.txt', 'utf8');

// NODO 1
const rpcURL = "http://localhost:22000"
const account = "0xed9d02e382b34818e88b88a309c7fe71e65f419d"

// NODO 2
//const rpcURL = "http://localhost:22001"
//const account = "xca843569e3427144cead5e4d5999a3d0ccf92b8e"

const web3 = new Web3(rpcURL)

// Collegamento al contratto
var abiString = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_hash_immagine","type":"string"},{"internalType":"string","name":"_hash_misure","type":"string"}],"name":"addImage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"constant": "true","inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"getImageByID","outputs":[{"internalType":"string","name":"result","type":"string"}],"payable":"false","type":"function"},{"inputs":[],"name":"imageCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"images","outputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_hash_immagine","type":"string"},{"internalType":"string","name":"_hash_misure","type":"string"}],"stateMutability":"view","type":"function"}];

// Indirizzo del contratto. Va aggiornato ogni volta si fa il deploy.
var address = "0xf380286a425fe5107ad8d755e407317c6e965ad2"

const contract = new web3.eth.Contract(abiString, address)

// Scrittura transazione

console.log("Hash immagine: " + Hash_Imm);
console.log("Hash misure: " + Hash_Mis);
contract.methods.addImage(Hash_Imm,Hash_Mis).send({from:account})


// Lettura transazione. 
// Il metodo getImageByID ha come parametro l'indice della transazione che si vuole visualizzare.

//contract.methods.getImageByID(2).call((err, result) => {console.log(result)})
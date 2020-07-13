pragma solidity >=0.4.0 <0.7.0;

contract hash_mapping{

    uint256 public imageCount;
    mapping(uint256 => Image) public images;
    address DirettoreLavori;

    modifier onlyOwner() {
        require(msg.sender == DirettoreLavori); 
        _;
    }
    
    constructor() public {
        DirettoreLavori = msg.sender;
    }
    
    struct Image {
        uint _id;
        string _hash_immagine;
        string _hash_misure;
    }
        
    function addImage(string memory _hash_immagine, string memory _hash_misure) public onlyOwner {
        contaImmagine();
        images[imageCount] = Image(imageCount, _hash_immagine, _hash_misure);
    }
    
    function contaImmagine() internal{
        imageCount +=1; 
    }

    function getImageByID(uint256 ID) view public returns (string memory result) {
        return string(abi.encodePacked(images[ID]._hash_immagine," ", images[ID]._hash_misure)); 
    }  
}
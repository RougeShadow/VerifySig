// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;



contract VerifySignature {

    function getMessageHash(
        string memory _message
    ) public pure returns (bytes32) {
       bytes32 hashedMessage = keccak256(abi.encodePacked(_message));
       return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",hashedMessage));
    }


    
    function verify(
        address _signer,
        string memory _message,
        bytes memory signature
    ) public pure returns (bool) {
        bytes32 messageHash = getMessageHash(_message);
        

        return recoverSigner(messageHash, signature) == _signer;
    }

    function recoverSigner(bytes32 _MessageHash, bytes memory _signature)
        public
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_MessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "invalid signature length");

        assembly {
            
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

    }
}


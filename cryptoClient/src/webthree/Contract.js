

const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contractAddress = "0xB9C6cb0aC9402351C44d87cD24952D0F5DEDEdDB";

export { contractABI, contractAddress }


// imp = `if (contractInstance) {
//           try {
//             const fromAddress = "0xd725b712bddc22f819fb939e178d95c23553945a"; // Replace with your sender's address
//             const toAddress = "0x77242ac46071626d4F7f3f14bB7CA85B1DEfFCF8"; // Replace with the recipient's address
            
//             const tx = await web3.eth.sendTransaction({
//               from: fromAddress,
//               to: toAddress,
//               value: web3.utils.toWei('0.1', 'ether'), // 0.1 ETH in Wei
//               gas: 300000 // You can increase the gas limit if needed
//             });
          
//             console.log("✅ Transfer successful!", tx);
//             alert("Transfer successful!");
//           } catch (error) {
//             console.error("Error making transfer:", error);
//             alert("Transfer failed!");
//           }
          
          
//         };`
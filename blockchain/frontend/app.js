document.addEventListener('DOMContentLoaded', async () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    await ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);

    // Set the default account to the first account in MetaMask
    const accounts = await web3.eth.getAccounts();
    document.getElementById('account').innerText = accounts[0];

    // Fetch ABI and contract address from JSON
    const response = await fetch('../build/contracts/SmartOdometer.json');
    const SmartOdometer = await response.json();
    const abi = SmartOdometer.abi;
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SmartOdometer.networks[networkId];
    const contractAddress = deployedNetwork && deployedNetwork.address;

    if (!contractAddress) {
      alert('SmartOdometer contract not deployed to detected network.');
      return;
    }

    // Create contract instance
    const smartOdometer = new web3.eth.Contract(abi, contractAddress);

    // Add vehicle function
    window.addVehicle = async function() {
      const vin = document.getElementById('vin').value;
      const make = document.getElementById('make').value;
      const model = document.getElementById('model').value;
      const year = parseInt(document.getElementById('year').value);
      const mileage = parseInt(document.getElementById('mileage').value);
      const owner = accounts[0];

      try {
        await smartOdometer.methods.addVehicle(vin, make, model, year, mileage).send({ from: owner });
        alert('Vehicle added successfully!');
      } catch (error) {
        console.error('Error adding vehicle:', error);
        alert('Failed to add vehicle.');
      }
    };

    // Fetch vehicle function
    window.fetchVehicle = async function() {
      const vin = document.getElementById('fetchVin').value;

      try {
        const vehicle = await smartOdometer.methods.fetchVehicle(vin).call();
        document.getElementById('vehicleDetails').innerText = `
          VIN: ${vehicle[0]}
          Make: ${vehicle[1]}
          Model: ${vehicle[2]}
          Year: ${vehicle[3]}
          Mileage: ${vehicle[4]}
          Owner: ${vehicle[5]}
        `;
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        alert('Failed to fetch vehicle.');
      }
    };

    // Update vehicle function
    window.updateVehicle = async function() {
      const vin = document.getElementById('updateVin').value;
      const make = document.getElementById('updateMake').value;
      const model = document.getElementById('updateModel').value;
      const year = parseInt(document.getElementById('updateYear').value);
      const mileage = parseInt(document.getElementById('updateMileage').value);
      const owner = accounts[0];

      try {
        await smartOdometer.methods.updateVehicle(vin, make, model, year, mileage).send({ from: owner });
        alert('Vehicle updated successfully!');
      } catch (error) {
        console.error('Error updating vehicle:', error);
        alert('Failed to update vehicle.');
      }
    };

    // Attach event listeners
    document.getElementById('addVehicle').addEventListener('click', window.addVehicle);
    document.getElementById('fetchVehicle').addEventListener('click', window.fetchVehicle);
    document.getElementById('updateVehicle').addEventListener('click', window.updateVehicle);

  } else {
    alert('MetaMask is not installed. Please install MetaMask to use this app.');
  }
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartOdometer {
    // Define a struct to hold vehicle information
    struct Vehicle {
        string vin; // Vehicle Identification Number
        string make;
        string model;
        uint year;
        uint mileage;
        address owner;
    }

    // Mapping from VIN to Vehicle
    mapping(string => Vehicle) private vehicles;

    // Events for adding and updating vehicles
    event VehicleAdded(string vin, string make, string model, uint year, uint mileage, address owner);
    event VehicleUpdated(string vin, string make, string model, uint year, uint mileage, address owner);

    // Modifier to check if the caller is the owner of the vehicle
    modifier onlyOwner(string memory vin) {
        require(vehicles[vin].owner == msg.sender, "Caller is not the owner of the vehicle");
        _;
    }

    // Function to add a new vehicle
    function addVehicle(
        string memory vin,
        string memory make,
        string memory model,
        uint year,
        uint mileage
    ) public {
        require(bytes(vehicles[vin].vin).length == 0, "Vehicle with this VIN already exists");

        vehicles[vin] = Vehicle({
            vin: vin,
            make: make,
            model: model,
            year: year,
            mileage: mileage,
            owner: msg.sender
        });

        emit VehicleAdded(vin, make, model, year, mileage, msg.sender);
    }

    // Function to update vehicle data
    function updateVehicle(
        string memory vin,
        string memory make,
        string memory model,
        uint year,
        uint mileage
    ) public onlyOwner(vin) {
        require(bytes(vehicles[vin].vin).length != 0, "Vehicle with this VIN does not exist");

        vehicles[vin].make = make;
        vehicles[vin].model = model;
        vehicles[vin].year = year;
        vehicles[vin].mileage = mileage;

        emit VehicleUpdated(vin, make, model, year, mileage, msg.sender);
    }

    // Function to fetch vehicle data
    function fetchVehicle(string memory vin) public view returns (string memory, string memory, string memory, uint, uint, address) {
        require(bytes(vehicles[vin].vin).length != 0, "Vehicle with this VIN does not exist");

        Vehicle memory v = vehicles[vin];
        return (v.vin, v.make, v.model, v.year, v.mileage, v.owner);
    }
}

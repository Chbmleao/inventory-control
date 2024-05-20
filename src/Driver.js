import "./Exceptions.js"

class InfractionRegister {
    constructor(id) {
        this.id = id
    }
}

class Contract {
    constructor(driverId, clientId, dateBegin, dateEnd){
        
        if (dateBegin > dateEnd)
            throw ValidationError("Beginning date is posterior to ending date")
        if (driverId == clientId)
            throw ValidationError("Driver and Client Ids cannot be the same")
        
        this.dateBegin = dateBegin
        this.dateEnd = dateEnd
        this.driverId = driverId;
        this.clientId = clientId;
    }

    get timeFrame() {
        return (this.dateBegin, this.dateEnd)
    }

}

class Driver {
    constructor(
        id,
        name,
        birthday,
        // license,
        infractions = null,
    ){
        this.id = id
        this.name = name
        this.birthday = birthday
        this.contractsFinished = []
        this.contractsActive = []

        if (infractions == null)
            this.infractions = new InfractionRegister(this.id)
        else
            this.infractions = infractions
    }
    
    makeNewContract(clientId, dateBegin, dateEnd) {
        let contract = new Contract(this.id, clientId, dateBegin, dateEnd)

        if (false == this.isContractPossible(contract))
            throw new ValidationError("Contract cannot be created due to time colision with an already active contract")

        this.contractsActive.push(contract)
        return contract
    }

    isContractPossible(contract) {
        let timeFrame = contract.timeFrame()

        for (active in this.contractsActive) {
            let activeTimeFrame = active.timeFrame()
                                                                   // Time frame colision
            if( activeTimeFrame.dateBegin < timeFrame.dateBegin && // Active (..xxxx)
                activeTimeFrame.dateEnd   > timeFrame.dateBegin){  // New      (xxxx....) 
                return false
            }
                                                                   // Time frame colision
            if( activeTimeFrame.dateBegin > timeFrame.dateBegin && // Active   (xxxx....) 
                activeTimeFrame.dateBegin < timeFrame.dateEnd){    // New    (..xxxx)
                return false
            }
        }

        return true
    }
}

let driver = new Driver(123, "Alberto", "01/02/1995")
// driver.makeNewContract(123, 123, 0, 100)
// driver.makeNewContract(123, 321, 0, 100)
// driver.makeNewContract(123, 321, 0, 100)
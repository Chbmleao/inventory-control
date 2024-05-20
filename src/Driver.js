import "./Exceptions.js"
import "./Contract.js"

class InfractionRegister {
    constructor(id) {
        this.id = id
    }
}

export class Driver {
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
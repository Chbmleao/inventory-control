import "./Exceptions.js"

export class Contract {
  constructor(driverId, clientId, dateBegin, dateEnd){ // TODO: Add products to the contract
      
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
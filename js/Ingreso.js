class Entry extends Data{
    static revenueAccountant = 0;
    constructor(description, value) {
        super(description, value);
        this._id = ++Entry.revenueAccountant;
    }
    get id(){
        return this._id;
    }
}
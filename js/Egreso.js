class Egress extends Data{
    static expenseAccountant = 0;
    constructor(description, value){
        super(description, value);
        this._id = ++Egress.expenseAccountant;
    }
    get id(){
        return this._id;
    }
}

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: { type : String, required: true },
    password: { type : String, required: false },
    email: { type : String, required: true, unique: true },
    isMasterUser: { type: Boolean, default: false },
    isParentCompany: { type: Boolean, default: false },
    location: String,
    childCompany: [ { type: Schema.Types.ObjectId, ref: 'Company' } ], // Self Referencing 
    warehouse: [ {type:Schema.Types.ObjectId, ref: 'Warehouse'}],
    warehouseBasicInfo: [ {
        _id: String,
        warehouseName: String,
        maxCapacity: Number,
        currentCapacity: Number
    }],
    createAt: { type: Date, default: Date.now }
})

// built-in methods in Schema object
companySchema.pre('save', async function(next) {
    const saltRounds = 10;
    // isNew: Boolean flag specifying if the document is new.
    // isModified(FieldName): Returns true if any of the given paths is modified, else false.
    if(this.isNew || this.isModified('password')){   
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
})

companySchema.methods.isCorrectPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

const Company = mongoose.model('Company', companySchema);

export default Company;
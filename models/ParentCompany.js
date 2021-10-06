import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const parentCompanySchema = new Schema({
    companyName: { type : String, required: true },
    password: { type : String, required: false },
    email: { type : String, required: true, unique: true },
    isMasterUser: { type: Boolean, default: false },
    isParentCompany: { type: Boolean, default: true },
    location: String,
    childCompany: [ { type: Schema.Types.ObjectId, ref: 'Company' } ],
    // warehouseBasicInfo: [ {
    //     _id: String,
    //     warehouseName: String,
    //     maxCapacity: Number,
    //     currentCapacity: Number
    // }],
    createAt: { type: Date, default: Date.now }
})

// built-in methods in Schema object
parentCompanySchema.pre('save', async function(next) {
    const saltRounds = 10;
    // isNew: Boolean flag specifying if the document is new.
    // isModified(FieldName): Returns true if any of the given paths is modified, else false.
    if(this.isNew || this.isModified('password')){   
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
})

parentCompanySchema.methods.isCorrectPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

const ParentCompany = mongoose.model('ParentCompany', parentCompanySchema);

export default ParentCompany;
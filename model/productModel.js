import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    prodName : {
        type : String,
        required : true
    }, 
    prodDescription : {
        type : String,
        required : true
    },
    prodCost : {
        type : String,
        required : true
    },
    prodImg : {
        type : String,
        required : true
    },
    vendor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Signups',
        required : true
    }
}, {timestamps : true}); 

export default mongoose.model("product", productSchema);
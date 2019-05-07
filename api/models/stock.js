const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    item_name: { type: String, required: true },
    item_qunatity: { type: Number, required: true },
    item_company: { type: String, required: true }
});


module.exports=mongoose.model('Stock',StockSchema);
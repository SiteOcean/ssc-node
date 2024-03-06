const mongoose =  require('mongoose');

const offersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  whatSpecial : { type: String, required: true},
  description: { type: String, required: true },
  category: {type:String, required:true},
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  offer: { type: Number, required: true },
  images: [{
    data:Buffer,
    contentType:String 
}],
});


const Offers = mongoose.model('AllOffer', offersSchema);

module.exports = Offers;

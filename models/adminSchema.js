const mongoose =  require('mongoose');



const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
}, { timestamps: true });

const Admins = mongoose.model('AdminUser', AdminSchema);

module.exports = Admins;

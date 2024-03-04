const Admins = require("../models/adminSchema");

const test = async(req, res, next)=>{
    
    res.json({
              
        message: 'Api success'
    }) 
    }

    const createAdmin = async (req, res) => {
 
        try {       
         
        const {username, password, email, mobile, designation} = req.body;
        const Trimedemail = email.replace(/\s+/g, "").toLowerCase().replace(/(?:www\.)+/g, '');

          const saveImage = new Admins({username : username.trim().toLowerCase(), password, email:Trimedemail, mobile, designation}
          )
              
          const response = await saveImage.save();
          if(!response){
            res.status(403).json({ message: 'oops!...' });
          }
          res.status(200).json({ message: 'Success' });
         
        } catch (error) {
          console.log(error);
          if (error.message === 'Image is required') {
            return res.status(400).json({ message: error.message });
          }
          res.status(500).json({ message: 'Oops! Something went wrong. Please try again later.' });
        }
      };

      const adminLogin = async (req, res) => {
        try {
          const { username, password } = req.body;
          const trimmedUsername = username.trim().toLowerCase(); // Trim username if needed
      
          // Find the admin by username and password
          const admin = await Admins.findOne({ username: trimmedUsername, password });
      
          if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
          }
      
          // You may want to generate and return a token for authentication here
      
          res.status(200).json({ message: 'Login successful', admin });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Oops! Something went wrong. Please try again later.' });
        }
      };
      
    module.exports = {
        test,
        createAdmin,
        adminLogin
    }
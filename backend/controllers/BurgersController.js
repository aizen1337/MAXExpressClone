const { getDocs, collection} = require('firebase/firestore')
const { database  } = require('../firebase/firebaseConfig')
const getAllBurgers = async (req,res) => {
    try {
        const snapshot = await getDocs(collection(database,"burgers"))
        res.status(200).json(snapshot)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}
module.exports = getAllBurgers 
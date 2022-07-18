const { getDocs, collection} = require('firebase/firestore')
const { database  } = require('../firebase/firebaseConfig')
const getAllBurgers = async (req,res) => {
    const snapshot = await getDocs(collection(database,"burgers"))
    snapshot.forEach((doc) => {
        console.log(JSON.stringify({id: doc.id, ...doc.data()}))
    });
    res.send({message: "Successfully send"})
}
module.exports = getAllBurgers 
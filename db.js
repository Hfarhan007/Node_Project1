const mongoose = require('mongoose');

mongoose.connect(process.env.DB).then(()=>{
        console.log('DB conected successfully')
}).catch((error)=>{
console.log(error)
})
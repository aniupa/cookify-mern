import {connectToDb} from './src/db/db.js' 
import app from "./src/app.js";


connectToDb()
app.listen(3000,()=>{
    console.log('server is running on port 3000');
    
})
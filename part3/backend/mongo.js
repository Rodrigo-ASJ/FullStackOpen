const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('give password as argument');
  process.exit(1);

}

const password = process.argv[2];

const url = `mongodb+srv://arxrjf:${password}@fullstackopen.dvujn.mongodb.net/noteApp?retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set('strictQuery',false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML funny',
  important: true,
})

/*
// Generar nuevas notas
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

// Obtener todas las notas
Note.find({_id:"67e0110a140b4952b9530ee1"}).then( result =>{
  //recorre todos los resultados y printalos en la consola
  result.forEach( note => { 
      console.log(note)
    });
  // cierra la conexion
  mongoose.connection.close();  
});




/*
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://arxrjf:<db_password>@fullstackopen.dvujn.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpen";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/
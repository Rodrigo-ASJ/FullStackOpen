const mongoose = require('mongoose');
// agregar entradas a la agenda y para enumerar todas las entradas existentes en la agenda.


//por lineas de comando
if(process.argv.length < 3){
    console.log('give password as argument');
    process.exit(1);
  } 

  const password = process.argv[2];
  const url = `mongodb+srv://arxrjf:${password}@fullstackopen.dvujn.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FullStackOpen`;

  mongoose.set('strictQuery',false);
  mongoose.connect(url);

  const personShema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
  })

  const Person = mongoose.model('Person', personShema);


  if( process.argv.length < 4){
    
    console.log('phonebook:')
    Person.find({}).then( result =>{
      //recorre todos los resultados y printalos en la consola
      result.forEach( persona => { 
          console.log(persona)
        });
      // cierra la conexion
      mongoose.connection.close();  
    });
   
  } 
  
  if ( process.argv.length >= 4){
    
    const person = new Person({
        name: `${process.argv[3]}`,
        phoneNumber: `${process.argv[4]}`,
      })
      
    
      // Generar nuevas notas
      person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
      })
     

  }

 

 


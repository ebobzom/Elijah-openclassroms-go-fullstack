const express =require('express');
const mongoose = require('mongoose');
const Recipes = require('./models/recipes');
// mmogodb connection string: mongodb+srv://elijah:<password>@cluster0-b9dhg.mongodb.net/test?retryWrites=true&w=majority

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb+srv://elijah:woody4real@cluster0-b9dhg.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
  console.log('Successfully connected to mongodb Atlas');
})
.catch(e => {
  console.log('unable to connect to Atlas');
  console.log(e);
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.get('/api/recipes', (req, res, next) => {
  Recipes.find({}) // this gets all the recipes
  .then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );

});

app.get('/api/recipes/:id', (req, res, next) => {
  Recipes.findOne({
    _id: req.params.id
  }) 
  .then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );

});

app.post('/api/recipes', (req, res, next) => {
  const thing = new Recipes({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    difficulty: req.body.difficulty,
  });
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.put('/api/recipes/:id', (req, res, next) => {
  const thing = new Recipes({
    _id: req.params.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    difficulty: req.body.difficulty,
  });
  Recipes.updateOne({_id: req.params.id}, thing).then(
        () => {
          res.status(201).json({
            message: 'Thing updated successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
});

app.delete('/api/recipes/:id', (req, res, next) => {
  Recipes.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});



module.exports = app;
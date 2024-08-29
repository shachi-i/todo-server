const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


let todos = [];
app.get('/', (req, res) => {
    res.send('Welcome to the To-Do API');
  });
  


app.get('/todos', (req, res) => {
  res.json(todos);
});


app.post('/todos', (req, res) => {
  const todo = {
    id: todos.length + 1, 
    task: req.body.task,
  };
  todos.push(todo);
  res.status(201).json(todo);
});


app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex(todo => todo.id === id);

  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo);
  } else {
    res.status(404).json({ message: 'To-Do item not found' });
  }
});


app.listen(port, () => {
  console.log(`To-Do server running on http://localhost:${port}`);
});


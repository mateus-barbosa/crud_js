const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/database.sqlite')

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT
    );
  `, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err.message);
    } else {
      console.log('Tabela "tasks" criada com sucesso');
    }
  });
});

const Task = {}

Task.create = (task, callback) => {
  db.run('INSERT INTO tasks (description) VALUES (?)', [task.description], callback);
}

Task.getAll = (callback) => {
  db.all('SELECT * FROM tasks', callback);
}

Task.getById = (id, callback) => {
  db.all('SELECT * FROM tasks WHERE id = ?', [id], callback);
}

Task.update = (id, task, callback) => {
  db.run('UPDATE tasks SET description = ? WHERE id = ?', [task.description, id], callback);
}

Task.delete = (id, callback) => {
  db.run('DELETE FROM tasks WHERE id = ?', [id], callback);
}

module.exports = Task;
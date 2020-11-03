const express = require('express');
const cors = require('cors');

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  // TODO
  return response.status(200).json(repositories);
});

app.post('/repositories', (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const likes = 0;

  if (title == undefined || url == undefined || techs == undefined) {
    return response.status(400).json({ message: 'Preencha todas informações' });
  }

  const projectCreated = { id: uuid(), title, url, techs, likes };

  repositories.push(projectCreated);
  return response.status(200).json(projectCreated);
});

app.put('/repositories/:id', (request, response) => {
  // TODO
  const { id } = request.params;
  const { url, title, techs } = request.body;

  if (isUuid(id) == false) {
    return response
      .status(400)
      .json({ message: 'Houve um problema com seu ID, tente novamente.' });
  }

  const indexRepositoryChanged = repositories.findIndex(
    (repository) => repository.id == id
  );

  const repository = repositories[indexRepositoryChanged];
  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.status(200).json(repositories[indexRepositoryChanged]);
});

app.delete('/repositories/:id', (request, response) => {
  // TODO
  const { id } = request.params;

  if (isUuid(id) == false) {
    return response
      .status(400)
      .json({ message: 'Houve um problema com seu ID, tente novamente.' });
  }

  const indexRepositoryDeleted = repositories.findIndex(
    (repository) => repository.id === id
  );

  indexRepositoryDeleted !== -1
    ? repositories.splice(indexRepositoryDeleted, 1)
    : '';

  return response.status(204).json({ message: 'deleted' });
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
  const { id } = request.params;

  if (isUuid(id) == false) {
    return response
      .status(400)
      .json({ message: 'Houve um problema com seu ID, tente novamente.' });
  }

  const indexRepository = repositories.findIndex(
    (repository) => repository.id == id
  );

  repositories[indexRepository].likes += 1;
  return response.status(200).json(repositories[indexRepository]);
});

module.exports = app;

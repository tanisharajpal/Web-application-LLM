# Web-application-LLM
A web-based application where users can ask questions, and the system provides intelligent answers powered by an AI language model. 
FullStack React+FastAPI project

## About this project 🚀
A microservice is required to be created with login functionality and user registration, with access to a chat and a language model for chat history.

The user can ask questions of a maximum of 2000 tokens and a maximum of 20 messages.

The backend will process the information using a AI microservice base ond Tensorflow Serving and response back to the user

## Tech Stack 📋
- Backend in FastAPI
- AI ChatModel with Tensorflow and Tensorflow Serving
- Authentication
- Dockerized
- Frontend in Next.js with Javascript.
- Frontend styles/components using flowbite.
- Relational database with PostgreSQL


## Start the project
Launch the backend + database docker:
```sh
$ docker-compose up
```
__NOTE__: First time, launch twice to create the database in first place.

Launch nextjs dev docker server:
```sh
docker-compose -f dev_compose.yml up
```

Go to http://localhost:3000

__NOTE__: nextjs dev docker server could be replaced with a nginx server in production after building the application as static files.


## Future improvements
- Add documentation.
- Add tests.
- Add toast messages for alert or errors.
- Remove warning "Extra attributes from the server..." from the console.
- Save JWT in cookies insted of using sessionStorage.
- Add nginx configuration.
- Demo deploy on AWS.


## How to setup a new project from scratch
__NOTE__: This is not necesarry as nextjs is already installed in the project. Is just for reference.

- Create front app
```sh
docker run --rm -it --user "$(id -u):$(id -g)" -v $(pwd):/front -w=/front node:18.16.0 npx create-next-app@latest --js front
```

- How to intall axios and flowbite
Launch docker container with node image:
```sh
$ docker run --rm -it --user "$(id -u):$(id -g)" -p 3000:3000 -v $(pwd)/front:/front -w=/front node:18.16.0 bash
```

- Inside the docker terminal, run:
```sh
$ npm install axios
$ npm install flowbite flowbite-react
```

## Thanks!

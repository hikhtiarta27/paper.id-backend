# Paper.id Backend Service

-------------------------
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)

-------------------------
## Requirements

- NodeJs
- MySQL 
- Docker (optional)
- docker-compose (optional)

-------------------------
## Installation

Before running this application you need to copy the environment variable in `.env.example` to `.env`. 
The recommended way to get started using this application is by using docker-compose. This can be done by running

```bash
docker-compose up
```

If you are'nt using docker/docker-compose, you need to change the configuration a little bit from `.env`. and run this application by

```bash
cd paper.id-backend && npm i && node server.js
```

-------------------------
## Usage

To get started with the application. Open your browser and go to [link to API Documentation!](http://localhost:3011/api-docs) and you are ready to use. If you are using an API that needs a token, generate the token using login API and put the token inside the `Authorize` button on the right-top of the page





# Docker

### Build

``` sh
git clean -xfd
docker build -t hiring-kanban-backend .
```

### Run

(Example)

#### Script

``` sh
docker run -d --restart always --name hiring-kanban-backend -v ./runtime/:/usr/src/app/runtime/ -p 8006:8006 hiring-kanban-backend
```

#### Compose

``` yaml
version: "3.3"
services:
  hiring-kanban-backend:
    restart: always
    container_name: hiring-kanban-backend
    ports:
      - "5000:5000"
    image: hiring-kanban-backend
```

``` sh
docker-compose up -d
```


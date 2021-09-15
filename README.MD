
### Start database
```sh
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
cat ./scripts/Script000-usuario.sql | docker exec -i some-postgres psql -U postgres -d postgres
```

### Execute test
```sh
npm test
```

### LOGIN
```sh
TOKEN=$(curl -H "Content-type: application/json" -d '{"email":"edgar@rios.navarro", "password":"123456"}' http://localhost:3000/login | jq -r '.token')
```

### POST/PUT
```sh
curl -X POST -H "Content-type: application/json" -H "token: ${TOKEN}" -d '{"nombre":"Belen","email":"belen@rios.badajuz", "password":"123456"}' http://localhost:3000/usuario

curl -X PUT -H "Content-type: application/json" -H "token: ${TOKEN}" -d '{"img":"Belencita.jpg"}' http://localhost:3000/usuario/2
```

### POST/DELETE
```sh
curl -X POST -H "Content-type: application/json" -H "token: ${TOKEN}" -d '{"nombre":"Carmen","email":"carmen@navarro.rojas", "password":"123456"}' http://localhost:3000/usuario

curl -X DELETE -H "token: ${TOKEN}" http://localhost:3000/usuario/3
```

### GET
```sh
curl -H 'Accept: application/json' -H "token: ${TOKEN}" "http://localhost:3000/usuario?desde=0&limite=10" 
```

### Documentation
* https://hub.docker.com/_/postgres
* https://x-team.com/blog/testing-node-jasmine/

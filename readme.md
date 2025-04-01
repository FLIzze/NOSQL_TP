lancer le projet

```
docker compose up --build
```

le serveur se lance sur `localhost:5000`

vous pouvez maintenant faire des curls sur les routes

post un user

```
curl -X POST http://localhost:5000/api/profiles \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john.doe@example.com", "age": 30}'
```

get les users

```
curl http://localhost:500/api/profiles
```

.env a rajouter 

```
MONGO_URI=mongodb://root:example@localhost:27017/?authSource=admin
PORT=5000
```

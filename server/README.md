# React Prenom Back-end

## Prerequisites

### Redis server

Install Redis Cache server, it will stores list of all Prenoms, to speed-up search and autocompletion.

**MacOS**
```
brew install redis
```

### MongoDB

Prenom data is stored in a MongoDB database. You need to install it. File `mongo-data.json.gz` contains all the data.

## Installation

Install dependencies

`npm install`

Launch the server

`node server.js`

You should see the following output. If something fails, please ensures that both Mongo and Redis are running.

```
$ node server.js 
✅ A GraphQL API running at port 4000
✅ Redis connection established.
✅ Mongo connection established.
🚀 31665 Prenom loaded on Redis.
```
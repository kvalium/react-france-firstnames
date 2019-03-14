# React Prenom Back-end

## Prerequisites

### ElasticSearch server

Install ElasticSearch server, it will stores list of all Prenoms, to speed-up search and autocompletion.

### MongoDB

Prenom data is stored in a MongoDB database. You need to install it. File `mongo-data.json.gz` contains all the data.

## Installation

Install dependencies

`npm install`

Launch the server

`node server.js`

You should see the following output. If something fails, please ensures that both Mongo and ElasticSearch are running.

```
$ node server.js 
✅ A GraphQL API running at port 4000
✅ Mongo connection established.
✅ ElasticSearch connection established.
🚀 31665 Prenom loaded on Elastic cluster.
```
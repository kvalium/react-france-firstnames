const elasticsearch = require('elasticsearch');
const
  ELASTICSEARCH_HOST = process.env.ELASTICSEARCH_HOST || 'localhost',
  ELASTICSEARCH_PORT = process.env.ELASTICSEARCH_PORT || 9200,
  colors = require('colors'),
  models = require('../models/prenom'),
  franceModel = models.franceModel;

var client = new elasticsearch.Client({
  host: `${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}`,
});

const elasticSettings = {

}


client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, error => {
  if (error) {
    console.trace('ElasticSearch cluster is down!');
  } else {
    console.log('✅ ElasticSearch connection established.');
    deleteIndex().then(() => {
      loadElastic().then((nb) => {
        console.log(colors.bold.green('🚀 ' + nb + ' Prenom loaded on Elastic cluster.'));
      })
    });
  }
});

const deleteIndex = () => {
  return new Promise(resolve => {
    client.deleteByQuery({
      index: 'prenoms',
      body: {
        query: {
          match_all: {}
        }
      }
    });
    resolve();
  });
}

const countElements = () => {
  client.count({
    index: 'prenoms'
  }, (error, response) => {
    if (error)
      console.log(error);
    console.log(`${response.count} elements on Prenoms index.`);
  });
}

/***
 * Load Redis cache data with prenom list
 *
 * @returns {Promise<any>}
 * @constructor
 */
const loadElastic = () => {
  return new Promise(resolve => {
    const prenoms = franceModel.distinct('prenom');

    prenoms.exec((err, prenoms) => {
      let bulkBody = [];
      prenoms.forEach((element, i) => {
        bulkBody.push({
          index: {
            _index: 'prenoms',
            _type: 'prenom',
            _id: i + 1
          }
        });

        bulkBody.push({
          prenom: element
        });
      });

      client.bulk({
        body: bulkBody
      }, (error, response) => resolve(prenoms.length));

    });
  });
}


const search = (term) => {
  const start = new Date().getTime();

  return new Promise(resolve => {
    client.search({
        index: 'prenoms',
        q: `prenom:${term}*`
      },
      (err, reply) => {
        const hits = reply.hits.hits;
        console.log(hits);
        let results = [];
        hits.filter(x => results.push(x._source.prenom));
        const end = new Date().getTime(),
          time = end - start;
        resolve({
          results: results,
          timer: time
        });
      });
  });
}

// export functions
module.exports = {
  search: search
};
const elasticsearch = require('elasticsearch');
const
  ELASTICSEARCH_HOST = process.env.ELASTICSEARCH_HOST || 'localhost:9200',
  colors = require('colors'),
  models = require('../models/prenom'),
  franceModel = models.franceModel;

var client = new elasticsearch.Client({
  host: ELASTICSEARCH_HOST,
});

const elasticSettings = {
  "analysis": {
    "analyzer": {
      "default": {
        "tokenizer": "standard",
        "filter":  [ "standard", "uppercase", "asciifolding" ]
      }
    }
  }
}

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, error => {
  if (error) {
    console.trace(`ElasticSearch cluster is down! host: ${ELASTICSEARCH_HOST}`);
  } else {
    console.log('✅ ElasticSearch connection established.');
    client.indices.delete({index: 'prenoms'}, () => {
      
      client.indices.create({index: 'prenoms', body: elasticSettings},
        loadElastic().then((nb) => {
          //client.indices.getSettings({index: 'prenoms'}, (err, resp) => console.log(resp.prenoms.settings));
          console.log(colors.bold.green('🚀 ' + nb + ' Prenom loaded on Elastic cluster.'));
        })
      );
    });
  }
});

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


const search = (term, results = 100, lev) => {
  const start = new Date().getTime();
  
  let search = lev ? term + '~' + Math.abs(lev) : term;

  if(results > 100){
    let results = 100;
  }

  return new Promise((resolve, reject) => {
    client.search({
        index: 'prenoms',
        analyzer: 'default',
        size: results,
        q: `prenom:${search}`
      },
      (err, reply) => {
        if(err){
          console.log(err.message);
          resolve({results: []});
          return;
        }
        const hits = reply.hits.hits;
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
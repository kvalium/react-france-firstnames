const 
    config = require('./config'),
    mongoose = require('mongoose'),
    models = require('../models/prenom'),
    deptModel = models.deptModel,
    franceModel = models.franceModel,
    db = mongoose.connection,
    mapObject = require('./mapObject');

mongoose.connect(config.db);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('✅ Mongo connection established.');
});

/**
 * Fetch full data for a mandatory first name on depts db
 *
 * @param prenom mandatory, the given first name
 * @param annee year of birth param
 * @param dept department of birth param
 * @param sexe sex of birth param
 * @returns {Promise<any>} a resolve with query results
 */
function getPrenomData(...args) {
    let conds = mapObject.map(['prenom', 'annee', 'dept', 'sexe'], ...args);

    return new Promise(resolve => {
        deptModel.aggregate(
            [{
                "$match": conds
            },
                {
                    "$group": {
                        _id: "$prenom",
                        areas: {
                            "$push": {
                                nb: "$nb",
                                annee: "$annee",
                                dept: "$dept",
                                sexe: "$sexe",
                            }
                        }
                    }
                }
            ], (err, result) => {
                let results = [];
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length) {
                    results = result[0].areas;
                }
                resolve(results);
            }
        );
    });
}

const getPrenomFranceData = (...args) => {
    let conds = mapObject.map(['prenom', 'annee'], ...args);

    return new Promise(resolve => {
        franceModel.aggregate(
            [{
                "$match": conds
            },
                {
                    "$group": {
                        _id: "$sexe",
                        data: {
                            "$push": {
                                nb: "$nb",
                                annee: "$annee",
                                sexe: "$sexe"
                            }
                        }
                    }
                }
            ], (err, result) => {
                let results = [];
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length) {
                    results = result;
                }
                resolve(results);
            }
        );
    });
}

// functions export
module.exports = {
    getPrenomData: getPrenomData,
    getPrenomFranceData: getPrenomFranceData
};

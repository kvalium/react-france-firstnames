/**
 * GRAPHQL
 * -------
 *
 * This file contains GraphQL Schema and Root declaration and exports an array that fits
 * graphQL Express needs.
 */

const {buildSchema} = require('graphql');
const elastic = require('./elasticSearch');
const mongoose = require('./mongoose');


let schema = buildSchema(`
  "Holds data for a first name: Number, Year, Department and sex of birth."
  type BirthStat{
    "Number of births"
    nb: Int,
    
    "Year of birth"
    annee: Int,
    
    "Sex: 1 for male, 2 for female"
    sexe: Int,
    
    "French department of birth"
    dept: Int
  }
  
  "Data structure for France wide stats"
  type SexCategory{
    "Sex for the first name: 1 for male, 2 for female"
    _id: Int
    data: [BirthStat]
  }
  
  "React Prenom GraphQL Schema 🚀"
  type Query {
    "Returns fine data for a mandatory first name, and can be refined by providing year, department and/or sex of birth."
    getPrenomData(prenom: String!, annee: Int, dept: Int, sexe: Int): [BirthStat],
    
    "First name data aggregated with all departments for both sexs"
    getPrenomFranceData(prenom: String!, annee: Int): [SexCategory],

    "First name search engine "
    search(
        "Search term"
        term: String!, 
        "Number of results (gapped to 200)"
        nb: Int, 
        "Levenshtein distance (max: 10)"
        lev: Int): [String],
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
    /***
     * Search Prenom using Mongo
     *
     * @deprecated better use Redis version
     * @param string val search pattern without wildcards
     * @returns {Promise|*|PromiseLike<T>|Promise<T>}
     */
    getPrenomData: ({prenom, annee, dept, sexe}) => {
        console.log('load data with params');
        return mongoose.getPrenomData(prenom, annee, dept, sexe).then((results) => {
                return results;
            }
        );
    },

    /**
     * Returns data for a given first name,
     *
     * @param prenom the given first name
     * @param annee optional year of birth
     * @returns {Promise|*|PromiseLike<T>|Promise<T>}
     */
    getPrenomFranceData: ({prenom, annee}) => {
        console.log('load France data with params:');
        return mongoose.getPrenomFranceData(prenom, annee).then((results) => {
                return results;
            }
        );
    },

    /***
     * Search Prenom using Redis cache
     *
     * @param string term search pattern without wildcards
     * @returns {Promise|*|PromiseLike<T>|Promise<T>}
     */
    search: ({term, nb, lev}) => {
        return elastic.search(term, nb, lev).then((results) => {
            console.log(`Search t=${term}, nb=${nb}, lev=${lev} => ${results.results.length} results (${results.timer} ms)`);
            return results.results;
        });
    },

};

module.exports = {
    schema: schema,
    rootValue: root,
    graphiql: true
};

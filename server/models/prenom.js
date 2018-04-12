const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prenomSchema = new Schema({
    prenom: {
        type: String
    },
    annee: {
        type: Number
    },
    nb: {
        type: Number
    }
});

const DeptModel = mongoose.model('Prenom', prenomSchema, 'depts');
const FranceModel = mongoose.model('Prenom', prenomSchema, 'france');

module.exports = {
    deptModel: DeptModel,
    franceModel: FranceModel
};

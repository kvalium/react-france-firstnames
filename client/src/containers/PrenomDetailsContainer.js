import React from 'react'
import gql from "graphql-tag"
import {AppoloClient} from "../config/ApolloClient"
import PrenomDetails from "../components/PrenomDetails"
import Spinner from '../components/Spinner'
import BuildChartData from '../utils/BuildChartData';

export default class PrenomDetailsContainer extends React.Component{

  constructor(props){
    super(props);
    this.prenomFranceDetails = this.prenomFranceDetails.bind(this);
    this.state = {
        details: undefined
    }
  }

  prenomFranceDetails(val){

    AppoloClient.query({
        query: gql`
          query($prenom: String!){ 
            getPrenomFranceData(prenom: $prenom){
              _id, data{
                annee, nb
              }
            }
          }
        `,
        variables: {
            prenom: val
        }
    }).then(
        ({loading, data}) => {
          
          this.setState({
            details: BuildChartData(data)
          });
        }
    );

  }

  // load Prenom data at init.
  componentDidMount(props){
    this.prenomFranceDetails(this.props.match.params.name);
  }

  render(){
      const prenom = this.props.match.params.name,
            results = this.state.details;

      return results ? <PrenomDetails name={prenom} results={results}/> : <Spinner message="chargement..."/>;
  }
}

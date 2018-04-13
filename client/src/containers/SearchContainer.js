import React from 'react'
import { Search } from '../components/Search'
import gql from "graphql-tag"
import {AppoloClient} from "../config/ApolloClient"
import { ApolloProvider } from 'react-apollo'

export class SearchContainer extends React.Component{
    constructor(props){
        super(props);
        this.searchName = this.searchName.bind(this);
        this.state = {
            value:'',
            results: []
        }
    }

    searchName(val){
        if(val.length < 3){
            this.setState({
                value: val,
                results: []
            });
            return;
        }

        AppoloClient.query({
            query: gql`query($term: String!){ search(term: $term, nb: 21, lev:2 )}`,
            variables: {
                term: val
            }
        }).then(
            ({loading, data}) => {
                const results = data.search;
                console.log(`${results.length} résultats`);
                this.setState({
                    value: val,
                    results: results
                });
            }
        );

    }

    render(){
        return (
            <ApolloProvider client={AppoloClient}>
                <Search value={this.state.value} results={this.state.results} onChange={this.searchName} />
            </ApolloProvider>
        );
    }
}

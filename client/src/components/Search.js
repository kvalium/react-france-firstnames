import React from 'react'
import { Link } from 'react-router-dom'

export class Search extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.onChange(event.target.value);
    }

    render(){
        let names = this.props.results.slice(0,2500);
        const listNames = names.map((name, i) =>
            <div className="result" key={i}>
                <Link to={`/prenom/${name}`}>{name}</Link>
            </div>
        );

        return (
          <div>
              <input type='text' name='search' onChange={this.handleChange}/>
              {/* <p>{this.props.value}: {names.length} résultats</p> */}
                <div className="results">
                    {listNames}
                </div>
          </div>

        );
    }
}


import React from 'react';
import { SearchContainer } from "../containers/SearchContainer";

const Home = () => (
  <div className="homepage">
    <h1 className="App-title">Hello World</h1>
    <p>
    Cherchez un prénom :
    </p>
    <SearchContainer/>
  </div>
)

export default Home

import React from 'react';

const Spinner = (props) => (
  <main>
    <div className="loading">
      {props.message}
    </div>
  </main>
)

export default Spinner
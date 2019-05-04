import React from 'react';
import { connect } from 'react-redux';


function Home() {
  return (
    <div>
      <h4 className="center">Home</h4>
    </div>
  );
}

export default connect()(Home);

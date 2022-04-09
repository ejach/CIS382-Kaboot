import React, { Fragment, Component } from 'react';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <Fragment>
          <div id='preloader'>
            <div className='jumper'>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </Fragment>
      );
    }

    return null;
  }
}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2000));
}

export default Loader;

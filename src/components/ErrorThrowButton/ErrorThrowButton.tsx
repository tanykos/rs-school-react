import { Component } from 'react';

interface State {
  throwError: boolean;
}

class ErrorThrowButton extends Component<object, State> {
  state: State = {
    throwError: false,
  };

  triggerError = () => {
    this.setState({ throwError: true });
  };

  componentDidUpdate(_prevProps: object, prevState: State) {
    if (this.state.throwError && !prevState.throwError) {
      throw new Error('Throw Error Button is clicked!');
    }
  }

  render() {
    return (
      <button onClick={this.triggerError} className="errorBtn">
        Throw Error
      </button>
    );
  }
}

export default ErrorThrowButton;

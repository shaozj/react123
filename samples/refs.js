var MyComponent = React.createClass({
  handleClick: function() {
    // Explicitly focus the text input using the raw DOM API.
    this.refs.myTextInput.getDOMNode().focus();
  },
  render: function() {
    // The ref attribute adds a reference to the component to
    // this.refs the component is mounted.
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleClick}
        />
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {userInput: ''};
  },
  handleChange: function(e) {
    this.setState({userInput: e.target.value});
  },
  clearAndFocusInput: function() {
    this.setState({userInput: ''}, function() { // Clear the input
      // This code executes after the component is re-rendered
      this.refs.theInput.getDOMNode().focus(); // Boom! Focused!
    });
  },
  render: function() {
    return (
      <div>
        <div onClick={this.clearAndFocusInput}>
          Click to Focus and Reset
        </div>
        <input 
          ref="theInput"
          value={this.state.userInput}
          onChange={this.handleChange}
        />
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);




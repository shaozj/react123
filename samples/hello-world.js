var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>
      	Hello, <input type="text" placehilder="Your name here" />!
      	It is {this.props.date.toTimeString()}
      </p>
    );
  }
});

setInterval(function() {
  React.render(
    <HelloWorld date={new Date()} />,
    document.getElementById('content')
  );	
}, 500);

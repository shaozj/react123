var FancyCheckbox = React.createClass({
  render: function() {
    var {checked, ...other} = this.props;
    var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
    // `other` 包含 {onClick:console.log} 但 checked 属性除外
    return (
      <div {...other} className={fancyClass} />
    );
  }
});

React.render(
  <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
    Hello world!
  </FancyCheckbox>,
  document.body
);

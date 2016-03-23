var MyForm = React.createClass({
  render: function() {
    return (
      <div>
        <input type="radio" name="opt" defaultChecked /> Option 1
        <input type="radio" name="opt" /> Option 2
        <select defaultValue="C">
          <option value="A">Apple</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
        </select>
      </div>
    );
  }
});

ReactDOM.render(
  <MyForm></MyForm>,
  document.body
);

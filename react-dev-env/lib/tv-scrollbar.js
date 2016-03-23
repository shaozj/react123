import React from 'react';

class TvScrollbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="J-TVScroll">
        <div class="tv-scrollbar">
          <div style={this.state.thumbCss} class="tv-scrollThumb"></div>
        </div>
        <div style={this.state.contentCss} class="tv-scrollContent">

        </div>
      </div>
    )
  }
}

export default TvScrollbar;

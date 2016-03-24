import React from 'react';

class TvScrollbar extends React.Component {
  constructor(props) {
    super(props);
  }

  bind () {
    let self = this;
    document.body.addEventListener('keydown', function (e) {
      if(!self.activited) return;
      let key = e.keyCode;
      if(key == 38){  // up
        self.moveUp();
      }else if(key == 40){  // down
        self.moveDown();
      }else{
        return;
      }  
    }, false);
  }

  activate() {
    this.activited = true;
  }

  deactivate() {
    this.activited = false;
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

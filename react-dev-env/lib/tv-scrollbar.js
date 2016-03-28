import React from 'react';
const indexless = require('./tv-scrollbar.less'); 

class TvScrollbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    // getInitialState
    let thumbCssObj = {
      transition: 'transform 0.2s ease',
      transform: 'translate3d(0, 0, 0)'
    }

    let contentCssObj = {
      transition: 'transform 0.2s ease',
      transform: 'translate3d(0, 0, 0)'
    }

    this.state = {
      thumbCss: thumbCssObj,
      contentCss: contentCssObj
    }
  }

  componentDidMount() {
    /*
    * @param $container 需要添加滚动条的窗口
    * @param $content 需要滚动显示的内容
    * @param $scrollbar 整条滚动条
    * @param $thumb 滚动条中的按钮
    */
    let $container = this.refs.tvScroll;
    let $content = this.refs.tvScrollContent
    let $scrollbar = this.refs.tvScrollbar;
    let $thumb = this.refs.tvScrollThumb;

    this.iNow = 0;
    this.totalSteps = 0;
    this.contentStride = this.props.contentStride;
    this.scrollbarStride = 0;
    this.$container = $container;
    this.$content = $content;
    this.$thumb = $thumb;
    this.activited = true;

    let contentHeight = $content.scrollHeight;
    let showHeight = $container.clientHeight;
    let scrollbarHeight = $scrollbar.scrollHeight;
    let thumbHeight = $thumb.scrollHeight;

    let contentStride = this.props.contentStride || showHeight / 10;
    this.contentStride = contentStride;

    // 处理内容高度小于窗口高度的情况，此时不显示滚动条
    if(contentHeight <= showHeight) {
      $scrollbar.style.display = 'none';
      $thumb.style.display = 'none';
      return;
    }

    this.totalSteps = parseInt((contentHeight - showHeight) / contentStride);
    // 调整contentStride的大小
    this.contentStride = (contentHeight - showHeight) / this.totalSteps;

    // 自适应设置thumbHeight 大小，可选项
    if(this.props.adaptiveThumbHeight)
      thumbHeight = this._setThumbHeight($thumb, scrollbarHeight, this.totalSteps);

    this.scrollbarStride = (scrollbarHeight - thumbHeight) / this.totalSteps;

    // console.log("content height: " + contentHeight);
    // console.log("show height: " + showHeight);
    // console.log("scrollbar height: " + scrollbarHeight);
    // console.log("thumb height: " + thumbHeight);
    // console.log("totalSteps: " + this.totalSteps);
    // console.log("scrollbarStride: " + this.scrollbarStride); 
    // console.log("content stride: " + this.contentStride);

    this.bind();
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

  moveUp() {
    this.iNow --;
    if(this.iNow < 0){
      this.iNow = 0;
    }
    let dist1 = -this.iNow * this.contentStride;
    let dist2 = this.iNow * this.scrollbarStride;
    this.setState({
      thumbCss: this._getAnimStyle(dist2),
      contentCss: this._getAnimStyle(dist1)
    })
  }

  moveDown() {
    this.iNow ++;
    if(this.iNow > this.totalSteps){
      this.iNow = this.totalSteps;
    }
    let dist1 = -this.iNow * this.contentStride;
    let dist2 = this.iNow * this.scrollbarStride;
    this.setState({
      thumbCss: this._getAnimStyle(dist2),
      contentCss: this._getAnimStyle(dist1)
    })
  }

  activate() {
    this.activited = true;
  }

  deactivate() {
    this.activited = false;
  }

  _setThumbHeight($thumb, scrollbarHeight, totalSteps) {
    let thumbHeight = scrollbarHeight / totalSteps * 4;
    // 设置一个最小高度
    if(thumbHeight < 30) thumbHeight = 30;
    $thumb.style.height = thumbHeight + 'px';
    return thumbHeight;
  }

  _getAnimStyle(dist) {
    return {
      transition: 'transform 0.2s ease',
      transform: 'translate3d(0, ' + dist + 'px, 0)'
    }
  }

  render() {
    return (
      <div className="J-TVScroll" ref="tvScroll" >
        <div className="tv-scrollbar" ref="tvScrollbar">
          <div style={this.state.thumbCss} className="tv-scrollThumb" ref="tvScrollThumb"></div>
        </div>
        <div style={this.state.contentCss} className="tv-scrollContent" ref="tvScrollContent" dangerouslySetInnerHTML={{__html: this.props.items}}>

        </div>
      </div>
    )
  }
}

export default TvScrollbar;

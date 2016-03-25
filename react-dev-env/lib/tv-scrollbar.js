import React from 'react';

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
      contentCssObj: contentCss
    }
  }

  componentDidMount() {
    /*
    * @param $container 需要添加滚动条的窗口
    * @param $content 需要滚动显示的内容
    * @param $scrollbar 整条滚动条
    * @param $thumb 滚动条中的按钮
    */
    let $container = this.refs.tvScroll.getDOMNode();
    let $content = this.refs.tvScrollContent.getDOMNode();
    let $scrollbar = this.refs.tvScrollbar.getDOMNode();
    let $thumb = this.refs.tvScrollThumb.getDOMNode();

    this.iNow = 0;
    this.totalSteps = 0;
    this.contentStride = this.props.contentStride;
    this.scrollbarStride = 0;
    this.$container = $container;
    this.$content = $content;
    this.$thumb = $thumb;
    this.activited = true;

    let contentHeight = getElementHeight($content);
    let showHeight = $container.clientHeight;
    let scrollbarHeight = getElementHeight($scrollbar);
    let thumbHeight = getElementHeight($thumb);

    contentStride = contentStride || showHeight / 10;
    this.contentStride = contentStride;

    // 处理内容高度小于窗口高度的情况，此时不显示滚动条
    if(contentHeight <= showHeight) {
      $('.tv-scrollbar').style.display = 'none';
      $('.tv-scrollThumb').style.display = 'none';
      return;
    }

    this.totalSteps = parseInt((contentHeight - showHeight) / contentStride);
    // 调整contentStride的大小
    this.contentStride = (contentHeight - showHeight) / this.totalSteps;

    // 自适应设置thumbHeight 大小，可选项
    if(adaptiveThumbHeight)
      thumbHeight = setThumbHeight($thumb, scrollbarHeight, this.totalSteps);

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

  activate() {
    this.activited = true;
  }

  deactivate() {
    this.activited = false;
  }

  render() {
    return (
      <div class="J-TVScroll" ref="tvScroll" >
        <div class="tv-scrollbar" ref="tvScrollbar">
          <div style={this.state.thumbCss} class="tv-scrollThumb" ref="tvScrollThumb"></div>
        </div>
        <div style={this.state.contentCss} class="tv-scrollContent" ref="tvScrollContent">

        </div>
      </div>
    )
  }
}

export default TvScrollbar;

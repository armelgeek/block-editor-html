import React, { Component } from 'react';
import PlayerLogic from '../../../../utils/audio/player-logic';

class PlayerView extends Component {
  constructor(props:any) {
    super(props);
    this.logic = new PlayerLogic(props.streamer) as any;

    this.buttonRef = React.createRef() as any;
    this.trackRef = React.createRef();
    this.progressRef = React.createRef();
    this.scrubberRef = React.createRef();
    this.messageRef = React.createRef();
  }

  componentDidMount() {
    this.bindEvents();
    this.draw();
  }

  bindEvents() {
    this.buttonRef.current.addEventListener('click', this.logic.toggle.bind(this.logic));
    this.scrubberRef.current.addEventListener('mousedown', this.logic.onMouseDown.bind(this.logic));
    this.trackRef.current.addEventListener('click', this.logic.onClick.bind(this.logic));
    window.addEventListener('mousemove', this.logic.onDrag.bind(this.logic));
    window.addEventListener('mouseup', this.logic.onMouseUp.bind(this.logic));
  }

  draw = () => {
    const progress = this.logic.updatePosition() / this.props.streamer.duration;
    const width = this.trackRef.current.offsetWidth;

    if (this.logic.playing) {
      this.buttonRef.current.classList.add('fa-pause');
      this.buttonRef.current.classList.remove('fa-play');
    } else {
      this.buttonRef.current.classList.add('fa-play');
      this.buttonRef.current.classList.remove('fa-pause');
    }

    this.progressRef.current.style.width = progress * width + 'px';

    if (!this.logic.dragging) {
      this.scrubberRef.current.style.left = progress * width + 'px';
    }

    requestAnimationFrame(this.draw);
  };

  render() {
    return (
      <div>
        <button className="button" ref={this.buttonRef}></button>
        <div className="track" ref={this.trackRef}></div>
        <div className="progress" ref={this.progressRef}></div>
        <div className="scrubber" ref={this.scrubberRef}></div>
        <div className="message" ref={this.messageRef}></div>
      </div>
    );
  }
}

export default PlayerView;

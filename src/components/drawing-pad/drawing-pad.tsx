import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'wr-drawing-pad',
  styleUrl: 'drawing-pad.css',
  shadow: false
})
export class DrawingPad {

  @Prop() first: string;
  @Prop() last: string;

  @Element() element: HTMLElement;
  private isDrawing = false;
  private mouse = { x: 0, y: 0 };
  private lastMouse = { x: 0, y: 0 };
  x: string;
  y: number;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  componentDidLoad() {
    this.canvas = this.element.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    var container = this.element.querySelector('.canvas-container');
    var container_style = getComputedStyle(container);
    this.canvas.width = parseInt(container_style.getPropertyValue('width'));
    this.canvas.height = parseInt(container_style.getPropertyValue('height'));
    this.ctx.lineWidth = 5;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'blue';
  }

  render() {
    return (
      <div class="canvas-container">
        <canvas class="wr-canvas"
          onMouseDown={() => { this.onMouseDown(); }}
          onMouseUp={() => { this.onMouseUp(); }}
          onMouseMove={(e: MouseEvent) => { this.onMouseMove(e); }}
        ></canvas>
      </div>
    );
  }


  onMouseDown() {
    this.isDrawing = true;
  }

  onMouseUp() {
    this.isDrawing = false;
  }

  onMouseMove(e: MouseEvent) {
    console.log('move', this.mouse);
    let canvas = e.target as HTMLCanvasElement;
    this.lastMouse.x = this.mouse.x;
    this.lastMouse.y = this.mouse.y;

    this.mouse.x = e.pageX - canvas.offsetLeft;
    this.mouse.y = e.pageY - canvas.offsetTop;

    if (this.isDrawing) { this.paint(); }
  }

  paint() {
    console.log('paint', this);
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastMouse.x, this.lastMouse.y);
    this.ctx.lineTo(this.mouse.x, this.mouse.y);
    this.ctx.closePath();
    this.ctx.stroke();
  };

  color(obj) {
    switch (obj.id) {
      case "green":
        this.x = "green";
        break;
      case "blue":
        this.x = "blue";
        break;
      case "red":
        this.x = "red";
        break;
      case "yellow":
        this.x = "yellow";
        break;
      case "orange":
        this.x = "orange";
        break;
      case "black":
        this.x = "black";
        break;
      case "white":
        this.x = "white";
        break;
    }
    if (this.x == "white") this.y = 14;
    else this.y = 2;

  }


  // erase() {
  //   var m = confirm("Want to clear");
  //   if (m) {
  //     this.ctx.clearRect(0, 0, this.w, this.h);
  //     document.getElementById("canvasimg").style.display = "none";
  //   }
  // }

  // save() {
  //   document.getElementById("canvasimg").style.border = "2px solid";
  //   var dataURL = this.canvas.toDataURL();
  //   document.getElementById("canvasimg").src = dataURL;
  //   document.getElementById("canvasimg").style.display = "inline";
  // }


}

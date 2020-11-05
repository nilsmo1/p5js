class Cell {
  constructor(x, y, size, state) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.state = state;
    this.next = null;
  }
  
  getState() {
    return this.state;
  }
  
  setNextState(state) {
    this.next = state;
  }
  
  setState(state) {
    this.state = state;
  }
  
  updateState() {
    this.state = this.next;
  }
  
  show() {
   if (this.state == 1) {
     fill(0);
   } else {
     fill(255);
   }
   noStroke();
   rect(this.x, this.y, this.size, this.size);
  }
  
  contains(x, y) {
    if (this.x < x && this.x + this.size > x && this.y < y && this.y + this.size > y) {
      return true;
    }
    return false;
  }
}

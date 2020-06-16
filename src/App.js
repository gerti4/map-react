import React from 'react';
import './App.css';
import { ReactBingmaps } from 'react-bingmaps';


/*
unfortunately i spent to much time for adding a new component 
for searching according to a specific location or given coordinates, so i decieded
to implement the polygon by user's click.

Hope that's ok.
Thanks
*/
class App extends React.Component {

  constructor() {
    super()
    this.state = {
      searchBy: "",
      pins: [],
      center : null
    }
    this.AddPushPinOnClick = this.AddPushPinOnClick.bind(this)
    this.setCenter = this.setCenter.bind(this)
  }

  // a method that add pins on the map according to user's clicks
  AddPushPinOnClick(location) {
    if(this.state.pins.length === 3){
      this.setState((prevState) => {
        return {
          ...prevState,
          pins: [],
          center: null
        }
      })
    }
    const pin = { "location": [location.latitude, location.longitude], "option": { color: 'red' } }
    var newPins = this.state.pins.slice();
    newPins.unshift(pin)
    this.setState((prevState) => {
      return {
        ...prevState,
        pins: newPins
      }
    })        
    this.setCenter()
  }

  // a method to set the center of polygon where user clicked on three diffrent poitns
  setCenter() {
    if (this.state.pins.length === 3) {
      var avgLng = 0
      var avgLat = 0
      for (var i = 0; i < 3; i++) {        
        avgLat += this.state.pins[i].location[0]
        avgLng += this.state.pins[i].location[1]
      }
      const center = [avgLat / 3, avgLng / 3]
      
      this.setState(prevState=>{
        return{
          ...prevState,
          center: center
        }
      })
    }
  }

  render() {

    return (
      <div className="App">

        <div>
          <ReactBingmaps
            bingmapKey="Ap2MSThDCpHEgGnyl6fXKrodMH1b6N4kEsiLbnSztTMm1vh7L9WIxWmSkXKGvXLR"
            getLocation={
              { addHandler: "click", callback: this.AddPushPinOnClick }
            }
            center={[13.0827, 80.2707]}
            pushPins={this.state.pins}
            regularPolygons={
              [
                {
                  "center": this.state.center, // here the polygon will be located according to the center point of the pins on the map
                  "radius": 5, // here i want to add a new variable in the state for calulating the polygon size.
                  "points": 3,
                  "option": { fillColor: "green", strokeThickness: 2 }
                }
              ]
            }
            >
          </ReactBingmaps>
        </div>
      </div>
    );
  }
}

export default App;

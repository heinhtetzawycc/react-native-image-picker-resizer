import React, { Component } from 'react';
import { View, Text , Image } from 'react-native';
import ImagePickerResizer from './App'

class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image : ''
    };
  }

  getImageData = (data) => {
    this.setState({
      image : data
    })
  }

  render() {

    return (
      <View style={{alignSelf : 'center', marginTop : 100}}>
        <ImagePickerResizer getImageData={this.getImageData} btnText = {'Gallery'} resizeWidth = { 100 } resizeHeight = {100} rotation ={180}/>
       <Image  source={{uri: `data:image/png;base64,${this.state.image}`}} style={{width : 300, height : 300}}/>
      </View>
    );
  }
}

export default test;

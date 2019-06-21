import React, { Component } from 'react';
import {Text, View , TouchableOpacity  } from 'react-native';
import PropTypes from 'prop-types'
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-picker'
import RNFS from 'react-native-fs'



const image_picker_options = {
   title: 'Select Image',
   quantity: 0.5,
   storageOptions: {
      skipBackup: true,
      path: 'images'
   }
};

class ImagePickerResizer extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }
  
   onImagePick = async () => {
      const { dir,getImageData , resizeHeight , resizeWidth , compressFormat , quality , rotation , outputPath} = this.props
      
      ImagePicker.showImagePicker(image_picker_options, async (response) => {
         if (response.didCancel) {
            console.log('User cancelled image picker');
         }
         else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
         }
         else {
    
            ImageResizer.createResizedImage(response.uri, resizeWidth , resizeHeight , compressFormat , quality   )
               .then(async ({ uri }) => {
                  const base64 = await RNFS.readFile(uri, "base64");
                  getImageData(base64)
                  return RNFS.unlink(uri)
                     .then(() => {
                        console.log('FILE DELETED');
                     })
                     .catch((err) => {
                        console.log(err.message)
                     })
               })
               .catch(err => {
                  console.log("Image Resize Error", err);
                  //   return Alert.alert('Unable to resize the photo', 'Check the console for full the error message');
               });
         }
      });
   }

   render() {
     const {onPress,btnText,btnStyle,btnTextStyle , disabled} = this.props
      return (
         <View>
               <TouchableOpacity onPress={this.onImagePick} style={[{borderWidth : 1, borderRadius : 5,backgroundColor : disabled != null && disabled == true ? '#e0e0e0' : 'green'},btnStyle]} >
                  {btnText != null ? 
                  <Text style={btnTextStyle} >{btnText}</Text>
                  :
                  <Text style={btnTextStyle}>Buttton</Text>
                  }
               </TouchableOpacity>
         </View>
      );
   }
}

export default ImagePickerResizer;

ImagePickerResizer.propTypes = {
  btnText :  PropTypes.string,
  btnStyle : PropTypes.object , 
  btnTextStyle : PropTypes.object,
  disabled :  PropTypes.bool,
  resizeWidth : PropTypes.number,
  resizeHeight : PropTypes.number,
  quality : PropTypes.number,
  compressFormat : PropTypes.string,
  rotation : PropTypes.number,
  outputPath : PropTypes.number,
  getImageData : PropTypes.func.isRequired
}

ImagePickerResizer.defaultProps = {
  disabled : false,
  resizeWidth : 720,
  resizeHeight : 1200,
  quality : 79,
  compressFormat : 'JPEG',
  btnTextStyle : {color : 'white',alignSelf : 'center',padding : 10}
}
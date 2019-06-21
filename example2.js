import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import ImagePickerResizer from './App'

class example2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        };
    }

    getImageData = (data) => {
        //upload base64 image to server
        let data = new FormData()
        data.append('dir', 'vendor')
        data.append('image', base64)
        const upload_image = await api.post(`vendor/upload_image`, data)
        const filename = upload_image.data //get return image name from server
        //---------------------------//
        this.setState({
            image: filename
        })
    }

    render() {

        return (
            <View style={{ alignSelf: 'center' }}>
                <ImagePickerResizer getImageData={this.getImageData} btnText={'Gallery'} resizeWidth={100} resizeHeight={100} quality={50} />
                <Image source={{ uri: this.state.image}} style={{ width: 300, height: 300 }} />
            </View>
        );
    }
}

export default example2;

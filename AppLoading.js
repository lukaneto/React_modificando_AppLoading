import React from 'react';
import {Image, View, Text} from 'react-native';
import {Asset} from 'expo-asset';
import AppLoading from 'expo-app-loading';

export default class App extends React.Component{
    
    state={
        isReady:false,
    };

    render(){
        if(!this.state.isReady){
            return(
                <AppLoading
                startAsync = {this._cacheResourcesAsync}
                onFinish={()=>this.setState({isReady:true})}
                onError={console.warn}
                />
            );
        }

        return(
            <View style={{flex:1}}>
                <Image source = {require('../../assets/icon.png')}/>
            </View>
        );
    }

    async _cacheResourcesAsync(){
        const images = [require('../../assets/icon.png')];
        const cacheImages = images.map(image=>{
            return Asset.fromModule(image).downloadAsync();
        });

        return Promise.all(cacheImages);
    }
}

import React, {Component} from 'react';
import { Image, 
        ImageBackground, 
        StyleSheet, 
        Text, 
        TextInput,
        TouchableOpacity, 
        View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            senha: ''
        }
    }

    realizarLogin = async () => {
        console.warn(this.state.email + ' ' + this.state.senha);

        try {
            
            const resposta = await api.post('/login', {
                email : this.state.email,
                senha : this.state.senha,
            });
    
            const token = resposta.data.token;
            
            console.warn(token);
            
            await AsyncStorage.setItem('userToken', token);
            
            this.props.navigation.navigate('main');

        } catch (error) {
            console.warn(error)
        }
    };


    render(){
        return(
            <ImageBackground 

                source={require('../../assets/img/loginMobile.png')}
                style={StyleSheet.absoluteFillObject}>

                <View>style={styles.overlay} 
                <View style={styles.main}>
                    <Image 
                    source={require('../../assets/img/LOGO.png')}
                    style={styles.mainImgLogin}
                    />
                    
                    <TextInput 
                            style={styles.inputLogin}
                            placeholder="EMAIL"
                            placeholderTextColor="#FFF"
                            keyboardType='email-address'
                            onChangeText={email => this.setState({ email })}
                        />

                    <TextInput 
                            style={styles.inputLogin}
                            placeholder="SENHA"
                            placeholderTextColor="#FFF"
                            secureTextEntry={true}

                            onChangeText={senha => this.setState({ senha })}
                        />

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={this.realizarLogin}>
                        <Text style={styles.btnLoginText}>login</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({

    overlay: {
        ...StyleSheet.absoluteFillObject
    },

    main: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    mainImgLogin: {
        height: 150,
        width: 140,
        margin: 60,
        marginTop: 0
    }
});
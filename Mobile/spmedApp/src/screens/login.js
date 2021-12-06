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
            email: 'ricardo.lemos@spmedicalgroup.com.br',
            senha: '1234'
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

                <View style={styles.overlay}/> 
                    <View style={styles.main}>
                            <Image 
                            source={require('../../assets/img/LOGO.png')}
                            style={styles.mainImgLogin}
                            />
                        <View style={styles.box}>


                            
                            <TextInput 
                                    style={styles.inputLogin}
                                    placeholder="Username"
                                    placeholderTextColor="#FFF"
                                    keyboardType='email-address'
                                    onChangeText={email => this.setState({ email })}
                                    />

                            <TextInput 
                                    style={styles.inputLogin}
                                    placeholder="Senha"
                                    placeholderTextColor="#FFF"
                                    secureTextEntry={true}
                                    
                                    onChangeText={senha => this.setState({ senha })}
                                    />

                            <TouchableOpacity
                                style={styles.btnLogin}
                                onPress={this.realizarLogin}>
                                <Text style={styles.btnLoginText}>Login</Text>
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
        // width: '100%',
        height: '90%',
    },

    mainImgLogin: {
        height: 110,
        width: 297,
        margin:40,
        marginTop: 0,
        marginEnd: 0.1,
    },

    box: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        marginBottom: 30,
    },
    
    inputLogin: {
        color: '#000',
        width: 260, //largura mesma do botao
        marginBottom: 50, //espacamento pra baixo
        fontSize: 17,
        borderBottomColor: '000000', //linha separadora
        borderBottomWidth: 1, //espessura.
    },

    btnLogin: {
        fontSize: 19, //aumentar um pouco
        fontFamily: 'Roboto', //troca de fonte
        letterSpacing: 6, //espacamento entre as letras
        textTransform: 'uppercase', //estilo maiusculo
    },
    
    btnLoginText: {
        color: '#000', //mesma cor identidade
        justifyContent: 'center',
        alignItems: 'center',
        height: 37,
        width: 174,
        backgroundColor: '#04ADBF',
        borderRadius: 22,
    }
});
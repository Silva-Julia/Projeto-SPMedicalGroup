import React, { Component } from 'react';
import {FlatList,Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../services/api"
import jwtDecode from 'jwt-decode';

export default class ConsultaPaciente extends Component {
  constructor(props){
    super(props);
      this.state={
        listaConsultas: [],
        nome:'',
      };
    
  }

  listarConsultas = async()=> {
    const token = await AsyncStorage.getItem('userToken');

    if (token != null) {
      const resposta = await api('/Consultas/Paciente', { 
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (resposta.status == 200) {
        this.SetState({
          listaConsultas: resposta.data
        });
      }
    }
  }


  buscarDadosStorage = async () => {
    try {
      const valorToken = await AsyncStorage.getItem('userToken');
      console.warn(jwtDecode(valorToken));

      if (valorToken != null) {
        this.setState({nome: jwtDecode(valorToken).name});
      }
    } catch (error) {
      console.warn(error);
    }
  };



  


  render(){
    return(
        <View style={styles.main}>

          <View style={styles.mainHeader}> </View>
            {/* source={require('../../assets/img/LOGO.png')}
            <Text style={styles.nomeUsuario}> {this.state.nome}</Text> */}
        </View>
  
    );
  }
  
};


const styles = StyleSheet.create({

    main: {
      flex: 1,
    },

    mainHeader: {
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: 60,
    },

    nomeUsuario: {
      fontSize:12,
    },

});
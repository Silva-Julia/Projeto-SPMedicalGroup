import React, { Component } from 'react';
import {FlatList,Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import api from "../services/api"

export default class ConsultaPaciente extends Component {
  constructor(props){
    super(props);
      this.state={
        listaConsultas: [],
        nome: '',
        email: ''
      };
    
  }

  buscarConsultas = async () => {
    const valorToken = await AsyncStorage.getItem('userToken');
    const resposta =  await api.get('/consultas', {
      headers: {
        'Authorization' : 'Bearer ' + valorToken
      }
    });

    const dadosDaApi = resposta.data;
    this.setState({listaConsultas: dadosDaApi});
  };

  buscarDadosStorage = async () => {
    try {
      
      const valorToken = await AsyncStorage.getItem('userToken');
      console.warn( jwtDecode(valorToken) )

      if (valorToken !== null) {
        this.setState({ email : jwtDecode(valorToken).email });
      }

    } catch (error) {
      console.warn(error)
    }
  };

  componentDidMount() {
    this.buscarConsultas();
    this.buscarDadosStorage();
  }


}
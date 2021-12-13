
import api from "../services/api"
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList
} from 'react-native';

import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ConsultaMedico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsulta: [],
      nome: '',
    };
  }

  listarConsultas = async () => {
    const token = await AsyncStorage.getItem('userToken');

    if (token != null) {
      const resposta = await api('/Consultas/Medico', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (resposta.status == 200) {
        const lista = await resposta.data;
        this.setState({
          listaConsulta: lista
        });
        console.warn(this.state.listaConsulta)
      }
    }
  }


  buscarDadosStorage = async () => {
    try {
      const valorToken = await AsyncStorage.getItem('userToken');
      console.warn(jwtDecode(valorToken));

      if (valorToken != null) {
        this.setState({ nome: jwtDecode(valorToken).name });
        console.warn(this.state.nome);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  componentDidMount() {
    this.listarConsultas();
    this.buscarDadosStorage();
  }



  render() {
    return (
      <View style={styles.main}>
          <StatusBar
            hidden={true}
          />

        {/* Cabeçalho - Header */}
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderRow}>
            <Image
              source={require('../../assets/img/LOGO.png')}
              style={styles.mainHeaderImg}
            />
            <Text style={styles.mainHeaderText}> {this.state.nome} </Text>
          </View>
        </View>

        {/* Corpo - Body */}
        <View style={styles.mainBody}>
          <FlatList
            contentContainerStyle={styles.mainBodyContent}
            data={this.state.listaConsulta}
            keyExtractor={item => item.idConsulta}
            renderItem={this.renderItem}
          />
        </View>

      </View>

    );
  }

  renderItem = ({ item }) => (

    <View style={styles.flatItemRow}>
      <View style={styles.flatItemContainer}>
        <Text style={styles.flatItemTitle}>{item.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</Text>
        <Text style={styles.flatItemInfo}>{item.idSituacaoNavigation.descricaoSituacao}</Text>

        <Text style={styles.flatItemData}>
          {Intl.DateTimeFormat("pt-BR", {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: 'numeric', minute: 'numeric', hour12: false
          }).format(new Date(item.dataConsulta))}
        </Text>
        <View style={styles.linha}/>
      </View>

    </View>
  );

};

const styles = StyleSheet.create({

  main: {
    width: '100%',
    height: '100%',
  },

  mainHeader: {
    height: 50,
  },

  mainHeaderRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 50,
    marginTop: 5,
  },

  mainHeaderImg: {
    width: 99,
    height: 35,
  },

  mainHeaderText: {
    fontSize: 14,
    letterSpacing: 5,
    color: '#000',
    marginRight: 35,
    fontFamily: 'TitilliumWeb-Regular',
  },



  // conteúdo do body
  mainBody: {
    backgroundColor: '#04ADBF',
    height: '870%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //conteúdo da lista
  mainBodyContent: {
    marginTop: 30,
    //height: 103,
    width: 290,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
  },

  linha: {
    width:200,
    height:1,
    marginBottom:10,
  },

  flatItemRow: {
    flexDirection: 'row',
    marginTop: 20,
  },

  flatItemContainer: {
    flexDirection: 'column',
    marginHorizontal:30,
    marginBottom: '10%',
  },

  flatItemTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },

  flatItemInfo: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
    fontFamily: 'Roboto-Regular',
  },

  flatItemData: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
    fontFamily: 'Roboto-Regular',
    borderBottomWidth: 1,
  },
});
import React, { Component } from 'react';
import { Image, 
  StyleSheet, 
  Text,  
  View,
  FlatList, } from 'react-native';

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
            keyExtractor={item => item.idUsuario}
            keyExtractor={item => item.idSituacao}
            // renderItem={this.renderItem}
            data={this.state.listaConsultas}
          />
        </View>
    </View>

    );
  }
  
};

  renderItem = ({item}) => (

    <View style={styles.flatItemRow}>
      <View style={styles.flatItemContainer}>
        <Text style={styles.flatItemTitle}>{item.IdMedico}</Text>
        <Text style={styles.flatItemInfo}>{item.DescricaoSituaConsulta}</Text>

        <Text style={styles.flatItemInfo}>
          {Intl.DateTimeFormat("pt-BR", {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: 'numeric', minute: 'numeric', hour12: true
                        }).format(new Date(item.dataEvento))}
        </Text>
      </View>

    </View>
  );


const styles = StyleSheet.create({

  main: {
    height: 70,
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
  },

  mainHeader: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },

  mainHeaderRow: {
    flexDirection: 'row',
  },

  // imagem do cabeçalho
  mainHeaderImg: {
    width: 99,
    height: 35,
    marginLeft: 40,
    marginTop: 10,
  },

  // texto do cabeçalho
  mainHeaderText: {
    fontSize: 14,
    letterSpacing: 5,
    color: '#000',
    marginLeft: 30,
    marginTop: 26,
  },

  // conteúdo do body
  mainBody: {
    // flex: 4,
    backgroundColor: '#04ADBF',
    height:'870%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //conteúdo da lista
  mainBodyContent: {
    height: 103,
    width: 301,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
  },

  flatItemRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 40,
  },

  flatItemContainer: {
    flex: 1,
  },

  flatItemTitle: {
    fontSize: 16,
    color: '#333',
  },

  flatItemInfo: {
    fontSize: 12,
    color: '#999',
    lineHeight: 24,
  },

  flatItemImg: {
    justifyContent: 'center',
  },

  flatItemImgIcon: {
    width: 26,
    height: 26,
    tintColor: '#B727FF',
  },
});
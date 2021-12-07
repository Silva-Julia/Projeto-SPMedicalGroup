import { View } from "react-native";
import api from "../services/api"

export default class ConsultaMedico extends Component {
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
        const resposta = await api('/Consultas/Medico', { 
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
            <View>

            </View>
        )
    }
  
};

const styles = StyleSheet.create({


});
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import CadUser from './pages/CadUser/index';
import Carrinho from './pages/Carrinho/index';
import Home from './pages/Home/index';
import Login from './pages/Login/index';
import Pedidos from './pages/Pedidos/index';
import Produtos from './pages/Produtos/index';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="CadUser" component={CadUser}/>
        <Stack.Screen name="Produtos" component={Produtos}/>
        <Stack.Screen name="Pedidos" component={Pedidos}/>
      </Stack.Navigator>
    </NavigationContainer>
  );  
}

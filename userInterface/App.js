import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/screens/Login';
import Home from './src/screens/Home';

const navigator = createStackNavigator(
  {
    LoginPage: Login,
    HomePage: Home
  },
  {
    initialRouteName: 'LoginPage',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);

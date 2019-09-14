import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/screens/Login';

const navigator = createStackNavigator(
  {
    LoginPage: Login,
  },
  {
    initialRouteName: 'LoginPage',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);

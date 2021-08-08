import './App.css'
import { Route , Switch} from 'react-router-dom'
import Dashbord from './component/DashBoard/dashbord'
import Login from './component/Login/login'
import Error from './component/Error/error'
import UserProvider from './provider/userProvider'


function App() {
  return (
      <>
      <UserProvider>
      <Switch>
        <Route exact path= '/' component={Login}/>
        <Route  path ='/app' component={Dashbord}/>
        <Route  component={Error}/>
      </Switch>
      </UserProvider>
    </>
  );
}

export default App;

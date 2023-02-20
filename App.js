import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig.js';
import Login from './Login';
import CreateAccount from './CreateUser';

import Dashboard from './Dashboard';
import Recipe from './Recipe';
import Schedule from './Schedule';

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b4936"
    },
    secondary: {
      main: "#3b4936"
    }
  }
});


function App() {
  const [user, loading, error] = useAuthState(auth);


  return (
    <div className="App">
      <ThemeProvider theme={theme}>

        <BrowserRouter>
          <Routes>
            <Route path="/login" element={user==null?<Login />:<Navigate to="/main" />} />
            <Route path="/newUser" element={user==null?<CreateAccount />:<Navigate to="/main" />} />
            <Route path="/main" element={user==null?<Navigate to="/login" />:<Dashboard user={user}/>} />
            <Route exact path="/recipe/:id" element={<Recipe />} />
            <Route exact path="/schedule/:id" element={<Schedule user={user}/>} />
            <Route path="*" element={<Navigate to="/main" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

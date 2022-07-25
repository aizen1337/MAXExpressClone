import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from "./pages/landingPage/landingPage";
import LoginPage from "./pages/loginPage/loginPage";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

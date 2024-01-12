import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/homepage';



export const AppRoutes = () => {  
  return (
    <Routes>
      <Route exact path="/" element={ <HomePage/>  } />
    </Routes>
  )
}

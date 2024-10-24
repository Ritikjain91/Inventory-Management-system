import './App.css';
import Navbar from './Components/Navbar.jsx';
import  Form from './Components/Form.jsx'
import Container from 'react-bootstrap/esm/Container.js';
import Checkbox from './Components/Checkbox/Checkbox.jsx'
import Form2 from './Components/Form2/Form2.jsx'


function App() {
  return (
    <div>
      <Navbar/>
      
    <Container >
      <Checkbox/>
    
     <Form />
     <p className='fs-2 text-center fw-bold'>Supplier Details</p>
     <Form2/>
    </Container>
    </div>
  );
}

export default App;

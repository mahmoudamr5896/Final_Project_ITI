import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandExample() {
  return (
    <>
     
      <Navbar className="nav">
        <Container>
          <Navbar.Brand href="#home">
            <img 
              alt=""
              src="Logo.png"
              width="70"
              height="70"
              className="logo"
              style={{backgroundColor:"white"}}
            />{' '}
               Home
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;
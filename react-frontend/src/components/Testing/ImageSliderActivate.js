import ImageSlider from './ImageSlider';
import { SliderData } from '../Pages/SliderData';

import { Navbar, Nav,Container} from 'react-bootstrap';

export default function LoginNavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
<Container>
<Navbar.Brand href="/UserPage">TraveList</Navbar.Brand>
<Nav className="me-auto">
<Nav.Link href="/login"> Login  </Nav.Link>
<Nav.Link href="/signup"> Sign up </Nav.Link>

</Nav>
</Container>
</Navbar>

   <ImageSlider slides={SliderData} />

 </div>   
   

  );

  }


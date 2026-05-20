import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/waldo-logo.png';

export default function Header(){
    // ----- RENDER -----
  return(
    <header>
        <Link to='/'>
          <img src={logo} alt="Where's Waldo site logo"/>
          <h1>Where's <span>Waldo?</span></h1>
        </Link>
    </header>
  );
}
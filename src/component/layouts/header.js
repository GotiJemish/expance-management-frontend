import { Modal, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loginUser, setloginUser] = useState('');
  const [popUp, setPopup] = useState(false)

  const navigate=useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setloginUser(user);
    }
  }, []);

  const logoutConfirm = () => {
    localStorage.removeItem('user');
    // message.success('Logout successfully'); 
    toast.success('Logout successfully',{duration:2000})
    setPopup(false)
    navigate('/login');
    }

 
  const logoutHandler = () => {
    return setPopup(!false)
  }
  
    
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <form className="d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <Link className="navbar-brand" to="/">expance management</Link>
          </div>
        </form>
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item dropdown no-arrow ${isDropdownOpen ? 'show' : ''}`}>
            <div className="nav-link dropdown-toggle" id="userDropdown" role="button" onClick={toggleDropdown} aria-haspopup="true"aria-expanded={isDropdownOpen} >
              <span className="mr-2 d-lg-inline text-gray-600">{loginUser && loginUser.name}</span>
              <img className="img-profile rounded-circle" src="./favicon.ico" alt="User Profile" />
            </div>
            <div
              className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown" >
              <Link  className="dropdown-item" data-toggle="modal" data-target="#logoutModal"  onClick={logoutHandler}>
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
          Logout
        </Link> 
      
            </div>
          </li>
        </ul>
      </nav>



      <Modal show={popUp}>
        <Modal.Header closeButton onClick={()=>setPopup(false)}>
          <Modal.Title>Ready to Leave?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Select "Logout" below if you are ready to end your current session.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setPopup(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={ logoutConfirm}>
          Logout
          </Button>

        </Modal.Footer>
      </Modal>




    </>
  )
}

export default Header;
import React from 'react';
import Header from './header';
import Footer from './footer';
import {Toaster} from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <>
      <Header/>
      <div className='content'>
{children}
      </div>
      <Toaster position='top-center' reverseOrder={false} />
      
      <Footer/>
    </>
     
  )
}

export default Layout;

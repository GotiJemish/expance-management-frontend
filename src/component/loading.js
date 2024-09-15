import React from 'react';
import '../css/loader.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () => {
  return (
    <>

<div className="overflow position-absolute top-50 start-50 w-100 h-100" id="preload">
<div className="position-absolute top-0 start-0 bottom-0 end-0 bg-black opacity-50"></div>
  <div className="circle-line position-absolute top-50 start-50 w-100 d-flex flex-wrap justify-content-center">
    <div className="circle red bg-danger position-relative rounded-circle m-2">&nbsp;</div>
    <div className="circle blue bg-primary position-relative rounded-circle m-2">&nbsp;</div>
    <div className="circle green bg-success position-relative rounded-circle m-2">&nbsp;</div>
    <div className="circle yellow bg-warning position-relative rounded-circle m-2">&nbsp;</div>
  </div>
</div>



    </>
  )
}

export default Loading
import {memo} from 'react';

const Loading = (props) => {


  return (
    <>
       <div className="loader-line" style={{display: !props.status ? "none" : "block"}}></div>
    </>
  )
}

export default memo(Loading);
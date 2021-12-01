import React,{useState} from 'react';
import TwoFactorAuthentication from "../../reuse/setting/TwoFactorAuthentication";

const Component = (props) => {
  return (
    <>
      <TwoFactorAuthentication type="driver" />
    </>
  )
}

export default Component;
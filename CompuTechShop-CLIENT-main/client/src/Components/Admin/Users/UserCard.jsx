import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../Redux/Actions/index';



function Users({given_name, family_name, email, phone}) {


  return (
    <div>
      <span>{given_name}</span>
      <span>{family_name}</span>
      <span>{email}</span>
      <span>{phone}</span>
      <span>VALUE</span>
    </div>
  )
}

export default Users
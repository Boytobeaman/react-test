import React, { useReducer, useEffect, forwardRef } from 'react';
import { login, fake_login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useDeepCompareEffect from "react-use/lib/useDeepCompareEffect";

import { Checkbox } from 'antd';
import { config } from '../../config/config';


const initialState = {
  a: true,
  b: true
};

function reducer(state, action) {
  switch (action.type) {
    case 'a':
      return {...state, a: !state.a};
    case 'b':
      return {...state, b: !state.b};
    default:
      throw new Error();
  }
}

function Index (props, ref){

  const [state, dispatch] = useReducer(reducer, initialState);

  const twoDispatch = () => {

    console.log(`begin dispatch a`)
    dispatch({type: 'a'});
    console.log(`state.a === ${state.a}`)
    console.log(`state.b === ${state.b}`)

    console.log(`begin dispatch b}`)
    dispatch({type: 'b'});
    console.log(`state.a === ${state.a}`)
    console.log(`state.b === ${state.b}`)
    
  }


  useEffect( () => {
    document.getElementById('btn').addEventListener('click', () => {
      twoDispatch()
    })
  },[])


  useEffect( () => {

    console.log(`---triggered useEffect---`)
    console.log(`useEffect state.a === ${state.a}`)
    console.log(`useEffect state.b === ${state.b}`)
  }, [state.a, state.b])
  return (
    <div>
      Test page
      <br/>
       a: 
       <Checkbox checked={state.a}>a</Checkbox>
      <br />
       b: 
       <Checkbox checked={state.b}>b</Checkbox>
      <br />
      <button onClick={() => dispatch({type: 'a'})}>a</button>
      <button onClick={() => dispatch({type: 'b'})}>b</button>
      <br />
      <button onClick={twoDispatch}>twoDispatch (react 事件) （setState 会合并/异步执行）</button>
      <br />
      <button id="btn">rawTwoDispatch （原生 js 事件 addEventListener）（setState 不会合并/同步执行）</button>
    </div>
  )
}

Index = forwardRef(Index);

export default connect(
    state => state.user,
    {
        login,
        fake_login
    }
)(Index);
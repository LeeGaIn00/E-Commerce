import React, { useState, useRef, useEffect, useContext } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint, faLock } from '@fortawesome/free-solid-svg-icons';

// svg
import showIcon from '../assets/img/show-icon.svg'
import hideIcon from '../assets/img/hide-icon.svg'

// styles
import '../assets/scss/login.scss';

// service
import AuthContext from "../service/AuthContext";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const isSuccess = authCtx.isSuccess;
  const firstUpdate = useRef(true);

  const idInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const movePage = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const enteredId = idInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    console.log(enteredId, enteredPassword);

    authCtx.login(enteredId, enteredPassword);
  }

  const togglePass = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const goToReg = (e) => {
    movePage('/register');
  }

  /* login enter event */
  const onKeyPress = (e) => {
    if(e.key === 'Enter') 
      login(e);
  }

  useEffect(() => {
    if (firstUpdate.current) {
        firstUpdate.current = false;
    }
    else {
        if (isSuccess) {
          movePage('/');
        }
    }
  }, [isSuccess]);

  useEffect (() => {
    idInputRef.current.focus();
  })

  return (
    <div className="login-main">
      <div className="title">로그인</div>
      <Form className="login-form">
        <FormGroup>
          <Label for="loginId">
            <FontAwesomeIcon icon={faFingerprint} /> 아이디
          </Label>
          <Input 
            id="loginId"
            name="id"
            placeholder="아이디"
            innerRef={idInputRef}
          />
        </FormGroup>
        <FormGroup>
          <Label for="loginPassword">
            <FontAwesomeIcon icon={faLock} /> 비밀번호
          </Label>
          <Input 
            id="loginPassword"
            name="password"
            placeholder="비밀번호"
            type={showPassword ? 'text' : 'password'}
            innerRef={passwordInputRef}
            onKeyPress={onKeyPress}
          />
          {showPassword ? 
            <img src={hideIcon} className="pwd-eye-i" onClick={togglePass} alt="hide"/>
            : <img src={showIcon} className="pwd-eye-i" onClick={togglePass} alt="show"/>
          }
        </FormGroup>
        <Button onClick={login} >
          로그인
        </Button>
      </Form>
      <div className="login-reg">
        <span>회원이 아니신가요?</span>
        <Button onClick={goToReg}>
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default Login;
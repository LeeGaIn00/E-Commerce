import React, { useState, useRef } from 'react';
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

const Login = () => {
  const idInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const movePage = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredId = idInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    console.log(enteredId, enteredPassword);
  }

  const togglePass = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const goToReg = (e) => {
    movePage('/register');
  }

  return (
    <div className="login-main">
      <div className="title">로그인</div>
      <Form className="login-form" onSubmit={submitHandler}>
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
          />
          {showPassword ? 
            <img src={hideIcon} className="pwd-eye-i" onClick={togglePass} alt="hide"/>
            : <img src={showIcon} className="pwd-eye-i" onClick={togglePass} alt="show"/>
          }
        </FormGroup>
        <Button>
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
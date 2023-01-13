import React, { useState, useRef } from 'react';
import { Form, FormGroup, Label, Input, Button, InputGroup } from 'reactstrap';

// svg
import showIcon from '../assets/img/show-icon.svg'
import hideIcon from '../assets/img/hide-icon.svg'

// styles
import '../assets/scss/register.scss';

const Register = () => {
    const idInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const nameInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredId = idInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;
        const enteredEmail = emailInputRef.current?.value;
        const enteredName = nameInputRef.current?.value;
        const enteredPhone = phoneInputRef.current?.value;

        console.log("id => " + enteredId);
        console.log("password => " + enteredPassword);
        console.log("email => " + enteredEmail);
        console.log("name => " + enteredName);
        console.log("phone => " + enteredPhone);
    }

    const togglePass = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    return (
        <div className="reg-main">
            <div className="title">회원가입</div>
            <Form className="reg-form" onSubmit={submitHandler}>
                <FormGroup>
                    <Label for="regId">
                        아이디
                    </Label>
                    <InputGroup>
                        <Input 
                            id="regId"
                            name="id"
                            placeholder="아이디"
                            innerRef={idInputRef}
                        />
                        <Button>
                            중복검사
                        </Button>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label for="regPassword">
                        비밀번호
                    </Label>
                    <Input 
                        id="regPassword"
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
                <FormGroup>
                    <Label for="regEmail">
                        이메일
                    </Label>
                    <Input 
                        id="regEmail"
                        name="email"
                        placeholder="sample@gmail.com"
                        innerRef={emailInputRef}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="regName">
                        이름
                    </Label>
                    <Input 
                        id="regName"
                        name="name"
                        placeholder="홍길동"
                        innerRef={nameInputRef}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="regPhone">
                        전화번호
                    </Label>
                    <Input
                        id="regPhone"
                        name="phone"
                        placeholder="010-0000-0000"
                        type="tel" 
                        innerRef={phoneInputRef}
                    />
                </FormGroup>
                <Button className="reg-btn">
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default Register;
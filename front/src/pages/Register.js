import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, FormFeedback, FormGroup, Label, Input, Button, InputGroup } from 'reactstrap';
import { useNavigate } from "react-router-dom";

// svg
import showIcon from '../assets/img/show-icon.svg'
import hideIcon from '../assets/img/hide-icon.svg'

// styles
import '../assets/scss/register.scss';

// service
import MemberService from "../service/MemberService";
import AuthContext from "../service/AuthContext";

// regular expressions for fields
const idRegEx = /^.{4,16}$/;
const pwdRegEx = /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/;
const nameRegEx = /^.{2,16}$/;
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegEx = /^\d{2,3}-\d{3,4}-\d{4}$/;
const spaceRegEx = /\s/g;

const Register = (props) => {
    const authCtx = useContext(AuthContext);
    const isSuccess = authCtx.isSuccess;
    const firstUpdate = useRef(true);
    const navigate = useNavigate();

    const idInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const nameInputRef = useRef(null);
    const addressInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    /* 입력 폼 */
    const [id, setId] = useState('');
    const [lastId, setLastId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [lastEmail, setLastEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [formValid, setFormValid] = useState(false);
 
    /* 유효성 검사용 */
    const [idValid, setIdValid] = useState({stat: '', msg: ''});
    const [passwordValid, setPasswordValid] = useState({stat: '', msg: ''});
    const [emailValid, setEmailValid] = useState({stat: '', msg: ''});
    const [nameValid, setNameValid] = useState({stat: '', msg: ''});
    const [addressValid, setAddressValid] = useState({stat: '', msg: ''});
    const [phoneValid, setPhoneValid] = useState({stat: '', msg: ''});

    /* 아이디 입력 */
    const setIdHandler = (e) => {
    setId(e.target.value);
}

    /* 비밀번호 입력 */
    const setPasswordHandler = (e) => {
    setPassword(e.target.value);
}

    /* 이메일 입력 */
    const setEmailHandler = (e) => {
        setEmail(e.target.value);
    }

    /* 이름 입력 */
    const setNameHandler = (e) => {
        setName(e.target.value);
    }

    /* 주소 입력 */
    const setAddressHandler = (e) => {
        setAddress(e.target.value);
    }

    /* 전화번호 입력 */
    const setPhoneHandler = (e) => {
        setPhone(e.target.value);
    }

    /* 아이디 중복 검사 및 유효성 검사*/
    const checkId = (id) => {
    if(id === '')
        setIdValid({stat: 'error', msg: '아이디를 입력하세요'})
    else {
        MemberService.checkId(id).then(res => {
            if(res.data)
                setIdValid({stat: 'error', msg: '사용 중인 아이디입니다'});
            else {
                if(spaceRegEx.test(id))
                    setIdValid({stat: 'error', msg: '공백이 존재합니다'});
                else if(!idRegEx.test(id))
                    setIdValid({stat: 'error', msg: '4자 이상 16자 이하의 한 단어로 입력하세요'});
                else {
                    setLastId(id);
                    setIdValid({stat: 'success', msg: '사용 가능한 아이디입니다'});
                }
            }
        });
    }
}

    /* 이메일 중복 검사 및 유효성 검사*/
    const checkEmail = (email) => {
        if(email === '')
            setEmailValid({stat: 'error', msg: '이메일을 입력하세요'});
        else {
            MemberService.checkEmail(email).then(res => {
                if(res.data)
                    setEmailValid({stat: 'error', msg: '가입된 이메일입니다'});
                else {
                    if(spaceRegEx.test(email))
                        setEmailValid({stat: 'error', msg: '공백이 존재합니다'});
                    else if(!emailRegEx.test(email))
                        setEmailValid({stat: 'error', msg: '이메일을 올바르게 입력하세요'});
                    else {
                        setLastEmail(email);
                        setEmailValid({stat: 'success', msg: '사용 가능한 이메일입니다'});
                    }
                }
            });
        }
    }

    /* 유효성 검사 */
    const formValidation = () => {
        return new Promise(resolve => {
        /* 아이디 */
        if(id === '')
            setIdValid({stat: 'error', msg: '아이디를 입력하세요'});
        else if(spaceRegEx.test(id))
            setIdValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!idRegEx.test(id))
            setIdValid({stat: 'error', msg: '4자 이상 16자 이하의 한 단어로 입력하세요'});
        else if(idValid.stat !== 'success' || (id !== lastId))
            setIdValid({stat: 'error', msg: '중복 검사를 해주세요'});
    
        /* 비밀번호 */
        if(password === '')
        setPasswordValid({stat: 'error', msg: '비밀번호를 입력하세요'});
        else if(spaceRegEx.test(password))
            setPasswordValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!pwdRegEx.test(password))
            setPasswordValid({stat: 'error', msg: '영문, 숫자, 특수문자(!@#$%^&*)를 조합하여 8-20자로 입력하세요'});
        else
            setPasswordValid({stat: 'success', msg: ''});

        /* 이메일 */
        if(email === '')
            setEmailValid({stat: 'error', msg: '이메일을 입력하세요'});
        else if(spaceRegEx.test(email))
            setEmailValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!emailRegEx.test(email))
            setEmailValid({stat: 'error', msg: '이메일을 올바르게 입력하세요'});
        else if(emailValid.stat !== 'success' || (email !== lastEmail))
            setEmailValid({stat: 'error', msg: '중복 검사를 해주세요'});
        
        /* 이름 */
        if(name === '')
            setNameValid({stat: 'error', msg: '이름을 입력하세요'});
        else if(spaceRegEx.test(name))
            setNameValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!nameRegEx.test(name))
            setNameValid({stat: 'error', msg: '이름을 올바르게 입력하세요'});
        else
            setNameValid({stat: 'success', msg: ''});

        /* 주소 */
        if(address === '')
            setPhoneValid({stat: 'error', msg: '주소를 입력하세요'});
        else
            setAddressValid({stat: 'success', msg: ''});

        /* 전화번호 */
        if(phone === '')
        setPhoneValid({stat: 'error', msg: '전화번호를 입력하세요'});
        else if(spaceRegEx.test(phone))
            setPhoneValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!phoneRegEx.test(phone))
            setPhoneValid({stat: 'error', msg: '전화번호를 올바르게 입력하세요'});
        else
            setPhoneValid({stat: 'success', msg: ''});
        window.scrollTo(0, 0);
        resolve("resolved");
        });
    }

    const signUp = async(e) => {
        e.preventDefault();
        await formValidation();
        setFormValid(true);
    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredId = idInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;
        const enteredEmail = emailInputRef.current?.value;
        const enteredName = nameInputRef.current?.value;
        const enteredAddress = addressInputRef.current?.value;
        const enteredPhone = phoneInputRef.current?.value;

        // let member = {
        //     id: enteredId,
        //     password: enteredPassword,
        //     email: enteredEmail,
        //     name: enteredName,
        //     address: '',
        //     phone: enteredPhone
        // };
        // authCtx.signup(member);

        console.log("id => " + enteredId);
        console.log("password => " + enteredPassword);
        console.log("email => " + enteredEmail);
        console.log("name => " + enteredName);
        console.log("address => " + enteredAddress);
        console.log("phone => " + enteredPhone);
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
        else {
            if (isSuccess)
                navigate("/");
                //props.history.push("/");
            else {
                alert("회원가입 오류");
                console.log("isSuccess in Register page => " + authCtx.isSuccess);
            }
        }
    }, [isSuccess]);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
        else {
            if(idValid.stat === 'success' 
            && passwordValid.stat === 'success' 
            && emailValid.stat === 'success' 
            && nameValid.stat === 'success' 
            && addressValid.stat == 'success'
            && phoneValid.stat === 'success') {
                console.log("all success");
                let member = {
                    id: id,
                    password: password,
                    email: email,
                    name: name,
                    address : address,
                    phone: phone
                };
                
                authCtx.signup(member);
            }
            else {
                console.log("not all success");
                setFormValid(false);
            }
        }
    }, [formValid])

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
                            onChange={setIdHandler}
                            valid={idValid.stat === "success"}
                            invalid={idValid.stat === "error"} 
                        />
                        {/* 위치 조정하기 */}
                        <FormFeedback>
                            {idValid.msg}
                        </FormFeedback>
                        <Button onClick={() => checkId(id)}>
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
                        onChange={setPasswordHandler} 
                        valid={passwordValid.stat === "success"}
                        invalid={passwordValid.stat === "error"}
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
                    <InputGroup>
                        <Input 
                            id="regEmail"
                            name="email"
                            placeholder="sample@gmail.com"
                            innerRef={emailInputRef}
                            onChange={setEmailHandler} 
                            valid={emailValid.stat === "success"}
                            invalid={emailValid.stat === "error"} 
                        />
                        <Button onClick={() => checkEmail(email)}>
                            중복검사
                        </Button>
                    </InputGroup>
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
                        onChange={setNameHandler}
                        valid={nameValid.stat === "success"}
                        invalid={nameValid.stat === "error"}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="regAddress">
                        주소
                    </Label>
                    <Input
                        id="regAddress"
                        name="address"
                        placeholder="서울특별시 강남구"
                        type="text" 
                        innerRef={addressInputRef}
                        onChange={setAddressHandler} 
                        valid={addressValid.stat === "success"}
                        invalid={addressValid.stat === "error"} 
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
                        onChange={setPhoneHandler} 
                        valid={phoneValid.stat === "success"}
                        invalid={phoneValid.stat === "error"} 
                    />
                </FormGroup>
                <Button className="reg-btn" onClick={signUp}>
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default Register;
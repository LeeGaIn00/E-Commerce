import React, { useContext, useEffect, useState, useRef  } from "react";
import { FormGroup, Label, Input, Button, InputGroup, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

// styles
import '../assets/scss/mypagecomp.scss';

// service
import MemberService from "../service/MemberService";
import AuthContext from "../service/AuthContext";

// components

// svg
import showIcon from '../assets/img/show-icon.svg'
import hideIcon from '../assets/img/hide-icon.svg'

const pwdRegEx = /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/;
const nameRegEx = /^.{2,16}$/;
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegEx = /^\d{2,3}-\d{3,4}-\d{4}$/;
const spaceRegEx = /\s/g;

/* 마이페이지 */
const EditInfo = (props) => {
    const authCtx = useContext(AuthContext);
    const isSuccess = authCtx.isSuccess;
    const firstUpdate = useRef(true);
    const exPasswordInputRef = useRef(null);
    const newPasswordInputRef = useRef(null);
    const newPasswordAgainInputRef = useRef(null);
    const newEmailInputRef = useRef(null);
    const newNameInputRef = useRef(null);;
    const newAddressInputRef = useRef(null);
    const newPhoneInputRef = useRef(null);
    const movePage = useNavigate();

    /* 정보 변경 */
    const [changePassword, setChangePassword] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changeName, setChangeName] = useState(false);
    const [changeAddress, setChangeAddress] = useState(false);
    const [changePhone, setChangePhone] = useState(false);

    const [isPasswordChange, setIsPasswordChange] = useState(false);
    
    /* 입력 폼 */
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [lastEmail, setLastEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePass = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const changePasswordHandler = (event) => {
        event.preventDefault();
        const enteredExPassword = exPasswordInputRef.current?.value;
        const enteredNewPassword = newPasswordInputRef.current?.value;
        const enteredNewPasswordAgain = newPasswordAgainInputRef.current?.value;

        console.log(newPasswordInputRef.current?.value);
        
        if(enteredExPassword === '' || enteredNewPassword === '' || enteredNewPasswordAgain === '') {
            alert("비밀번호를 입력하세요");
            return;
        }
        else if(spaceRegEx.test(enteredNewPassword)) {
            alert("비밀번호에 공백이 존재합니다");
            return;
        }
        else if(!pwdRegEx.test(enteredNewPassword)) {
            alert("영문, 숫자, 특수문자(!@#$%^&*)를 조합하여 8-20자로 입력하세요")
        }
        else if (enteredNewPassword !== enteredNewPasswordAgain) {
            alert("비밀번호 확인이 올바르지 않습니다");
            return;
        } 
        else {
            authCtx.changePassword(enteredExPassword, enteredNewPassword);
        }
    }

    const checkEmail = (email) => {
        MemberService.checkEmail(email).then(res => {
            if(res.data) 
                alert("가입된 이메일입니다.");
            else
                alert("사용 가능한 이메일입니다.")
                setEmailValid(true);
        });
    }

    const changeEmailHandler = (event) => {
        event.preventDefault();
        const enteredEmail = newEmailInputRef.current?.value;
        
        if(enteredEmail === '') {
            alert("이메일을 입력하세요");
            return;
        }
        else if(spaceRegEx.test(enteredEmail)) {
            alert("이메일에 공백이 존재합니다");
            return;
        }
        else if(!emailRegEx.test(enteredEmail)) {
            alert("이메일을 올바르게 입력하세요")
        }
        else if(!emailValid) {
            alert("중복검사를 해주세요");
            return;
        } 
        else {
            authCtx.changeEmail(enteredEmail);
        }
    }

    const changeNameHandler = (event) => {
        event.preventDefault();
        const enteredName = newNameInputRef.current?.value;
        
        if(enteredName === '') {
            alert("이름을 입력하세요");
            return;
        }
        else if(spaceRegEx.test(enteredName)) {
            alert("이름에 공백이 존재합니다");
            return;
        }
        else if(!nameRegEx.test(enteredName)) {
            alert("이름을 올바르게 입력하세요")
        } 
        else {
            authCtx.changeName(enteredName);
        }
    }

    const changeAddressHandler = (event) => {
        event.preventDefault();
        const enteredAddress = newAddressInputRef.current?.value;
        
        if(enteredAddress === '') {
            alert("주소를 입력하세요");
            return;
        } 
        else {
            authCtx.changeAddress(enteredAddress);
        }
    }

    const changePhoneHandler = (event) => {
        event.preventDefault();
        const enteredPhone = newPhoneInputRef.current?.value;
        
        if(enteredPhone === '') {
            alert("전화번호를 입력하세요");
            return;
        }
        else if(spaceRegEx.test(enteredPhone)) {
            alert("전화번호에 공백이 존재합니다");
            return;
        }
        else if(!phoneRegEx.test(enteredPhone)) {
            alert("전화번호를 올바르게 입력하세요")
        }
        else {
            authCtx.changePhone(enteredPhone);
        }
    }

    useEffect(() => {
        authCtx.getUser();
    }, []);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
        else {
            if (isSuccess) {
                if(isPasswordChange) {
                    authCtx.logout();
                    alert("비밀번호가 변경되었습니다. 다시 로그인하세요");
                    movePage("/");
                }
                // 비밀번호 이외의 정보 변경은 페이지 새로고침만 실행
                else {
                    alert("정보가 변경되었습니다.");
                    window.location.replace(`/mypage/${authCtx.user.id}/0`)
                }
            }
        }
    }, [isSuccess]);

    return (
        <>
        <div className="ei-main">
            <Table>
                <thead>
                    <tr>
                        <th colspan={3}> 기본 회원정보 </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th> 아이디 </th>
                        <td colspan={2}> gain </td>
                    </tr>
                    <tr>
                        <th> 비밀번호 </th>
                        { !changePassword ? 
                            <td> ********** </td> : 
                            <td colSpan={2}> 
                                <div className="ei-info-main">
                                    <FormGroup onSubmit={changePasswordHandler}>
                                        <Label for="regPassword">
                                            현재 비밀번호
                                        </Label>
                                        <Input 
                                            id="regPassword"
                                            name="password"
                                            placeholder="비밀번호"
                                            type={showPassword ? 'text' : 'password'}
                                            innerRef={exPasswordInputRef}
                                        />
                                        {showPassword ? 
                                        <img src={hideIcon} className="pwd-eye-i eye1" onClick={togglePass} alt="hide"/>
                                        : <img src={showIcon} className="pwd-eye-i eye1" onClick={togglePass} alt="show"/>
                                        }
                                        <Label for="regNewPassword">
                                            새 비밀번호
                                        </Label>
                                        <Input 
                                            id="regNewPassword"
                                            name="password"
                                            placeholder="비밀번호"
                                            type={showPassword ? 'text' : 'password'}
                                            innerRef={newPasswordInputRef}
                                        />
                                        {showPassword ? 
                                        <img src={hideIcon} className="pwd-eye-i eye2" onClick={togglePass} alt="hide"/>
                                        : <img src={showIcon} className="pwd-eye-i eye2" onClick={togglePass} alt="show"/>
                                        }
                                        <Label for="regNewPasswordAgain">
                                            새 비밀번호 확인
                                        </Label>
                                        <Input 
                                            id="regNewPasswordAgain"
                                            name="password"
                                            placeholder="비밀번호"
                                            type={showPassword ? 'text' : 'password'}
                                            innerRef={newPasswordAgainInputRef}
                                        />
                                        {showPassword ? 
                                        <img src={hideIcon} className="pwd-eye-i eye3" onClick={togglePass} alt="hide"/>
                                        : <img src={showIcon} className="pwd-eye-i eye3" onClick={togglePass} alt="show"/>
                                        }
                                        <div className="ei-info-btns">
                                            <button onClick={changePasswordHandler}> 변경 </button>
                                            <button onClick={() => setChangePassword(false)}> 취소 </button>
                                        </div>
                                    </FormGroup>
                                    {/* <form onSubmit={changePasswordHandler}>
                                        <div className="ei-info-wrapper">
                                            <div className="ei-info-title">
                                                현재 비밀번호
                                            </div>
                                            <div> <input type='password' ref={exPasswordInputRef}/> </div>
                                        </div>
                                        <div className="ei-info-wrapper">
                                            <div className="ei-info-title">
                                                새 비밀번호
                                            </div>
                                            <div> <input type='password' ref={newPasswordInputRef}/> </div>
                                        </div>
                                        <div className="ei-info-wrapper">
                                            <div className="ei-info-title">
                                                새 비밀번호 확인
                                            </div>
                                            <div> <input type='password' ref={newPasswordAgainInputRef} /> </div>
                                        </div>
                                        <div className="ei-info-btns">
                                            <button type='submit'> 변경 </button>
                                            <button onClick={() => setChangePassword(false)}> 취소 </button>
                                        </div>
                                    </form> */}
                                </div>    
                            </td> }
                            { !changePassword &&
                                <td> <Button onClick={() => setChangePassword(true)}> 비밀번호 변경 </Button></td> }
                    </tr>
                    <tr>
                        <th> 이메일 </th>
                        { !changeEmail ? 
                            <td> {authCtx.user.email} </td> : 
                            <td colSpan={2}> 
                                <div className="ei-info-main">
                                <FormGroup>
                                    <Label for="regEmail">
                                        이메일
                                    </Label>
                                    <InputGroup>
                                        <Input 
                                            id="regEmail" 
                                            name="email" 
                                            placeholder="sample@gmail.com"
                                            innerRef={newEmailInputRef}
                                        />
                                        <Button style= { {borderTopRightRadius:'0.375rem', borderBottomRightRadius:'0.375rem'} } 
                                                onClick={() => checkEmail(newEmailInputRef.current?.value)}>
                                            중복검사
                                        </Button>
                                    </InputGroup>
                                    <div className="ei-info-btns"> 
                                        <button onClick={changeEmailHandler}> 변경 </button> 
                                        <button onClick={() => setChangeEmail(false)}> 취소 </button> 
                                    </div>
                                </FormGroup>
                                    {/* <form onSubmit={changeEmailHandler}>
                                        <div className="ei-info-wrapper">
                                            <div className="ei-info-title">
                                                이메일
                                            </div>
                                            <Input type='text' ref={newEmailInputRef}/>
                                            <Button onClick={() => checkEmail(newEmailInputRef.current?.value)}>
                                                중복검사
                                            </Button> 
                                        </div>
                                        <div className="ei-info-btns"> 
                                            <button type='submit'> 변경 </button> 
                                            <button onClick={() => setChangeEmail(false)}> 취소 </button> 
                                        </div>
                                    </form> */}
                                </div>    
                            </td> }
                            { !changeEmail &&
                                <td> <Button onClick={() => setChangeEmail(true)}> 이메일 변경 </Button></td> }
                    </tr>
                    <tr>
                        <th> 이름 </th>
                        { !changeName ? 
                            <td> {authCtx.user.name} </td> : 
                            <td colSpan={2}> 
                                <div className="ei-info-main">
                                    <FormGroup>
                                        <Label for="regName">
                                            이름
                                        </Label>
                                        <Input 
                                            id="regName" 
                                            name="name" 
                                            placeholder="홍길동" 
                                            innerRef={newNameInputRef}
                                        />
                                        <div className="ei-info-btns"> 
                                            <button onClick={changeNameHandler}> 변경 </button> 
                                            <button onClick={() => setChangeName(false)}> 취소 </button> 
                                        </div>
                                    </FormGroup>
                                    {/* <form onSubmit={changeNameHandler}>
                                        <div className="ei-info-wrapper">
                                            <div className="ei-info-title">
                                                이름
                                            </div>
                                            <div> <input type='text' ref={newNameInputRef}/> </div>
                                        </div>
                                        <div className="ei-info-btns"> 
                                            <button type='submit'> 변경 </button> 
                                            <button onClick={() => setChangeName(false)}> 취소 </button> 
                                        </div>
                                    </form> */}
                                </div>    
                            </td> }
                            { !changeName &&
                                <td> <Button onClick={() => setChangeName(true)}> 이름 변경 </Button></td> }
                    </tr>
                    <tr>
                        <th> 주소 </th>
                        { !changeAddress ? 
                            <td> {authCtx.user.address} </td> : 
                            <td colSpan={2}> 
                                <div className="ei-info-main">
                                    <FormGroup>
                                        <Label for="regAddress">
                                            주소
                                        </Label>
                                        <Input 
                                            id="regAddress" 
                                            name="address" 
                                            placeholder="서울특별시 강남구" 
                                            type="text"
                                            innerRef={newAddressInputRef} 
                                        />
                                        <div className="ei-info-btns"> 
                                            <button onClick={changeAddressHandler}> 변경 </button>
                                            <button onClick={() => setChangeAddress(false)}> 취소 </button> 
                                        </div>
                                    </FormGroup>
                                    {/* <form onSubmit={changeAddressHandler}>
                                        <div className="ei-info-wrapper">
                                            <div className="ei-info-title">
                                                주소
                                            </div>
                                            <div> <input type='text' ref={newAddressInputRef}/> </div>
                                        </div>
                                        <div className="ei-info-btns"> 
                                            <button type='submit'> 변경 </button>
                                            <button onClick={() => setChangeAddress(false)}> 취소 </button> 
                                        </div>
                                    </form> */}
                                </div>    
                            </td> }
                            { !changeAddress &&
                                <td> <Button onClick={() => setChangeAddress(true)}> 주소 변경 </Button></td> }
                    </tr>
                    <tr>
                        <th> 전화번호 </th>
                        { !changePhone ? 
                            <td> {authCtx.user.phone} </td> : 
                            <td colSpan={2}> 
                                <div className="ei-info-main">
                                    <FormGroup>
                                        <Label for="regPhone">
                                            전화번호
                                        </Label>
                                        <Input 
                                            id="regPhone" 
                                            name="phone" 
                                            placeholder="010-0000-0000" 
                                            type="tel" 
                                            innerRef={newPhoneInputRef}
                                        />
                                        <div className="ei-info-btns"> 
                                            <button onClick={changePhoneHandler}> 변경 </button> 
                                            <button onClick={() => setChangePhone(false)}> 취소 </button> 
                                        </div>
                                    </FormGroup>
                                    {/* <form onSubmit={changePhoneHandler}>
                                        <div className="ei-info-wrapper">
                                            <div className="ei-info-title">
                                                전화번호
                                            </div>
                                            <div> <input type='text' ref={newPhoneInputRef}/> </div>
                                        </div>
                                        <div className="ei-info-btns"> 
                                            <button type='submit'> 변경 </button> 
                                            <button onClick={() => setChangePhone(false)}> 취소 </button> 
                                        </div>
                                    </form> */}
                                </div>    
                            </td> }
                            { !changePhone &&
                                <td> <Button onClick={() => setChangePhone(true)}> 전화번호 변경 </Button></td> }
                    </tr>
                </tbody>
            </Table>
        </div>
        </>
    );
}

export default EditInfo;
import React, { useState, useRef } from 'react';
import { Form, Table, Label, Input, Button, Modal, ModalHeader, ModalBody, CloseButton } from 'reactstrap';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// styles
import '../assets/scss/inquiryform.scss';

function InquiryForm(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const product = props.product;
    const mode = props.mode;

    // 이미지
    const [exImgFile, setExImgFile] = useState((props.inquiry && props.inquiry.image.length > 0) ? props.inquiry.image : []); // 기존 리뷰 이미지 리스트 (가변)
    const [deletedFile, setDeletedFile] = useState([]); // 기존 리뷰 이미지 중 삭제된 이미지 리스트
    const [imgFile, setImgFile] = useState([]);
    const [files, setFiles] = useState([]);
    const imgRef = useRef();

    // 폼
    const [titleInput, setTitleInput] = useState(mode === 'create' ? "" : props.inquiry.title);
    const [contentInput, setContentInput] = useState(mode === 'create' ? "" : props.inquiry.content);
    const [isSecret, setIsSecret] = useState(mode === 'create' ? false : props.inquiry.secret);
    const checkToggle = () => setIsSecret(!isSecret);

    const setTitleHandler = (e) => {
        setTitleInput(e.target.value);
    };

    const setContentHandler = (e) => {
        setContentInput(e.target.value);
    };

    const checkNum = (length) => {
        let curLength = exImgFile.length + imgFile.length;
        if(curLength >= 5) {
            alert("파일은 최대 5장까지 첨부 가능합니다!");
            return 0;
        } else if(curLength + length > 5) {
            alert("파일은 최대 5장까지 첨부 가능합니다!");
            return 5 - curLength;
        } else {
            return length;
        }
    };

    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const fileArr = imgRef.current.files;

        let fileURLs = [];
        let filesLength = checkNum(fileArr.length);

        for (let i = 0; i < filesLength; i++) {
            setFiles(files => [...files, fileArr[i]]);
            let reader = new FileReader();
            reader.onload = () => {
                fileURLs[i] = reader.result;
                setImgFile(imgFile => [...imgFile, fileURLs[i]]);
            };
            reader.readAsDataURL(fileArr[i]);
        }
    };

    const removeExImgFile = (imgName, indexToRemove) => {
        setExImgFile([...exImgFile.filter((_, index) => index !== indexToRemove)]);
        setDeletedFile([...deletedFile, imgName])
    };

    const removeImgFile = (indexToRemove) => {
        setImgFile([...imgFile.filter((_, index) => index !== indexToRemove)]);
        setFiles([...files.filter((_, index) => index !== indexToRemove)]);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(!e.target.type.value) {
            alert('유형을 선택해주세요!');
            toggle();
        } else if(!e.target.title.value) {
            alert('제목을 입력해주세요!');
            toggle();
        } else if(!e.target.content.value) {
            alert('내용을 입력해주세요!');
            toggle();
        } else {
            let data = {
                type: e.target.type.value,
                secret: e.target.secret.checked,
                title: e.target.title.value,
                content: e.target.content.value,
                image: '',
                productId: null,
                memberId: null
            }
            mode === "create" ? 
            props.createInquiry(data, files)
            : props.updateInquiry(props.inquiry.id, data, files, exImgFile, deletedFile);
        }
    };

    return (
        <div>
            { mode==="create" ?
                <Button className="create-btn" onClick={toggle}>
                    등록
                </Button>
            :
                <Button className="update-btn" onClick={toggle}>
                    수정
                </Button>
            }
            <Modal 
                isOpen={modal} 
                toggle={toggle}
                backdrop={false}
                keyboard={false}
                fade={false}
                scrollable={true}
            >
                <ModalHeader toggle={toggle} />
                <ModalBody>
                    <div className="prd-info">
                        <div>
                            <img src={product.image} alt="prd-img" />
                        </div>
                        <div>
                            <p>
                                {product.name}
                                <br/>
                                {product.discount}원
                            </p>
                            {product.option1 ? <p>{product.option1}</p> : ''}
                        </div>
                    </div>
                    <Form onSubmit={submitHandler}>
                        <Table borderless>
                            <tbody>
                                <tr className="q-type">
                                    <th scope='row'>
                                        유형
                                    </th>
                                    <td>
                                        <Input name="type" type="radio" value="사이즈" defaultChecked={mode==="update" && props.inquiry.type==="사이즈"}/>
                                        <Label> 사이즈 </Label>
                                        <Input name="type" type="radio" value="배송" defaultChecked={mode==="update" && props.inquiry.type==="배송"}/>
                                        <Label> 배송 </Label>
                                        <Input name="type" type="radio" value="재입고" defaultChecked={mode==="update" && props.inquiry.type==="재입고"}/>
                                        <Label> 재입고 </Label>
                                        <Input name="type" type="radio" value="상품상세" defaultChecked={mode==="update" && props.inquiry.type==="상품상세"}/>
                                        <Label> 상품상세 </Label>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope='row'>
                                        비밀글
                                    </th>
                                    <td>
                                        <Input name="secret" type="checkbox" checked={isSecret} onChange={checkToggle} />
                                    </td>
                                </tr>
                                <tr className="q-title">
                                    <th scope='row'>
                                        제목
                                    </th>
                                    <td>
                                        <Input name="title" type="text" placeholder="제목" value={titleInput} onChange={setTitleHandler} />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope='row'>
                                        내용
                                    </th>
                                    <td>
                                        <Input id="q-content" name="content" type="textarea" placeholder='내용' value={contentInput} onChange={setContentHandler} />
                                        <div className="q-preview" style={{marginBottom: (imgFile.length > 0 || exImgFile.length > 0) ? '20px' : 0}}>
                                            <ul>
                                                {exImgFile.length > 0 &&
                                                    exImgFile.map((img, index) => 
                                                        <li key={index}>
                                                            <img src={`http://localhost:8080/image?name=${encodeURI(img)}`} alt="preview-img" />
                                                            <CloseButton onClick={() => {removeExImgFile(img, index)}}/>
                                                        </li>
                                                    )
                                                }
                                                {imgFile.length > 0 &&
                                                    imgFile.map((img, index) => 
                                                        <li key={index}>
                                                            <img src={img} alt="preview-img" />
                                                            <CloseButton onClick={() => {removeImgFile(index)}}/>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                        <Label for="q-input-file" className="q-lb-file">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Label>
                                        <Input id="q-input-file" name="file" type="file" accept="image/*" onChange={saveImgFile} innerRef={imgRef} multiple />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="btn-box">
                            <Button type="submit" color="primary" onClick={toggle}>
                                {mode==="create" ? "등록" : "수정"}
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                취소
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default InquiryForm;
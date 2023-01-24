import React, { useState, useRef } from 'react';
import { Input, Label, Button, CloseButton } from 'reactstrap';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import StarRating from "../components/StarRating";

// styles
import '../assets/scss/starrating.scss';
import '../assets/scss/reviewform.scss';

function ReviewForm(props) {
    const mode = props.mode;
    const [star, setStar] = useState(props.review ? props.review.star : 0);
    const [content, setContent] = useState(props.review ? props.review.content : '');
    const [exImgFile, setExImgFile] = useState((props.review && props.review.image.length > 0) ? props.review.image : []); // 기존 리뷰 이미지 리스트 (가변)
    const [deletedFile, setDeletedFile] = useState([]); // 기존 리뷰 이미지 중 삭제된 이미지 리스트
    const [imgFile, setImgFile] = useState([]);
    const [files, setFiles] = useState([]);
    const imgRef = useRef();

    const setStarHandler = (num) => {
        setStar(num);
    };

    const setContentHandler = (e) => {
        setContent(e.target.value);
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
    }

    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const fileArr = imgRef.current.files;

        let fileURLs = [];
        // let filesLength = fileArr.length > 5 ? 5 : fileArr.length;
        let filesLength = checkNum(fileArr.length);

        for (let i = 0; i < filesLength; i++) {
            console.log(fileArr[i]);
            setFiles(files => [...files, fileArr[i]]);
            let reader = new FileReader();
            reader.onload = () => {
                fileURLs[i] = reader.result;
                console.log(fileURLs[i]);
                setImgFile(imgFile => [...imgFile, fileURLs[i]]);
            };
            reader.readAsDataURL(fileArr[i]);
        }
    };

    const removeExImgFile = (imgName, indexToRemove) => {
        setExImgFile([...exImgFile.filter((_, index) => index !== indexToRemove)]);
        setDeletedFile([...deletedFile, imgName])
    }

    const removeImgFile = (indexToRemove) => {
        setImgFile([...imgFile.filter((_, index) => index !== indexToRemove)]);
        setFiles([...files.filter((_, index) => index !== indexToRemove)]);
    }

    return (
        <>
            <div className="star-rate">
                <div className="star-title">
                    별점을 매겨주세요
                </div>
                <StarRating setStarHandler={setStarHandler} curStar={mode==="update" ? props.review.star : 0}/>
            </div>
            <Input type="textarea" value={content} onChange={setContentHandler} placeholder='내용' />
            <div className="preview">
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
            <Label for={`input-file-${mode}`} className="input-file-btn">
                <FontAwesomeIcon icon={faPlus} />
            </Label>
            <Input id={`input-file-${mode}`} type="file" accept="image/*" onChange={saveImgFile} innerRef={imgRef} multiple />
            <span>
                {mode === "create" &&
                    <Button onClick={() => props.createReview(star, content, files)}>등록</Button>
                }
                {mode === "update" &&
                    <>
                    <Button onClick={() => props.updateReview(props.review.id, star, content, files, exImgFile, deletedFile)}>수정</Button>
                    <Button onClick={() => props.updateCancel()}>취소</Button>
                    </>
                }

            </span>
        </>
    );
}

export default ReviewForm;
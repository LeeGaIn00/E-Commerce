import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'reactstrap';

// components
import InquiryForm from './InquiryForm';
import Key from "../assets/img/key.png";

// service
import ImageService from '../service/ImageService';
import InquiryService from '../service/InquiryService';

// auth
import AuthContext from "../service/AuthContext";

function InquiryTab(props) {
    // auth
    const authCtx = useContext(AuthContext);
    let isLogin = authCtx.isLoggedIn;

    useEffect(() => {
        if (isLogin) {
            authCtx.getUser();
        }
    }, [isLogin]);

    const product = props.product;
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        product.id &&
        InquiryService.getInquiryList(product.id).then(res => {
            setInquiries(res.data);
        });
    }, [product]);

    const createInquiry = async(data, files) => {
        try {
            if(files.length > 0) {
                const formData = new FormData();
                files.forEach((file) => {
                    formData.append('file', file);
                });
                await ImageService.upload(formData).then(res => {
                    data.image = res.data;
                })
            }
            data.productId = product.id;
            data.memberId = "alice";
            await InquiryService.createInquiry(data).then(res => {
                console.log(res.data);
                window.location.reload();
            })
        } catch {
            alert("문의 작성에 실패하였습니다.");
        }
    };

    const updateInquiry = async(id, data, files, exImgFile, deletedFile) => {
        try {
            /* 이미지 삭제 */
            if(deletedFile.length >= 0) {
                const formData = new FormData();
                formData.append('exImgFile', exImgFile);
                formData.append('deletedFile', deletedFile);
                await ImageService.delete(formData).then(res => {
                    res.data !== null ? data.image = res.data : data.image = '';
                });
                console.log(formData);
            }

            /* 이미지 업로드 */
            if(files.length > 0) {
                const formData = new FormData();
                files.forEach((file) => {
                    formData.append('file', file);
                });
                await ImageService.upload(formData).then(res => {
                    data.image = data.image + res.data;
                    console.log(data.image);
                });
            }

            /* 리뷰 데이터 업데이트 */
            await InquiryService.updateInquiry(id, data).then(res => {
                console.log(res.data);
                window.location.reload();
            });
        } catch {
            alert("문의 수정에 실패하였습니다.");
        }
    }

    const deleteInquiry = async(idToDel) => {
        if (window.confirm("문의를 삭제하시겠습니까?")) {
            await InquiryService.deleteInquiry(idToDel).then(res => {
                if(res.status === 200) {
                    window.location.reload();
                }
            }).catch(error => alert("문의 삭제에 실패하였습니다."));
        }
    }

    const showHandler = (e, id, secret) => {
        if(secret && ((isLogin && authCtx.user.id !== id) || !isLogin)) {
            alert("비밀글입니다");
        } else {
            const elementId = e.currentTarget.id;
            const collapseList = document.getElementsByName(elementId);
            [...collapseList].map((collapse) => 
                collapse.className.indexOf("collapse show") > -1 ? collapse.classList.remove("show") : collapse.classList.add("show")
            );
        }
    }

    return (
        <div className="inq-tab">
            <div className="inq-title">
                <span>Q & A</span>
                <span> 상품문의 (총 {inquiries.length}건) </span>
            </div>
            <InquiryForm mode="create" product={product} createInquiry={createInquiry}/>
            <Table className="inq-tb">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>답변여부</th>
                        <th>구분</th>
                        <th>내용</th>
                        <th>작성자</th>
                        <th>등록일자</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries.map((inquiry) => 
                        <React.Fragment key={inquiry.id}>
                        <tr>
                            <td>{inquiry.id}</td>
                            <td>{inquiry.answer ? "Y" : "N"}</td>
                            <td>{inquiry.type}</td>
                            <td 
                                id={inquiry.id} 
                                className="list-title" 
                                onClick={(e) => showHandler(e, inquiry.memberId, inquiry.secret)}
                            >
                                {inquiry.title} {inquiry.secret ? <img src={Key} alt="secret"/> : null}
                            </td>
                            <td>{inquiry.memberId}</td>
                            <td>{inquiry.createdTime.substr(0, 10)}</td>
                        </tr>
                        {(!inquiry.secret || (isLogin && inquiry.memberId===authCtx.user.id)) &&
                            <tr className="collapse" name={inquiry.id}>
                                <td 
                                    colSpan={isLogin && inquiry.memberId===authCtx.user.id ? 5 : 6} 
                                    style={{borderBottomWidth: inquiry.image.length > 0 ? 0 : 1}}
                                >
                                    {inquiry.content}
                                </td>
                                {(isLogin && inquiry.memberId===authCtx.user.id) && 
                                    <td className="btn-box" style={{borderBottomWidth: inquiry.image.length > 0 ? 0 : 1}}>
                                        <InquiryForm mode="update" product={product} inquiry={inquiry} updateInquiry={updateInquiry}/>
                                        <Button color='danger' onClick={() => deleteInquiry(inquiry.id)}>
                                            삭제
                                        </Button>
                                    </td>
                                }
                            </tr>
                        }
                        {(!inquiry.secret || (isLogin && inquiry.memberId===authCtx.user.id)) && inquiry.image.length > 0 &&
                            <tr className="collapse" name={inquiry.id} style={{borderBottom: "1px solid #dee2e6"}}>
                                    <td style={{borderBottomWidth: 0}} colSpan={6}>
                                        {inquiry.image.map((img, index) => 
                                            <img 
                                                key={index} 
                                                src={`http://localhost:8080/image?name=${encodeURI(img)}`} 
                                                alt="inquiry-img" 
                                                className="image"
                                            />
                                        )}
                                    </td>
                            </tr>
                        }
                        {(!inquiry.secret || (isLogin && inquiry.memberId===authCtx.user.id)) && inquiry.answer &&
                            <tr className="collapse" name={inquiry.id} style={{backgroundColor: "#F2F3F4"}}>
                                <td className="ans-id">
                                    관리자
                                </td>
                                <td colSpan={5} className="ans-txt">
                                    {inquiry.answer}
                                </td>
                            </tr>
                        }
                        </React.Fragment>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default InquiryTab;
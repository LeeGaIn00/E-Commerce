import React from 'react';
import { Table } from 'reactstrap';

function InquiryTab(props) {
    return (
        <div className="inq-tab">
            <div className="write-content">
                <textarea defaultValue='' placeholder='내용'/>
            </div>
            <hr />
            <div className="inq-title">
                <span>Q & A</span>
                <span> 상품문의 (총 3건) </span>
            </div>
            <Table className="inq-tb">
                <thead>
                    <tr>
                    <th>
                        번호
                    </th>
                    <th>
                        답변여부
                    </th>
                    <th>
                        구분
                    </th>
                    <th>
                        내용
                    </th>
                    <th>
                        작성자
                    </th>
                    <th>
                        등록일자
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            Y
                        </td>
                        <td>
                            배송
                        </td>
                        <td>
                            배송 관련 문의입니다.
                        </td>
                        <td>
                            alice
                        </td>
                        <td>
                            2023-01-01
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2
                        </td>
                        <td>
                            Y
                        </td>
                        <td>
                            사이즈
                        </td>
                        <td>
                            교환 부탁드립니다.
                        </td>
                        <td>
                            tom
                        </td>
                        <td>
                            2023-01-01
                        </td>
                    </tr>
                    <tr>
                        <td>
                            3
                        </td>
                        <td>
                            N
                        </td>
                        <td>
                            상품상세
                        </td>
                        <td>
                            당장 환불해주세요
                        </td>
                        <td>
                            john
                        </td>
                        <td>
                            2023-01-01
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default InquiryTab;
import React, { useContext } from "react";
import { Table } from "reactstrap";

// service
import AuthContext from '../service/AuthContext';

const MyPageInquiry = () => {
    const authCtx = useContext(AuthContext);

    return (
        <>
            <Table className="inq-tb">
                <thead>
                    <tr>
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
        </>
    );
}

export default MyPageInquiry;
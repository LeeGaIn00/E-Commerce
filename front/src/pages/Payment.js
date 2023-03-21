import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// service
import AuthContext from '../service/AuthContext';

const Payment = (effect, deps) => {
	const authCtx = useContext(AuthContext);
	const location = useLocation();
	const navigation = useNavigate();
	
	useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
        	document.head.removeChild(jquery);
        	document.head.removeChild(iamport);
        }
    }, []);

	useEffect(() => {
        authCtx.getUser();
    }, [])

    const onClickPayment = () => {
    	const { IMP } = window;
    	IMP.init('imp12754016');

    	const data = {
    		pg: 'html5_inicis',
    		pay_method: 'card',
    		merchant_uid: `mid_${new Date().getTime()}`,
    		name: location.state.productName,
    		amount: location.state.total,
    		custom_data: {
                name: '부가정보',
                desc: '세부 부가정보'
    		},
    		buyer_name: authCtx.user.name,
    		buyer_tel: authCtx.user.phone,
    		buyer_email: authCtx.user.email,
    		buyer_addr: location.state.address,
    		buyer_postalcode: '01234'
    	};

    	IMP.request_pay(data, callback);
    }

    const callback = (response) => {
    	const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} =response;

    	if (success){
    		alert('결제 성공');
    	} else {
    		alert(`결제 실패: ${error_msg}`);
			navigation(-3);
    	}
    }

    return (
        <>
		{onClickPayment()};
        </>
    );
}
export default Payment;
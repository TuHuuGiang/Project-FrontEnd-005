import { useEffect, useState } from "react";

export default function CheckStatus(props) {
    let [loading, setLoading] = useState(true);
    let [status, setStatus] = useState('');

    useEffect(() => {
        checkStatusFunc();
    }, [props.propStatus]);

    let checkStatusFunc = () => {
        if (props.propStatus.toLowerCase().trim() == 'đã hủy') {
            setStatus('status cash');
        } else if (props.propStatus.toLowerCase().trim() == 'chờ xác nhận') {
            setStatus('status order');
        } else if (props.propStatus.toLowerCase().trim() == 'đang xử lý') {
            setStatus('status in-progressing');
        } else if (props.propStatus.toLowerCase().trim() == 'đang giao hàng') {
            setStatus('status shipping');
        } else if (props.propStatus.toLowerCase().trim() == 'đã nhận hàng') {
            setStatus('status complete');
        } else {
            setStatus('status cancel');
        }
        setLoading(false);
    }

    return (
        <>
            <span className={status}>{props.propStatus}</span>
        </> 
    );
}
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { resetPassword } from '../../queries/api/firebase-connect';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const emailRef = useRef();

    async function resetPasswordFunc(e) {
        e.preventDefault();
        try {
            await resetPassword(emailRef.current.value)
            toast.success('Thành công. Kiểm tra email của bạn');
        } catch {
            console.log(emailRef);
            toast.error('Không thành công');
        }
    }

  return (
    <>
      <div className="login-container">
        {/* <h2 className="heading">LẤY LẠI MẬT KHẨU</h2> */}
        <form action="" className="login-form">
          <p>NHẬP EMAIL EMAIL</p>
          <input
            type="text"
            ref={emailRef}
            className="login-email"
            placeholder="Nhập địa chỉ email"
          />
        </form>
        <button
          className="button btn-login button-c-black"
          onClick={(e) => resetPasswordFunc(e)}
        >
          LẤY LẠI MẬT KHẨU
        </button>
        <p>
          ĐĂNG NHẬP <Link to="/login">TẠI ĐÂY</Link>
        </p>
        <p>
          BẠN CHƯA CÓ TÀI KHOẢN. ĐĂNG KÝ <Link to="/register">TẠI ĐÂY</Link>
        </p>
      </div>
    </>
  );
}

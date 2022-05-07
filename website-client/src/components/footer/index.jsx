import logo from '../../assets/img/logo/logo.webp';

export default function Footer() {
    return (
        <>
            <footer className="footer-container">
                <div className="container">
                    <div className="footer">
                        <div className="footer-info">
                            <img src={logo} alt="" />
                                <h4 className="footer-text">
                                    <i className="f-icon fa-solid fa-building"></i>
                                    CÔNG TY TNHH 1 THÀNH VIÊN
                                </h4>
                                <h4 className="footer-text">
                                    <i className="f-icon fa-solid fa-phone"></i>
                                    0392790428
                                </h4>
                                <h4 className="footer-text">
                                    <i className="f-icon fa-solid fa-envelope"></i>
                                    tugiang340@gmail.com
                                </h4>
                        </div>
                        <div className="footer-box">
                            <h5 className="footer-heading">LIÊN HỆ</h5>
                            <div className="footer-content">
                                <h4 className="footer-text">
                                    <i className="f-icon fa-solid fa-shop"></i>
                                    CLOWNZ STORE
                                </h4>
                                <h4 className="footer-text">
                                    <i className="f-icon fa-solid fa-building"></i>
                                    402 Nguyễn Thị Minh Khai, Phường 5, Quận 3, Thành phố Hồ Chí Minh 700000
                                </h4>
                                <h4 className="footer-text">
                                    <i className="f-icon fa-solid fa-truck-fast"></i>
                                    Ship COD toàn quốc
                                </h4>
                                <h4 className="footer-text">
                                    <i className="f-icon fa-solid fa-gift"></i>
                                    FREESHIP đơn hàng từ 700.000
                                </h4>
                            </div>
                        </div>
                        <div className="footer-box">
                            <h5 className="footer-heading">CHÍNH SÁCH</h5>
                            <div className="footer-content">
                                <a href="#" className="footer-link">
                                    CHÍNH SÁCH THÀNH VIÊN
                                </a>
                                <a href="#" className="footer-link">
                                    CHÍNH SÁCH ĐỔI TRẢ
                                </a>
                                <a href="#" className="footer-link">
                                    CHÍNH SÁCH VẬN CHUYỂN
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copy-right">
                <span><b>© Bản quyền thuộc về </b>Clownz Store | <b>TuHuuGiang</b></span>
            </div>
        </>
    );
}
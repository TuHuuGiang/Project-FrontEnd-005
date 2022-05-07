import { connect } from 'react-redux';
import LoginPage from '../../pages/LoginPage';
import { Navigate } from 'react-router-dom';

function PrivateLogin(props) {
    return (
        <>
            {
                props.checkUser.role === 'admin' ? props.children : <Navigate to='/' />
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        checkUser: state.checkUser.user
    };
}

export default connect(mapStateToProps, null)(PrivateLogin);
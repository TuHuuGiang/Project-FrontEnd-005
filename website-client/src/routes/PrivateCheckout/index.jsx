import { connect } from 'react-redux';

import Login from '../../pages/loginPage';

function PrivateCheckout(props) {
    return (
        <>
            {
                props.checkUser.name !== '' ? props.children : <Login />
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        checkUser: state.checkUser.user
    };
}

export default connect(mapStateToProps, null)(PrivateCheckout);
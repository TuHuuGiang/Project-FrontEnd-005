import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateLogin(props) {
  return (
      <>
        {
            props.checkUser.role == 'admin' ? props.children : <Navigate to="/" />
        }
      </>
  );
}

const mapStateToProps = (state) => {
  return {
    checkUser: state.checkUser.user,
  };
};

export default connect(mapStateToProps, null)(PrivateLogin);

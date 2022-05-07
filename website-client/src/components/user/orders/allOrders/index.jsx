import { connect } from 'react-redux';

import TableShow from '../tableShow';

function AllOrders(props) {
    return (
        <>
        <TableShow propOrders={props.infoOrders} />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
      info: state.info.infoUser,
      infoOrders: state.infoOrders.ordersUser,
    };
  };
  
  export default connect(mapStateToProps, null)(AllOrders);
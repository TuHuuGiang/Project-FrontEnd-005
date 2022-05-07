import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import NavOrders  from './Nav';

// import { useEffect, useState } from 'react';
// import {
//   collection,
//   getDocs,
//   doc,
//   updateDoc,
//   setDoc,
//   addDoc,
//   deleteDoc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { db } from '../../queries/apis/firebase-connect';
// import { Date } from 'prismic-reactjs';
// // import { format } from 'date-fns-tz'

export default function Orders(props) {
  // const [loading, setLoading] = useState(false);
  // let [data, setData] = useState([]);

  // useEffect(() => {
  //   getData();
  //   let time = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   clearTimeout(time);
  // }, []);

  // const getData = () => {
  //   let orders = [];
  //   getDocs(collection(db, 'orders')).then((data) => {
  //     data.docs.forEach((doc) => {
  //       orders.push({ ...doc.data(), id: doc.id });
  //     });
  //     setData(orders);
  //     setLoading(true);
  //   });
  // };

  // let delUser = (id) => {
  //   const docRef = doc(db, 'user', id);
  //   updateDoc(docRef, {
  //     isActive: false,
  //   });
  //   getData();
  // };

  return (
    <>
      <div className="wrapper">
        <SideBar />
        <div className="container-product">
          <NavOrders />
          <Outlet />
        </div>
      </div>
    </>
  );
}
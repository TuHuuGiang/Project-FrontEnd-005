import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../queries/api/firebase-connect';
import formatter from '../../../components/format-currency';
import { toast } from 'react-toastify';

function Dashboard() {
  const [loading, setLoading] = useState(false);
  let [data, setData] = useState([]);
  let [toggleE, setToggleE] = useState(false);
  let [toggleA, setToggleA] = useState(false);

  // Add
  let [imgA, setImgA] = useState('');
  let [nameA, setNameA] = useState('');
  let [priceA, setPriceA] = useState('');
  let [quantityA, setQuantityA] = useState(0);
  let [cateA, setCateA] = useState('');

  // Edit
  let [id, setId] = useState();
  let [name, setName] = useState('');
  let [price, setPrice] = useState('');
  let [cate, setCate] = useState('');
  let [nameChange, setNameChange] = useState('');
  let [priceChange, setPriceChange] = useState('');
  let [cateChange, setCateChange] = useState('');

  useEffect(() => {
    getData();
    let time = setTimeout(() => {
      setLoading(false);
    }, 2000);
    clearTimeout(time);
  }, [name, price, cate]);

  const getData = () => {
    let products = [];
    getDocs(collection(db, 'products')).then((data) => {
      data.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setData(products.filter(p => p.isDelete === false));
      setLoading(true);
    });
  };

  let handleModalEdit = (product) => {
    setId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCate(product.cateName);
    setToggleE(!toggleE);
  };

  let handleModalAdd = () => {
    setToggleA(!toggleA);
  };

  let editProduct = () => {
    setName(nameChange);
    setPrice(priceChange);
    setCate(cateChange);
    const docRef = doc(db, 'products', id);
    updateDoc(docRef, {
      name: nameChange,
      price: priceChange,
      cateName: cateChange,
    });
    toast.success('Sửa sản phẩm thành công');
    setToggleE(!toggleE);
  };

  let addProduct = () => {
    const docRef = addDoc(collection(db, 'products'), {
      cateID: 1,
      cateName: cateA,
      name: nameA,
      price: Number(priceA),
      quantity: Number(quantityA),
      imgAvatar: imgA,
      imgArr: [],
      colors: ['pink'],
      sizes: ['S'],
      numViews: 0,
      numSales: 0,
      inComedate: serverTimestamp(),
      isDelete: false,
    });
    toast.success('Thêm sản phẩm thành công');
    setToggleA(!toggleA);
  };

  let delProduct = (id) => {
    const docRef = doc(db, 'products', id);
    updateDoc(docRef, {
      isDelete: true,
    });
    getData();
  };

  return (
    <>
      <div className="container">
        <button className="add-new" onClick={handleModalAdd}>
          <i className="fa-solid fa-plus"></i>
          Add New Product
        </button>
        <table className="table-admin">
          <thead>
            <tr>
              <th>STT</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={p.imgAvatar} alt="" />
                </td>
                <td>{p.name}</td>
                <td>{p.cateName}</td>
                <td>
                  <h3 className="price">{formatter.format(p.price)}</h3>
                </td>
                <td>
                  <i
                    className="icon icon-edit fa-solid fa-pen-to-square"
                    onClick={() => handleModalEdit(p)}
                  ></i>
                  <i
                    className="icon icon-del fa-solid fa-trash"
                    onClick={() => delProduct(p.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add Product */}
        <div className={toggleA ? 'modal-container active-modal' : 'modal-container'}>
          <div className="modal">
            <div className="modal-content">
              <input
                type="file"
                className="url-product"
              />
              <input
                type="text"
                className="url-product"
                placeholder="Nhập url ..."
                onChange={(e) => setImgA(e.target.value)}
              />
              <input
                type="text"
                defaultValue={name}
                className="name-product"
                placeholder="Nhập tên sản phẩm ..."
                onChange={(e) => setNameA(e.target.value)}
              />
              <input
                type="text"
                defaultValue={price}
                className="price-product"
                placeholder="Nhập giá sản phẩm ..."
                onChange={(e) => setPriceA(e.target.value)}
              />
              <input
                type="text"
                className="quantity-product"
                placeholder="Nhập số lượng sản phẩm ..."
                onChange={(e) => setQuantityA(e.target.value)}
              />
              <select className="category" onChange={(e) => setCateA(e.target.value)}>
                <option value="hoodie">Hoodie</option>
                <option value="jacket">Jacket</option>
                <option value="shirt">Shirt</option>
                <option value="tshirt">T-Shirt</option>
                <option value="jean">Jean & Denim</option>
                <option value="pant">Pants</option>
              </select>
            </div>
            <div className="modal-button">
              <button className="edit" onClick={() => addProduct()}>
                Add
              </button>
              <button className="cancel" onClick={handleModalAdd}>
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* End Add Product */}

        {/* <ModalEdit propToggle={toggle} /> */}
        {/* Edit */}
        <div className={toggleE ? 'modal-container active-modal' : 'modal-container'}>
          <div className="modal">
            <div className="modal-content">
              <input type="file" className="image-product" />
              <input
                type="text"
                defaultValue={name}
                className="name-product"
                placeholder="Nhập tên sản phẩm ..."
                onChange={(e) => setNameChange(e.target.value)}
              />
              <input
                type="text"
                defaultValue={price}
                className="price-product"
                placeholder="Nhập giá sản phẩm ..."
                onChange={(e) => setPriceChange(e.target.value)}
              />
              <select className="category" onChange={(e) => setCateChange(e.target.value)}>
                <option value="default">{cate}</option>
                <option value="hoodie">Hoodie</option>
                <option value="jacket">Jacket</option>
                <option value="shirt">Shirt</option>
                <option value="t-shirt">T-Shirt</option>
                <option value="jean">Jean & Denim</option>
                <option value="pant">Pants</option>
              </select>
            </div>
            <div className="modal-button">
              <button className="edit" onClick={() => editProduct()}>
                Edit
              </button>
              <button className="cancel" onClick={handleModalEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* End Edit */}
      </div>
    </>
  );
}

export default Dashboard;

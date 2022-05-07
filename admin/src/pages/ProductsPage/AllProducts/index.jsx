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
import { useEffect, useState, useRef } from 'react';
import { db, storage } from '../../../queries/apis/firebase-connect';
import { connect } from 'react-redux';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import formatter from '../../../components/formatter';
import { fetchProductsApi } from '../../../redux/actions/actions';

function AllProducts(props) {
  const [loading, setLoading] = useState(false);
  let [data, setData] = useState([]);
  let [prods, setProds] = useState([]);
  let [toggleE, setToggleE] = useState(false);
  let [toggleA, setToggleA] = useState(false);

  // Edit And Add Product
  let [img, setImg] = useState();
  let [id, setId] = useState();
  let [name, setName] = useState('');
  let [price, setPrice] = useState('');
  let [cate, setCate] = useState('');
  let [color, setColor] = useState('');
  let [quantity, setQuantity] = useState('');

  let idT = useRef();
  let nameT = useRef();
  let priceT = useRef();
  let colorT = useRef();
  let quantityT = useRef();

  // Add
  let [imgA, setImgA] = useState('');
  let [cateA, setCateA] = useState('');
  let [previewI, setPreviewI] = useState('https://www.chanchao.com.tw/VTG/images/default.jpg');
  let [idA, setIdA] = useState();
  let [nameA, setNameA] = useState('');
  let [colorA, setColorA] = useState('');
  let [priceA, setPriceA] = useState();
  let [quantityA, setQuantityA] = useState();


  useEffect(() => {
    setProducts();
    let time = setTimeout(() => {
      setLoading(false);
    }, 2000);
    clearTimeout(time);
  }, [name, price, cate, img, props.productsApi]);

  let setProducts = () => {
    let data = props.productsApi.filter((prod) => prod.isDelete === false && prod.quantity > 0);
    setProds(data);
  };

  const getData = () => {
    let products = [];
    getDocs(collection(db, 'products')).then((data) => {
      data.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setData(products.filter((p) => p.isDelete === false));
      props.fetchProductsApi(products);
      setLoading(true);
    });
  };

  let handleModalEdit = (product) => {
    console.log(product.name);
    setPreviewI(product.imgAvatar);
    setImg(product.imgAvatar);
    setId(product.id);
    setName(product.name);
    setColor(product.colors[0]);
    setQuantity(product.quantity);
    setPrice(product.price);
    setCate(product.cateName);
    setToggleE(!toggleE);
  };

  let handleModalAdd = () => {
    setToggleA(!toggleA);
  };

  let editProduct = async () => {
    // const docRef = doc(db, 'products', id);
    // await updateDoc(docRef, {
    //   imgAvatar: img,
    //   imgArr: [img],
    //   name: nameT.current.value || name,
    //   colors: [colorT.current.value] || [color],
    //   price: Number(priceT.current.value) || Number(price),
    //   quantity: Number(quantityT.current.value) || Number(quantity),
    //   cateName: cateA || cate,
    // });
    // console.log('Thành công 22');

    if (imgA == '') {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        imgAvatar: img,
        imgArr: [img],
        name: nameT.current.value || name,
        colors: [colorT.current.value] || [color],
        price: priceT.current.value || price,
        quantity: Number(quantityT.current.value) || Number(quantity),
        cateName: cateA || cate,
      });
      console.log(quantityT.current.value);
      getData();
      setPreviewI('https://www.chanchao.com.tw/VTG/images/default.jpg');
      console.log('Thành công 22');
    } else {
      const imageRef = await ref(storage, `${cateA}/${imgA.name}`);
      console.log('imageRef', imageRef);
      await uploadBytes(imageRef, imgA)
        .then(async () => {
          await getDownloadURL(imageRef)
            .then(async (url) => {
              const docRef = doc(db, 'products', id);
              updateDoc(docRef, {
                imgAvatar: url,
                imgArr: [url],
                name: nameT.current.value || name,
                colors: [colorT.current.value] || [color],
                price: priceT.current.value || price,
                quantity: Number(quantityT.current.value) || Number(quantity),
                cateName: cateA || cate,
              });
              getData();
              setPreviewI('https://www.chanchao.com.tw/VTG/images/default.jpg');
              setImgA('');
              console.log('Thành công 21');
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
    getData();
    setToggleE(!toggleE);
  };

  let addProduct = async () => {
    const imageRef = await ref(storage, `${cateA}/${imgA.name}`);
    console.log('imageRef', imageRef);
    await uploadBytes(imageRef, imgA)
      .then(async () => {
        await getDownloadURL(imageRef)
          .then(async (url) => {
            await addDoc(collection(db, 'products'), {
              cateID: idA,
              cateName: cateA,
              name: nameA,
              price: Number(priceA),
              quantity: Number(quantityA),
              imgAvatar: url,
              imgArr: [url],
              colors: [colorA],
              sizes: ['S', 'M', 'L'],
              numViews: 0,
              numSales: 0,
              inComedate: serverTimestamp(),
              isDelete: false,
            });
            getData();
            idT.current.value = '';
            nameT.current.value = '';
            colorT.current.value = '';
            priceT.current.value = '';
            quantityT.current.value = '';
            setPreviewI('https://www.chanchao.com.tw/VTG/images/default.jpg');
            setImgA('');
            console.log('Thành công');
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch((e) => {
        console.log(e.message);
      });
    setToggleA(!toggleA);
  };

  let imageHandler = (e) => {
    let render = new FileReader();
    render.onload = () => {
      if (render.readyState === 2) {
        setPreviewI(render.result);
      }
    };
    render.readAsDataURL(e.target.files[0]);
    setImgA(e.target.files[0]);
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
      <button className="add-new" onClick={handleModalAdd}>
        <i className="fa-solid fa-plus"></i>
        Add New Product
      </button>
      <table className="table-admin">
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {data == ''
            ? prods.map((p, index) => (
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
                    <h3 className="price">{p.quantity}</h3>
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
              ))
            : data.map((p, index) => (
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
                    <h3 className="price">{p.quantity}</h3>
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
            <div className="preview-image">
              <img src={previewI} alt="" />
              <label htmlFor="file">
                <i class="icon-plus fa-solid fa-plus"></i>
              </label>
            </div>
            <input
              type="file"
              id="file"
              className="url-product"
              onChange={(e) => imageHandler(e)}
            />
            <input
              type="text"
              ref={idT}
              className="name-product"
              placeholder="Nhập id ..."
              onChange={(e) => setIdA(e.target.value)}
            />
            <input
              type="text"
              ref={nameT}
              className="name-product"
              placeholder="Nhập tên sản phẩm ..."
              onChange={(e) => setNameA(e.target.value)}
            />
            <input
              type="text"
              ref={colorT}
              className="price-product"
              placeholder="Nhập màu ..."
              onChange={(e) => setColorA(e.target.value)}
            />
            <input
              type="text"
              ref={priceT}
              className="price-product"
              placeholder="Nhập giá sản phẩm ..."
              onChange={(e) => setPriceA(e.target.value)}
            />
            <input
              type="text"
              ref={quantityT}
              className="quantity-product"
              placeholder="Nhập số lượng sản phẩm ..."
              onChange={(e) => setQuantityA(e.target.value)}
            />
            <select className="category" onChange={(e) => setCateA(e.target.value)}>
              <option value="hoodie">Hoodie</option>
              <option value="jacket">Jacket</option>
              <option value="shirt">Shirt</option>
              <option value="t-shirt">T-Shirt</option>
              <option value="jean">Jean</option>
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
            <div className="preview-image">
              <img src={previewI} alt="" />
              <label htmlFor="file">
                <i class="icon-plus fa-solid fa-plus"></i>
              </label>
            </div>
            <input
              type="file"
              id="file"
              className="url-product"
              onChange={(e) => imageHandler(e)}
            />
            {/* <input type="file" className="image-product" /> */}
            <input
              type="text"
              ref={nameT}
              defaultValue={name}
              value={name}
              className="name-product"
              placeholder="Nhập tên sản phẩm ..."
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              ref={colorT}
              defaultValue={color}
              value={color}
              className="price-product"
              placeholder="Nhập màu sản phẩm ..."
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              type="text"
              ref={priceT}
              defaultValue={price}
              value={price}
              className="price-product"
              placeholder="Nhập giá sản phẩm ..."
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              ref={quantityT}
              defaultValue={quantity}
              value={quantity}
              className="price-product"
              placeholder="Nhập số lượng sản phẩm ..."
              onChange={(e) => setQuantity(e.target.value)}
            />
            <select className="category" onChange={(e) => setCateA(e.target.value)}>
              <option value="default">{cate}</option>
              <option value="hoodies">Hoodie</option>
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
            <button className="cancel" onClick={() => setToggleE(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* End Edit */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    productsApi: state.productsApi.productAPI,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsApi: (product) => dispatch(fetchProductsApi(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);

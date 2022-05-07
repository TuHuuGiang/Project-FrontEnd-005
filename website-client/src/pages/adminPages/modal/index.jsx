import { useEffect, useState } from 'react';

export default function ModalEdit(props) {
  let [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(props.propToggle);
    console.log(toggle);
  }, [props.propToggle]);

  let cancelModal = () => {
    setToggle(!toggle);
    console.log(toggle);
  };

  return (
    <>
      <div className={toggle ? 'modal-container active-modal' : 'modal-container'}>
        <div className="modal">
          <div className="modal-content">
            <input type="file" className="image-product" />
            <input type="text" className="name-product" placeholder="Nhập tên sản phẩm ..." />
            <select className="category">
              <option value="hoodie">Hoodie</option>
              <option value="jacket">Jacket</option>
              <option value="shirt">Shirt</option>
              <option value="tshirt">T-Shirt</option>
              <option value="jean">Jean & Denim</option>
              <option value="pant">Pants</option>
            </select>
            <input type="text" className="price-product" placeholder="Nhập giá sản phẩm ..." />
          </div>
          <div className="modal-button">
            <button className="edit">Edit</button>
            <button className="cancel" onClick={cancelModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

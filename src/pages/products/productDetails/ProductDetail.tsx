import React, { useEffect, useState } from 'react';
import './productDetail.scss'
import { useParams } from 'react-router-dom';
import apis from '@/services/apis';
import { message } from 'antd';

interface Product {
  id: string;
  name: string;
  avatar: string;
  price: number;
  des: string;
  categoryId: string;
  productPictures: {
    id: string;
    path: string;
  }[];
}
interface CartItem {
  productId: string;
  quantity: number;
}
function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      apis.productApi
        .findById(id)
        .then((response) => {
          setProduct(response.data.data);
          setSelectedImage(response.data.data.avatar)
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API:', error);
        });

    }



  }, [id]);

  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (smallImgSrc: string) => {
    setSelectedImage(smallImgSrc);
  };
  function handleAddToCart(productId: string, quantity: number) {
    let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
    if (carts.length == 0) {
      // cart rỗng
      carts.push({
        productId,
        quantity
      });
      message.success("addToCartSuccess");
    } else {
      // cart có sản phẩm
      let flag: boolean = false;
      carts = carts.map(item => {
        if (item.productId == productId) {
          message.success("addToCartSuccess");
          item.quantity += quantity
          flag = true;
        }
        return item
      })
      if (!flag) {
        carts.push({
          productId,
          quantity
        })
        message.success("addToCartSuccess");
      }
    }
    localStorage.setItem("carts", JSON.stringify(carts))
  }
  return (
    <div className="hero">
      <div className="row">
        <div className="col">
          <div className="slider">
            <div className="product">
              {
                product?.productPictures.map(img => (
                  <img
                    src={img.path}
                    alt=""
                    onClick={() => handleImageClick(img.path)}
                  />))
              }
            </div>
            <div className="preview">
              <img src={selectedImage} id="imagebox" alt="" />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="detail">
            <h2> {product?.name}</h2>

            <p className="price">${product?.price}</p>
            <p>
              Des:
              {product?.des}
            </p>
            <p>
              <div className="flex ">
                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512" onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1)
                  }
                }}
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <span className="mx-2 border text-center w-8">{quantity}</span>
                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512" onClick={() => setQuantity(quantity + 1)}
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </div>
            </p>
            <button type="button" onClick={() => handleAddToCart((product as Product).id, quantity)}>
              <i className="fa fa-shopping-cart"></i>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

import './product.scss'
import { useEffect, useState } from 'react';
import apis from '@/services/apis';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

interface Product {
  stt: number;
  id: string;
  name: string;
  avatar: string;
  price: GLfloat;
  des: string;
  active: boolean;
}

interface CartItem {
  productId: string;
  quantity: number;
}
export default function Product() {

  const [products, setProducts] = useState<Product[]>([]);
  const [maxItemPage, setMaxItemPage] = useState(8);
  const [skipItem, setSkipItem] = useState(0);
  const [maxPage, setMaxPage] = useState<any[]>([]);
  const currentPage = Math.ceil(skipItem / maxItemPage);

  useEffect(() => {
    apis.productApi.findMany(maxItemPage, skipItem)
      .then(res => {
        if (res.status == 200) {
          let maxPageArr: any[] = [];
          for (let i = 0; i < res.data.maxPage; i++) {
            maxPageArr.push({
              number: Number(i) + 1,
              skip: res.data.data.length * Number(i)
            })
          }
          setMaxPage(maxPageArr);
          setSkipItem(res.data.data.length)
          setProducts(res.data.data)
        }
      })
  }, [])

  function changePage(pageItemObj: any) {
    apis.productApi.findMany(maxItemPage, pageItemObj.skip)
      .then(res => {
        if (res.status == 200) {
          let maxPageArr: any[] = [];
          for (let i = 0; i < res.data.maxPage; i++) {
            maxPageArr.push({
              number: Number(i) + 1,
              skip: res.data.data.length * Number(i)
            })
          }
          setMaxPage(maxPageArr);
          setSkipItem(pageItemObj.skip)
          setProducts(res.data.data)
        }
      })
  }
  async function handleAddToCart(productId: string) {
    let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
    if (carts.length == 0) {
      // cart rỗng
      carts.push({
        productId,
        quantity: 1
      })
    } else {
      // cart có sp
      let flag: boolean = false;
      carts = carts.map(item => {
        if (item.productId == productId) {
          item.quantity += 1
          flag = true;
        }
        return item
      })
      if (!flag) {
        carts.push({
          productId,
          quantity: 1
        })
      }
    }
    await localStorage.setItem("carts", JSON.stringify(carts))

  }

  
  return (
    <div className="products" id="Products">

      <div className='container_card'>

        <div className='listcard'>
          <div className="box">
            {products.map((product, index) => (
              <div className="card">
                <div className="small_card">
                  <i className="fa-solid fa-heart" />
                  <i className="fa-solid fa-cart-shopping" onClick={() => {
                    handleAddToCart(product.id)
                    console.log("handleAddToCart(product?.id)", handleAddToCart(product.id));

                  }} />
                </div>
                <div className="image">
                  <img src={product.avatar} />
                </div>
                <div className="products_text">
                  <h2>{product.name}</h2>
                  <p>{product.des}</p>
                  <h3>${product.price}</h3>

                  <Link to={product.id} className="btn">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <br />
          <div className='page_box'>
            <FaAngleLeft />
            {maxPage.map(item => (
              <Button
                key={item.number}
                className={`item_page ${currentPage + 1 == item.number ? 'active' : ''}`}
                onClick={() => changePage(item)}
              >
                {item.number}
              </Button>
            ))}
            <FaAngleRight />
          </div>
        </div>
      </div>

    </div>

  )
}

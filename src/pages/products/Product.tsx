import './product.scss'
import { useEffect, useState } from 'react';
import apis from '@/services/apis';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Button } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { StoreType } from '@/stores';
import { useDispatch, useSelector } from 'react-redux';

interface Product {
  stt: number;
  id: string;
  name: string;
  avatar: string;
  price: GLfloat;
  des: string;
  active: boolean;
  categoryId: string
}


interface Category {
  id: string,
  title: string
}

interface CartItem {
  productId: string,
  quantity: number
}
interface CategoryWithProductCount {
  id: string,
  title: String,
  updateAt: Date,
  count: number
}

export default function Product() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [maxItemPage, setMaxItemPage] = useState(4);
  const [skipItem, setSkipItem] = useState(0);
  const [maxPage, setMaxPage] = useState<any[]>([]);
  const currentPage = Math.ceil(skipItem / maxItemPage);
  const [isLoading, setIsLoading] = useState(false);

  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useDispatch();
  const store = useSelector(store => store) as StoreType;
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
          // setSkipItem(res.data.data.length)
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
      carts.push({
        productId,
        quantity: 1
      })
    } else {
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

  let filteredProducts = products;
  if (categoryId) {
    filteredProducts = products.filter(product => product.categoryId === categoryId);
  }
  const [categories, setCategories] = useState<CategoryWithProductCount[]>([]); // Cập nhật kiểu dữ liệu
  useEffect(() => {
    setIsLoading(true);
    apis.categoryApi.findMany()
      .then(res => {
        if (res.status === 200) {
          const categoriesWithCount = res.data.data.map((category: any) => {
            return {
              ...category,
              count: 0
            };
          });
          setCategories(categoriesWithCount);

          categoriesWithCount.forEach((category: { id: string; }) => {
            apis.productApi.findByCategory(category.id)
              .then((res: { status: number; data: { data: string | any[]; }; }) => {
                if (res.status === 200) {
                  const productCount = res.data.data.length;
                  setCategories(prevCategories => prevCategories.map(prevCategory => {
                    if (prevCategory.id === category.id) {
                      return {
                        ...prevCategory,
                        count: productCount
                      };
                    }
                    return prevCategory;
                  }));
                }
              })
              .catch((err: any) => {
              });
          });
        }
      })
      .catch(err => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  console.log("categories", categories);


  return (


    <div className="products" id="Products">

      <div className='container_card'>
        <div style={{
          display: "flex",
          gap: "30px",
          marginBottom: "20px",
          position: "relative",
          // left: "40px",
        }}>          <span onClick={() => navigate(`/products`)}>Clear Filter</span>
          {categories.map((category, index) => (
            <span className='active' key={Math.random() * Date.now()} onClick={() => navigate(`/products/${(category).id}`)}>
              {(category).title}
            </span>
          ))}
        </div>
        <div className='listcard'>
          <div className="box">
            {filteredProducts.map((product, index) => (
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
                  {/* <h2>{product.}</h2> */}

                  {/* <p>{product.des}</p> */}
                  <h3>${product.price}</h3>

                  <Link to={"/detail/" + product.id} className="btn">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <br />
          <div className='page_box' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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

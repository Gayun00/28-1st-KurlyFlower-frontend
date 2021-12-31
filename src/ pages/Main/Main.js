import React, { useEffect, useState } from 'react';
import './Main.scss';
import MainProducts from './MainProducts/MainProducts';
import Banner from './Banner/Banner';
import Nav from './Nav/Nav';
import LoadMoreProducts from './LoadMoreProducts/LoadMoreProducts';
import Skeleton from './Skeleton/Skeleton';

function Main() {
  const [productsList, setProductsList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);

  async function fetchProductsData(pageNum) {
    if (pageNum < 5) {
      const response = await fetch(`/data/main/MainProductList${pageNum}.json`);
      const data = await response.json();
      setProductsList([...productsList, ...data]);
      // console.log(productsList);
    }
  }

  useEffect(() => {
    const loadFirstTime = async () => {
      // setIsLoading(true);
      // console.log(isLoading);
      await fetchTimeDelay(1000);
      await fetchProductsData(page);
      // setIsLoading(false);
      // console.log(isLoading);
      // console.log(page);
    };
    loadFirstTime();
  }, [page]);

  function fetchTimeDelay(time) {
    new Promise(resolve => setTimeout(resolve, time));
  }

  function addCart(product) {
    setCartList([...cartList, product.id]);
  }

  return (
    <>
      <div className="main">
        <Nav cartCount={cartList.length} />
        {/* 테스트를 위해 임시로 만든 Nav 컴포넌트 */}
        <Skeleton />
        <Banner />
        {productsList.map((products, idx) => (
          <MainProducts
            key={idx}
            products={products}
            addCart={addCart}
            cartList={cartList}
          />
        ))}
      </div>
      <LoadMoreProducts setPage={setPage} />
    </>
  );
}

export default Main;

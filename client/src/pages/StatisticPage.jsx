import { useEffect, useState } from "react";
import Header from "../components/header/Header.jsx";
import StatisticCard from "../components/statistics/StatisticCard.jsx";
// import { Pie } from '@ant-design/plots';


// const DemoPie = () => {
//   const config = {
//     data: [
//       { type: 'iPhone', value: 4 },
//       { type: 'Watch', value: 2 },
//       { type: 'Aksesuar', value: 7 },
//       { type: 'iMac', value: 4 },
//       { type: 'Macbook', value: 5 },
//       { type: 'iPad', value: 7 },
//     ],
//     angleField: 'value',
//     colorField: 'type',
//     label: {
//       text: 'value',
//       style: {
//         fontWeight: 'bold',
//       },
//     },
//     legend: {
//       color: {
//         title: false,
//         position: 'right',
//         rowPadding: 5,
//       },
//     },
//   };
//   return <Pie {...config} />;
// };

const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("posUser"))



  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const asyncFetch = () => {

    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };


  const totalAmount = () => {
    const amount = data.reduce((total, item) => parseFloat(item.totalAmount) + total, 0);
    return `${amount.toFixed(2)}₺`;
};


  return (
    <>
      <Header />
      <div className="px-6 md:pb-0 pb-20">
        <h1 className="text-4xl font-bold text-center my-4">İstatistiklerim</h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş geldin{" "}
            <span className="text-green-700 font-bold text-xl">{user.username}</span>.
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={data?.length}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={totalAmount()}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={data?.length}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products?.length}
              img={"images/product.png"}
            />
          </div>
        </div>
      </div>
      <div className=" w-1/2 text-center items-center flex mx-auto h-80">
      {/* <DemoPie /> */}

      </div>
    </>
  );
};
export default StatisticPage;
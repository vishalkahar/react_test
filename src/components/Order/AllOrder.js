import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import OrderAPI from "./OrderAPI";

// import { useHistory } from "react-router-dom";

const Order = () => {
  //   const history = useHistory();

  const [orderData, setOrderData] = useState(OrderAPI);

  const OrderLists = async () => {
    try {
      const res = await fetch(
        "https://order-pizza-api.herokuapp.com/api/orders",
        {
          //   crossDomain: true,
          //   mode: "no-cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ccess-Control-Allow-Headers": "Content-Type",
            // credentials: "include",
          },
        }
      );

      const data = await res.json();
      console.log(data);
      setOrderData({
        ...orderData,
        data,
      });
      if (!res.status === 200 || !data) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (e) {
      console.log(e);
      //   history.push("/");
    }
  };
  const deleteOrder = async (id) => {
    console.log(id);
    try {
      const res = await fetch(
        `https://order-pizza-api.herokuapp.com/api/orders/${id}`,
        {
          //   crossDomain: true,
          //   mode: "no-cors",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ccess-Control-Allow-Headers": "Content-Type",
          },
        }
      );

      const data = await res.json();
      if (data) {
        alert("Delete Succefully");
        setOrderData({
          ...orderData,
          orderData,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    OrderLists();
  }, []);

  const OrderList = ({ list }) => {
    const { Crust, Flavor, Order_ID, Size, Table_No } = list;

    return (
      <>
        {
          <tr>
            <th scope="row">{Order_ID}</th>
            <td>{Crust}</td>
            <td>{Flavor}</td>
            <td>{Size}</td>
            <td>{Table_No}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => deleteOrder(Order_ID)}
              >
                Delete
              </button>
            </td>
          </tr>
        }
      </>
    );
  };
  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row my-5 justify-content-center">
            <div className="col-10 mx-auto">
              <NavLink
                exact
                activeClassName="active_class"
                className="btn btn-primary"
                to="/create_order"
              >
                New Order
              </NavLink>
            </div>
            <div className="col-10 mx-auto">
              <h4 className="text-center">Order List</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Order_ID</th>
                    <th scope="col">Crust</th>
                    <th scope="col">Flavor</th>
                    <th scope="col">Size</th>
                    <th scope="col">Table_No</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.length ? (
                    orderData.map((curElem, index) => {
                      return <OrderList list={curElem} key={index} />;
                    })
                  ) : (
                    <tr>
                      <td colspan="5" align="center">
                        No Order Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;

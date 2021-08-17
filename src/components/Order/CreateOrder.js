import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateOrder = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    Crust: "",
    Flavor: "",
    Size: "",
    Table_No: "",
  });

  const handelInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const saveForm = async (e) => {
    e.preventDefault();

    const { Crust, Flavor, Size, Table_No } = userData;

    if (!Crust || !Flavor || !Size || !Table_No) {
      alert("Please fill all data");
      return false;
    }

    const res = await fetch(
      "https://order-pizza-api.herokuapp.com/api/orders",
      {
        crossDomain: true,
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ Crust, Flavor, Size, Table_No }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      console.log("message not send");
    } else {
      alert("save successfull");
      setUserData({ ...userData, message: "" });
      history.push("/order");
    }
  };
  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row my-5 justify-content-center">
            <div className="col-4">
              <form className="row g-3" method="POST">
                <div className="col-md-12">
                  <label htmlFor="Crust" className="form-label">
                    Crust
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Crust"
                    name="Crust"
                    value={userData.Crust}
                    onChange={handelInput}
                    autoComplete="off"
                    placeholder="Your Crust"
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="Flavor" className="form-label">
                    Flavor
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Flavor"
                    name="Flavor"
                    value={userData.Flavor}
                    onChange={handelInput}
                    autoComplete="off"
                    placeholder="Your Flavor"
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="Size" className="form-label">
                    Size
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Size"
                    name="Size"
                    value={userData.Size}
                    onChange={handelInput}
                    autoComplete="off"
                    placeholder="Your Size"
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="Table_No" className="form-label">
                    Table_No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Table_No"
                    name="Table_No"
                    value={userData.Table_No}
                    onChange={handelInput}
                    autoComplete="off"
                    placeholder="Your Table_No"
                  />
                </div>
                <div className="col">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    name="save"
                    value="Save"
                    onClick={saveForm}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateOrder;

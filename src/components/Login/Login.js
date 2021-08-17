import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: "test",
    password: "test",
  });

  const handelInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const loginForm = async (e) => {
    e.preventDefault();

    const { username, password } = userData;

    if (!username || !password) {
      alert("Please fill all data");
      return false;
    }

    const res = await fetch("https://order-pizza-api.herokuapp.com/api/auth", {
      crossDomain: true,
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log(data);

    // if (res.status === 400 || !data) {
    //   console.log("message not send");
    // } else {
    //   alert("login successfull");
    //   setUserData({ ...userData, message: "" });
    //   history.push("/order");
    // }
  };
  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row my-5 justify-content-center">
            <div className="col-4">
              <form className="row g-3" method="POST">
                <div className="col-md-12">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handelInput}
                    autoComplete="off"
                    placeholder="Your username"
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handelInput}
                    autoComplete="off"
                    placeholder="Your password"
                  />
                </div>
                <div className="col">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    name="signup"
                    value="Login"
                    onClick={loginForm}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

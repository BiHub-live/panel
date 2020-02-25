import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Icon, Button, message } from "antd";
import axios from "axios";
import Services from "./services";
import { UserState } from "./userState";
import { Link } from "react-router-dom";

//const baseUrl = "http://45.92.95.69:5000/api//signup";

export default function SignUp(params: any) {
  const { userInfo, setUserInfo } = useContext(UserState);

  const [errorMessage, setErrorMessage] = useState(undefined || "");

  async function HandleSignUp(credentials: any) {
    console.log("userInfo", userInfo);

    await axios({
      method: "post",
      url: "http://45.92.95.69:5000/api//signup",
      data: {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email
      }
    })
      .then((res: { data: any }) => {
        setErrorMessage(res.data.message);
        message.info("res.data.message", res.data.message);
      })
      .catch(() => console.log("Get Data Fail"));
  }

  return (
    <>
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          alignContent: "center",
          margin: 128,
          borderRadius: 64,
          height:"100vh"
        }}
      >
           <Icon
              type="user-add"
              style={{
                fontSize: "64px",
                marginTop: 32,
                marginBottom: 32
              }}
              theme="outlined"
            />
        <Form>
          <div>
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              type="text"
              required={true}
              style={{ margin: 16, width: "50%" }}
              value={userInfo.email}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
            />
          </div>

          <div>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              type="text"
              required={true}
              style={{ margin: 16, width: "50%" }}
              value={userInfo.username}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, username: target.value })
              }
            />
          </div>
          <div>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
              type="password"
              required={true}
              style={{ margin: 16, width: "50%" }}
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
            />
          </div>

          <div>
            <Button
              type="primary"
              style={{ margin: 16, width: "50%" }}
              onClick={HandleSignUp}
            >
              SignUp
            </Button>
            <Button style={{ margin: 16, width: "50%" }}>
              <Link to="/Login">Login</Link>
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

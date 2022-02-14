import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        // server side의 Users.js에서 response를 보낼때 아이디, 비밀번호에 에러가 있을 시 error가 포함된 객체를 보낸다.
        // response.data.error가 true라는 것은 error 키 값이 객체에 포함된다는 뜻이므로 에러가 있다는 뜻.
        if (response.data.error) {
          alert(response.data.error);
        } else {
          // sessionStorage에 전달받은 토큰 저장한다.
          // sessionStorage에 accessToken은 하나밖에 저장이 안됨. 새로운 accessToken이 들어오면 대체된다.
          // seesionStorage vs localStorage = "윈도우가 닫힐때까지만 유효" vs "새윈도우에서도 유효"
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      });
  };
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;

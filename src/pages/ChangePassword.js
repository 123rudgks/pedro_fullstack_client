import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function ChangePassword() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const onSaveChange = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          setNewPassword("");
          setOldPassword("");
        } else {
          alert(response.data);
          localStorage.removeItem("accessToken");
          setAuthState({
            username: "",
            id: 0,
            status: false,
          });
          navigate("/login");
        }
      });
  };
  return (
    <div>
      <h1>Change password</h1>
      <input
        value={oldPassword}
        type="password"
        placeholder="old password"
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />
      <input
        value={newPassword}
        type="password"
        placeholder="new password"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <button onClick={onSaveChange}>change</button>
    </div>
  );
}

export default ChangePassword;

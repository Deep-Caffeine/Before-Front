import axios from "axios";
import { useState } from "react";
import { SignUp } from "../types/signup";

export default function Signup() {
  const [formData, setFormData] = useState<SignUp>({
    email: "",
    password: "",
    username: "",
    phone: "",
    birth: "",
  });

  return (
    <>
      <h1>회원가입</h1>
      <form>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
          />
        </div>
        <div>
          <label>Birth</label>
          <input
            type="date"
            name="birth"
            value={formData.birth}
          />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </>
  );
}

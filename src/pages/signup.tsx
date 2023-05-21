import axios from "axios";
import { useState, FormEvent, ChangeEvent } from "react";
import { SignUp } from "../types/signup";

export default function Signup() {
  const [formData, setFormData] = useState<SignUp>({
    email: "",
    password: "",
    username: "",
    phone: "",
    birth: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const signupSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://www.ideaconnect.online/user",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={signupSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Birth</label>
          <input
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </>
  );
}

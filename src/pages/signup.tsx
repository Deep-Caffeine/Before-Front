import axios from "axios";
import { useState, FormEvent, ChangeEvent } from "react";
import { SignUp } from "../types/signup";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
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
        formData
      );
      // 상태 코드에 따른 처리
      if (response.status === 200) {
        // 성공적으로 처리된 경우
        // 로그인 페이지로 이동
        navigate("/login");
      } else if (response.status === 400) {
        // 잘못된 요청인 경우
        // false 데이터 다시 작성해달라고 요청하기
        const { data } = response;
        if (data && typeof data === "object") {
          // 서버에서 false 값을 받아옴
          const { email, password, username, phone, birth } = data;
          if (email === false) {
            alert("이메일 형식이 올바르지 않습니다.");
          }
          if (password === false) {
            alert("비밀번호를 8자 이상 작성해주세요");
          }
          if (username === false) {
            alert("닉네임이 올바르지 않습니다.");
          }
          if (phone === false) {
            alert("전화번호 형식이 올바르지 않습니다.")
          }
          if (birth === false) {
            alert("생년월일 형식이 올바르지 않습니다.");
          }
        }
      } else if (response.status === 500) {
        // 서버 내부 오류인 경우
        // 다시 회원가입 요청 하기
        alert('다시 회원가입 요청을 해주시길 바랍니다.')
      }
    } catch (error) {
        alert("회원가입 실패");
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

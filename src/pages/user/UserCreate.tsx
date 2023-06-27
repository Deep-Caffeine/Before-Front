import axios, { AxiosResponse } from "axios";
import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { UserCreate, UserCreateResponseDto } from "../../types/user/UserCreate";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email 형식을 입력해주세요")
    .required("이메일(아이디)를 입력해 주세요"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
      "8글자 이상 문자, 숫자, 특수문자를 조합해서 입력하세요"
    )
    .required("비밀번호를 입력해 주세요"),
  username: yup.string().min(2).max(10).required(),
  checkPw: yup
    .string()
    .oneOf([yup.ref("password"), "비밀번호가 일치하지 않습니다."])
    .required(),
  phone: yup
    .string()
    .matches(/^\d{3}-\d{4}-\d{4}$/, "전화번호 형식이 올바르지 않습니다.")
    .required(),
  birth: yup.string().required("생년월일을 입력해 주세요"),
});

export default function UserCreate() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreate>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UserCreate> = async (data) => {
    try {
      const response: AxiosResponse<UserCreateResponseDto> = await axios.post(
        "http://www.ideaconnect.online/user",
        data
      );
      // 상태 코드에 따른 처리
      if (response.status === 200) {
        // 성공적으로 처리된 경우
        // 로그인 페이지로 이동
        router.push("/login");
      } else if (response.status === 400) {
        // 잘못된 요청인 경우
        // false 데이터 다시 작성해달라고 요청하기
        const { data } = response;
        if (data) {
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
            alert("전화번호 형식이 올바르지 않습니다.");
          }
          if (birth === false) {
            alert("생년월일 형식이 올바르지 않습니다.");
          }
        }
      } else if (response.status === 500) {
        // 서버 내부 오류인 경우
        // 다시 회원가입 요청 하기
        alert("다시 회원가입 요청을 해주시길 바랍니다.");
      }
    } catch (error) {
      alert("회원가입 실패");
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>checkPw</label>
          <input type="password" {...register("checkPw")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>Username</label>
          <input type="text" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Phone</label>
          <input type="text" {...register("phone")} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div>
          <label>Birth</label>
          <input type="date" {...register("birth")} />
          {errors.birth && <p>{errors.birth.message}</p>}
        </div>
        <button type="submit">가입하기</button>
      </form>
    </>
  );
}

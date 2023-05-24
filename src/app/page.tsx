"use client";

import axios from "axios";
import { FormEvent, useState, ChangeEvent } from "react";
import { Update, UpdateState } from "./types/update";

export default function Home() {
  const [editData, setEdit] = useState<UpdateState>({
    username: "병주",
    password: "4790",
    phone: "010-7329-7895",
    birth: "99-02-05",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEdit((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const request = new UpdateRequest(
      editData.username,
      editData.phone,
      editData.birth,
      editData.password
    );
    const response = await request.send();
  };

  return (
    <main>
      <h1>회원정보수정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={editData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={editData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={editData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Birth</label>
          <input
            type="text"
            name="birth"
            value={editData.birth}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ width: "100px", height: "100px" }}>
          update
        </button>
      </form>
    </main>
  );
}

export class UpdateRequest {
  username?: string;
  phone?: string;
  password?: string;
  birth?: string;

  constructor(
    username?: string,
    phone?: string,
    birth?: string,
    password?: string
  ) {
    this.username = username;
    this.phone = phone;
    this.password = password;
    this.birth = birth;
  }

  async send(): Promise<Update> {
    const response = await axios.put(
      "http://www.ideaconnect.online/user",
      this
    );
    const data: Update = response.data;
    return data;
  }
}

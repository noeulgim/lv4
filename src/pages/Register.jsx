import { useMutation } from "@tanstack/react-query";
import { register } from "../axios/api"; // Ensure correct import
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: register,
  });

  const [user, setUser] = useState({
    id: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.id.trim() || !user.password.trim()) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    registerMutation.mutate(user, {
      onSuccess: async () => {
        alert("회원가입 성공!");
        setUser({ id: "", password: "" });
        navigate("/login");
      },
      onError: (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            alert(error.response.data.message);
          } else {
            console.error("Error details:", error.response);
            alert("회원가입 실패");
          }
        } else {
          console.error("Error details:", error);
          alert("회원가입 실패");
        }
      },
    });
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.id}
          onChange={(e) => setUser({ ...user, id: e.target.value })}
          placeholder="아이디"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="비밀번호"
        />
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default Register;

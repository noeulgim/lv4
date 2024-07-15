import { useMutation } from "@tanstack/react-query";
import { login, authenticate } from "../axios/api"; // Ensure correct import
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/modules/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
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

    loginMutation.mutate(user, {
      onSuccess: async (data) => {
        alert("로그인 성공!");
        console.log("Token:", data.token);

        try {
          const authResponse = await authenticate(data.token);
          console.log("인증 확인 메시지:", authResponse.message);

          dispatch(loginSuccess({ token: data.token, user: user.id }));
          navigate("/");
        } catch (authError) {
          console.error("유저 인증 확인 중 오류가 발생했습니다:", authError);
        }
      },
      onError: (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            alert(`${error.response.data.message}`);
          } else {
            console.error("Error details:", error.response);
            alert("로그인 실패");
          }
        } else {
          console.error("Error details:", error);
          alert("로그인 실패");
        }
      },
    });
  };

  return (
    <div>
      <h2>로그인</h2>
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;

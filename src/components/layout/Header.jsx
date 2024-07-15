import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/modules/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <Link to={"/register"}>
            <button>회원가입</button>
          </Link>
          <Link to={"/login"}>
            <button>로그인</button>
          </Link>
        </>
      ) : (
        <button onClick={handleLogout}>로그아웃</button>
      )}
    </div>
  );
};

export default Header;

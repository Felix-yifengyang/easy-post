import LoginForm from "./Form";
import '../../styles/Login/Login.css';

export default function LoginPage() {
    return (
      <div className="login-page-container">
        <h1>登录</h1>
        <LoginForm />
      </div>
    )
  }
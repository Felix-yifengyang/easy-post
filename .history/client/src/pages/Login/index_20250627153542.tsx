import LoginForm from "./Form";
import '../../styles/Login/Login.css';

export default function LoginPage() {
    return (
      <div className="login-page-container">
        <img src="/icons/easy_icon.png" alt="easy-post" />
        <h1>EasyPost</h1>
        <p>全球最大的帖子平台</p>
        <LoginForm />
      </div>
    )
  }
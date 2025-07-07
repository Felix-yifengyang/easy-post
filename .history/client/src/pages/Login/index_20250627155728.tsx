import LoginForm from "./Form";
import '../../styles/Login/Login.css';

export default function LoginPage() {
    return (
      <div className="login-page-container">
        <div className="login-label-container">
          <div className="login-icon-container">
            <img 
            src="../../../public/easy_icon.png" 
            className="login-icon" 
            alt="easy-post" 
            />
            <h1>EasyPost</h1>
          </div>
          <p>全球最大的帖子平台</p>
        </div>
        <LoginForm />
      </div>
    )
  }
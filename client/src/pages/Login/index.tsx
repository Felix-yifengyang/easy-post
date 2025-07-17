import LoginForm from "./form";
import loginStyles from '../../styles/login/login.module.css';

export default function LoginPage() {
    return (
      <div className={loginStyles['login-page-container']}>
        <div className={loginStyles['login-label-container']}>
          <div className={loginStyles['login-icon-container']}>
            <img 
              src="/easy_icon.svg"
              className={loginStyles['login-icon']} 
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

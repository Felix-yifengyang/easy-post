import LoginForm from "./Form";

export default function LoginPage() {
    return (
      <div className="login-page-container">
        <h1>登录页面</h1>
        <div className="form-wrapper">
          <LoginForm />
        </div>
      </div>
    )
  }
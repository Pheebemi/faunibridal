import { Metadata } from "next"
import LoginForm from "./login-form"

export const metadata: Metadata = {
  title: "Login - Admin Dashboard",
  description: "Login to admin dashboard",
}

export default function LoginPage() {
  return <LoginForm />
}
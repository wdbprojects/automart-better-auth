import { routes } from "@/config/routes";
import LoginMain from "@/modules/presentation/auth/login-main";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect(routes.home);
  }

  return <LoginMain />;
};
export default LoginPage;

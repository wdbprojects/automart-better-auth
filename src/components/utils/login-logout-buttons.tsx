"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { signOut, useSession } from "@/utils/auth-client";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginLogoutButtons = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(routes.home);
          router.refresh();
          toast.success("User logged in successfully");
        },
      },
    });
  };
  return (
    <Button variant="secondary" size="sm" onClick={handleSignOut}>
      {isPending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="size-3.5 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <LogOut className="size-3.5" />
          <span>Logout</span>
        </div>
      )}
    </Button>
  );
};
export default LoginLogoutButtons;

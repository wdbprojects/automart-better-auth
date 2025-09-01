import { Button } from "@/components/ui/button";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

const AboutMain = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="bg-background flex h-full w-full flex-col p-4">
      <h2 className="text-primary text-2xl font-semibold">About AutoMart</h2>
      <div className="flex-auto">
        {session ? (
          <p>{session?.user.name}</p>
        ) : (
          <Button size="sm" variant="destructive">
            Log out
          </Button>
        )}
      </div>
    </div>
  );
};
export default AboutMain;

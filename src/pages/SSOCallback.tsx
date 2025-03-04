
import { useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    handleRedirectCallback({
      afterSignInUrl: "/",
      afterSignUpUrl: "/"
    }).then((result) => {
      if (!result) {
        // Handle the case where there is no result
        navigate("/login");
      }
    }).catch((err) => {
      console.error("Error handling redirect callback:", err);
      navigate("/login");
    });
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <h2 className="mt-4 text-xl font-medium">Signing you in...</h2>
        <p className="text-muted-foreground mt-2">You'll be redirected shortly</p>
      </div>
    </div>
  );
}

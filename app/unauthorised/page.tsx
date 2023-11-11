"use client";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import ghostError from "@/public/animations/ghost.json";
import Lottie from "lottie-react";

function unauthorised() {
  return (
      <div className="grid grid-cols-8 gap-2 items-center justify-end mx-auto">
        <div className="flex h-screen items-center col-span-2">
        <Alert variant="destructive" className="mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
          <div className="flex justify-center p-2 my-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </Alert>
      </div>
      <div className="col-span-6">
      <Lottie
                animationData={ghostError}
                style={{ height: 400, width: 400 }}
                loop={true}
              />
      </div>
      </div>
    </div>
  );
}

export default unauthorised;

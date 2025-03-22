import AuthForm from "@/components/forms/auth-form";
// import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card, CardBody } from "@nextui-org/react";
import { url } from "inspector";

const SignIn = async () => {
  // const session = await getServerSession(authOptions);
  // if (session?.user) redirect("/dashboard");

  return (
    <div className="flex h-[100vh]  w-full items-center justify-center flex-col md:flex-row bg-white px-4">
      <Card className="w-[100%] md:w-[800px] md:rounded-3xl border-t-2 border-b-2 border-black flex items-center flex-col md:flex-row ">
        <div
          className=" w-[400px] h-[400px] md:w-[900px] md:h-[450px] z-50"
          style={{
            backgroundImage: `url("/login.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <CardBody className=" gap-7 px-5 py-10 md:h-max md:p-14 md:shadow-2xl">
          <h1 className="text-3xl font-light md:text-start text-center">Admin Login..!</h1>
          <div className="flex flex-col gap-5">
            <AuthForm />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;

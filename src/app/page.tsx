import AuthForm from "@/components/forms/auth-form";

import { Card, CardBody } from "@nextui-org/react";


const SignIn = async () => {


  return (
    <div className="flex h-[100vh]  w-full items-center justify-center flex-col md:flex-row bg-white px-4">
      <Card className="w-[100%] md:w-[800px] md:rounded-3xl border-t-2 border-b-2 border-black flex items-center flex-col md:flex-row  shadow-none md:shadow-lg">
        <div
          className=" w-full h-[360px] md:w-[900px] md:h-[450px] z-50"
          style={{
            backgroundImage: `url("/login.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <CardBody className="gap-7 px-5 py-10 md:h-max md:p-14 ">
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

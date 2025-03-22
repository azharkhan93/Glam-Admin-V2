import { Card, CardBody } from "@nextui-org/react";
import { Loader2, RotateCw } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed z-[9999] flex min-h-screen min-w-full items-center justify-center bg-white">
      <Card className=" py-2 px-2 bg-white shadow-none">
        <CardBody>
          <RotateCw className="animate-spin text-blue-600"  strokeWidth={2} size={45}/>
        </CardBody>
      </Card>
    </div>
  );
};

export default Loading;

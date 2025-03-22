"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion as m } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useLogin } from "@/api-hooks/Login/useLogin";
import { ZodAuthSchema } from "@/lib/zod-schemas/schema";




function AuthForm() {
  const [isPassword, setIsPassword] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ZodAuthSchema>>({
    resolver: zodResolver(ZodAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });



  const authMutation = useLogin();

  function handleSignIn(data: z.infer<typeof ZodAuthSchema>) {
    setError(null);
    authMutation.mutate(data, {
      onError: (err) => {
        setError(err.message);
        form.reset();
      },
      onSuccess: () => {
        toast.success("Signed in successfully.");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input placeholder="Email" {...field} radius="sm" size="sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Password"
                  radius="sm"
                  size="sm"
                  autoComplete="no"
                  endContent={
                    isPassword ? (
                      <Eye
                        className="h-5 w-5 cursor-pointer text-gray-400"
                        onClick={() => setIsPassword(false)}
                      />
                    ) : (
                      <EyeOff
                        className="h-5 w-5 cursor-pointer text-gray-400"
                        onClick={() => setIsPassword(true)}
                      />
                    )
                  }
                  type={isPassword ? "password" : "text"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <m.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 block h-5 text-center text-xs font-medium text-destructive dark:text-red-500"
          >
            {error}
          </m.span>
        )}
        <div className="mt-5 flex flex-col gap-3">
          <Button
            isLoading={authMutation.isPending}
            color="primary"
            isDisabled={authMutation.isPending}
            radius="full"
            type="submit"
          >
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AuthForm;


// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// import { motion as m } from "framer-motion";
// import { toast } from "sonner";
// import { Button } from "@nextui-org/button";
// import { Input } from "@nextui-org/input";

// const dummyUsers = [
//   { email: "admin@mail.com", password: "admin123" },
//   { email: "user@mail.com", password: "user123" },
// ];

// function AuthForm() {
//   const [isPassword, setIsPassword] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [signInLoading, setSignInIsLoading] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(
//       z.object({
//         email: z.string().email(),
//         password: z.string().min(6),
//       })
//     ),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   function handleSignIn(data: { email: string; password: string }) {
//     setError(null);
//     setSignInIsLoading(true);

//     const user = dummyUsers.find(
//       (u) => u.email === data.email && u.password === data.password
//     );

//     setTimeout(() => {
//       if (!user) {
//         setError("Invalid credentials.");
//         form.reset();
//       } else {
//         localStorage.setItem("user", JSON.stringify(user));
//         toast.success("Signed in successfully.");
//       }
//       setSignInIsLoading(false);
//     }, 1000);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSignIn)}>
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem className="mb-3">
//               <FormControl>
//                 <Input placeholder="Email" {...field} radius="sm" size="sm" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input
//                   {...field}
//                   placeholder="Password"
//                   radius="sm"
//                   size="sm"
//                   autoComplete="no"
//                   endContent={
//                     isPassword ? (
//                       <Eye
//                         className="h-5 w-5 cursor-pointer text-gray-400"
//                         onClick={() => setIsPassword(false)}
//                       />
//                     ) : (
//                       <EyeOff
//                         className="h-5 w-5 cursor-pointer text-gray-400"
//                         onClick={() => setIsPassword(true)}
//                       />
//                     )
//                   }
//                   type={isPassword ? "password" : "text"}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {error ? (
//           <m.span
//             initial={{ opacity: 0, y: -5 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mt-3 block h-5 text-center text-xs font-medium text-destructive dark:text-red-500"
//           >
//             {error}
//           </m.span>
//         ) : (
//           <span className="mt-3 block h-5" />
//         )}
//         <div className="mt-5 flex flex-col gap-3">
//           <Button
//             isLoading={signInLoading}
//             color="primary"
//             isDisabled={signInLoading}
//             radius="full"
//             type="submit"
//           >
//             Sign in
//           </Button>
      
         
//         </div>
//       </form>
//     </Form>
//   );
// }
// export default AuthForm;


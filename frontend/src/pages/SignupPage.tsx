import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import delay from "@/lib/delay";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";

const formShcema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string()
      .min(1, { message: "Confirm Password is required" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignupPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formShcema>>({
    resolver: zodResolver(formShcema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignup = async (values: z.infer<typeof formShcema>) => {
    setLoading(true);
    try {
      delay(500);
      toast("Signup successful", {
        onAutoClose: () => {
          setLoading(false);
        },
      });
    } catch (error) {}
    console.log(values);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-md max-w-lg">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold">Welcome to Project Management</h1>
          <p className="text-muted-foreground">
            Signup with your account or create a new one
          </p>
        </div>
        <div className="mt-5">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSignup)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        autoComplete="off"
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        autoComplete="off"
                        type="email"
                      />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        autoComplete="off"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        autoComplete="off"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loading /> : "Signup"}
                </Button>
              </div>
              <div className="mt-5 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";
import { useSignInMutation } from "../../services/user-api";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // RTK Query mutation hook
  const [signIn, { isLoading, isError, error }] = useSignInMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signIn({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log("SignIn successful:", response);
      localStorage.setItem("token", response.token);

      navigate("/dashboard");
    } catch (err) {
      console.error("SignIn failed:", err);
    }
  };

  return (
    <>
      <PageMeta title="Hiring Task" description="Sentiment Analysis App" />
      <div className="relative flex w-full h-screen px-4 py-6 overflow-hidden bg-white z-1 dark:bg-gray-900 sm:p-0">
        <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
          <div className="w-full max-w-md pt-10 mx-auto">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ChevronLeftIcon />
              Back to dashboard
            </Link>
          </div>
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Sign In
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter your email and password to sign in!
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="info@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* Password */}
                  <div>
                    <Label>
                      Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      to="/"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  {/* Button */}
                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      size="sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </div>
                </div>
              </form>

              {/* Error Message */}
              {isError && (
                <div className="mt-5 text-center text-error-500">
                  {error && "data" in error
                    ? (error.data as { message: string }).message
                    : "An error occurred during sign-in."}
                </div>
              )}

              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  Don't have an account? {""}
                  <Link
                    to="/signup"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
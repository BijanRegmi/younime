"use client"

import { trpc } from "@/components/Context/TrpcContext"
import { signIn } from "next-auth/react"
import { ChangeEvent, FormEvent, useState } from "react"
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai"
import { useRouter } from "next/navigation"

const initialState = {
    email: "",
    password: "",
    cpassword: "",
    name: "",
}

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [values, setValues] = useState(initialState)

    const router = useRouter()

    const { mutate } = trpc.user.register.useMutation({
        onSuccess: () => {
            router.push("/")
        },
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues(o => ({ ...o, [e.target.name]: e.target.value }))

        if (e.target.name == "cpassword") {
            console.log({ p: values.password, c: e.target.value })
            if (values.password != e.target.value) {
                e.target.setCustomValidity("Passwords donot match")
            } else {
                e.target.setCustomValidity("")
            }
        }
    }

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLogin) {
            signIn("login", {
                email: values.email,
                password: values.password,
                redirect: true,
                callbackUrl: "/",
            })
        } else {
            mutate({
                email: values.email,
                password: values.password,
                name: values.name,
            })
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <form
                className="flex flex-col gap-2 border border-accent-500 rounded-md p-2 items-center justify-center w-1/4 py-4 bg-accent-100"
                onSubmit={submit}
            >
                <h1 className="text-accent-900 text-xl decoration-solid no-underline font-semibold cursor-pointer">
                    Younime
                </h1>
                <h2 className="font-semibold">
                    {isLogin ? "Sign in" : "Register"}
                </h2>
                <h3>to continue to Younime</h3>
                {!isLogin && (
                    <div className="mb-2 w-4/5">
                        <label htmlFor="name" className="block py-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="rounded p-2 w-full outline-none text-black"
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className="mb-2 w-4/5">
                    <label htmlFor="email" className="block py-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="rounded p-2 w-full outline-none text-black"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-2 w-4/5">
                    <label htmlFor="pass" className="block py-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="pass"
                        placeholder="Password"
                        className="rounded p-2 w-full outline-none text-black"
                        onChange={handleChange}
                    />
                </div>
                {!isLogin ? (
                    <div className="mb-2 w-4/5">
                        <label htmlFor="cpass" className="block py-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="cpass"
                            name="cpassword"
                            placeholder="Confirm Password"
                            className="rounded p-2 w-full outline-none text-black"
                            onChange={handleChange}
                        />
                    </div>
                ) : (
                    <span className="text-sm w-4/5 -mt-4">Forgot Password</span>
                )}
                <button className="border border-accent-600 rounded px-4 py-2">
                    {isLogin ? "Sign In" : "Register"}
                </button>
                <div className="flex flex-row gap-2">
                    <AiOutlineGoogle
                        className="text-4xl cursor-pointer"
                        title="Google Sign in"
                        onClick={() => signIn("google")}
                    />
                    <AiOutlineGithub
                        className="text-4xl cursor-pointer"
                        title="Github Sign in"
                        onClick={() => signIn("github")}
                    />
                </div>
                <div>
                    <span>
                        {isLogin ? "Don't" : "Already"} have an account?
                    </span>{" "}
                    <span
                        className="font-bold cursor-pointer"
                        onClick={() => setIsLogin(o => !o)}
                    >
                        {isLogin ? "Register" : "Sign in"}
                    </span>
                </div>
            </form>
        </div>
    )
}

export default LoginPage

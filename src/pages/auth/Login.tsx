import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  console.log(watch("email"))
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("email")} />
      <input {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
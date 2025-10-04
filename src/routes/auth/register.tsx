import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch("http://localhost:3333/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate({ to: "/" });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Register</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field
            name="email"
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full rounded border p-2"
                    placeholder="Enter your email"
                  />
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="password"
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    type={field.name}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full rounded border p-2"
                    placeholder="Enter your password"
                  />
                </>
              );
            }}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/create/animal")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
  const form = useForm({
    defaultValues: {
      name: "",
      species: "",
      age: 0,
      adopted: false,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch(
          `${apiUrl}/animals`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
          },
        );
        const data = await res.json();
        console.log("Animal créé:", data);
        form.reset();
        navigate({ to: "/demo/list/animals" });
      } catch (err) {
        console.error("Erreur:", err);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="mx-auto max-w-md space-y-4 p-4"
    >
      {/* Nom */}
      <div>
        <label htmlFor="name" className="block font-semibold">
          Nom:
        </label>
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => (!value ? "Required" : undefined),
          }}
          children={(field) => (
            <input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded border px-2 py-1"
            />
          )}
        />
      </div>

      {/* Espèce */}
      <div>
        <label htmlFor="species" className="block font-semibold">
          Espèce:
        </label>
        <form.Field
          name="species"
          validators={{
            onChange: ({ value }) => (!value ? "Required" : undefined),
          }}
          children={(field) => (
            <input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded border px-2 py-1"
            />
          )}
        />
      </div>

      {/* Âge */}
      <div>
        <label htmlFor="age" className="block font-semibold">
          Âge:
        </label>
        <form.Field
          name="age"
          validators={{
            onChange: ({ value }) => (value < 0 ? "Must be ≥ 0" : undefined),
          }}
          children={(field) => (
            <input
              id={field.name}
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              onBlur={field.handleBlur}
              className="w-full rounded border px-2 py-1"
            />
          )}
        />
      </div>

      {/* Adopté */}
      <div className="flex items-center space-x-2">
        <form.Field
          name="adopted"
          children={(field) => (
            <>
              <input
                id={field.name}
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
              />
              <label htmlFor={field.name} className="font-semibold">
                Adopté
              </label>
            </>
          )}
        />
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Créer
      </button>
    </form>
  );
}

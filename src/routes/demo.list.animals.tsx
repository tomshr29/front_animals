import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/list/animals")({
  component: RouteComponent,
});

const queryClient = new QueryClient();

function RouteComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ["animals"],
    queryFn: () =>
      fetch(
        "https://animals-api-ymzhkn-4be2e0-188-245-240-223.traefik.me/animals",
      ).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurrend: " + error.message;

  return (
    <div>
      <Link
        to="/demo/create/animal"
        className="mb-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
      >
        Ajouter un animal
      </Link>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
        {data.map((animal: any) => (
          <Link
            key={animal.id}
            to="/demo/show/animal/$animalId"
            params={{ animalId: animal.id }}
          >
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-shadow hover:shadow-xl">
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                {animal.name}
              </h2>
              <p className="mb-1 text-gray-600">
                <span className="font-semibold">Espèce:</span> {animal.species}
              </p>
              <p className="mb-1 text-gray-600">
                <span className="font-semibold">Âge:</span> {animal.age} an
                {animal.age > 1 ? "s" : ""}
              </p>
              <p
                className={`text-sm font-semibold ${
                  animal.adopted ? "text-green-600" : "text-red-600"
                }`}
              >
                {animal.adopted ? "Adopté ✅" : "Non adopté ❌"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

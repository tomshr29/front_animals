import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/list/animals')({
  component: RouteComponent,
})

const queryClient = new QueryClient()

function RouteComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['animals'],
    queryFn: () =>
      fetch('http://localhost:3333/animals').then((res) => res.json()),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurrend: ' + error.message

  return (
    <div>
      <Link
        to="/demo/create/animal"
        className="inline-block mb-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Ajouter un animal
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {data.map((animal: any) => (
          <Link
            key={animal.id}
            to="/demo/show/animal/$animalId"
            params={{ animalId: animal.id }}
          >
            <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {animal.name}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Espèce:</span> {animal.species}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Âge:</span> {animal.age} an
                {animal.age > 1 ? 's' : ''}
              </p>
              <p
                className={`text-sm font-semibold ${
                  animal.adopted ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {animal.adopted ? 'Adopté ✅' : 'Non adopté ❌'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

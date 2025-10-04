import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/show/animal/$animalId')({
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
  const { animalId } = Route.useParams()
  const {
    isPending,
    error,
    data: animal,
  } = useQuery({
    queryKey: ['animal', animalId],
    queryFn: () =>
      fetch(`http://localhost:3333/animals/${animalId}`).then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurrend: ' + error.message

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 border border-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{animal.name}</h1>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Espèce:</span> {animal.species}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Âge:</span> {animal.age} an
        {animal.age > 1 ? 's' : ''}
      </p>
      <p
        className={`text-sm font-semibold ${animal.adopted ? 'text-green-600' : 'text-red-600'}`}
      >
        {animal.adopted ? 'Adopté ✅' : 'Non adopté ❌'}
      </p>
      <a
        href="/demo/list/animals"
        className="inline-block mt-4 text-blue-600 hover:underline font-semibold"
      >
        ← Retour à la liste
      </a>
    </div>
  )
}

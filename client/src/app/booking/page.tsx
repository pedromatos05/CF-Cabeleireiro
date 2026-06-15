import BookingForm from '@/components/booking/BookingForm'
import { serviceCategories } from '@/data/services'

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const initialCategory = serviceCategories.some((c) => c.slug === category)
    ? category
    : undefined

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mx-auto mb-8 max-w-4xl text-4xl font-bold text-brown-800">Marcar Marcação</h1>
      <BookingForm initialCategory={initialCategory} />
    </div>
  )
}

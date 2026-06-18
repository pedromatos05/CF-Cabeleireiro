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
    <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="mx-auto mb-8 max-w-4xl text-3xl font-bold text-brown-800 sm:text-4xl">
        Marcar Marcação
      </h1>
      <BookingForm initialCategory={initialCategory} />
    </div>
  )
}

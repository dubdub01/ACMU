import { GOOGLE_REVIEWS } from '@/lib/google-reviews';
import GoogleReviewCard from './GoogleReviewCard';

export default function GoogleReviews() {
  return (
    <section className="py-10 bg-[#67e8cc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#479983]">
            Ils nous font confiance
          </h2>
          <p className="text-sm text-[#479983]/80 mt-1">Avis Google</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GOOGLE_REVIEWS.map((review) => (
            <GoogleReviewCard
              key={`${review.author}-${review.dateLabel}`}
              review={review}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

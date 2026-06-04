'use client';

import { useState } from 'react';
import type { GoogleReview } from '@/lib/google-reviews';

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-px shrink-0"
      aria-label={`${rating} sur 5 étoiles`}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm leading-none ${
            star <= rating ? 'text-amber-500' : 'text-white/50'
          }`}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

const CLAMP_LINES = 4;

export default function GoogleReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 180;

  return (
    <article className="flex flex-col bg-white/90 rounded-xl p-4 shadow-sm border border-white/60 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">
            {review.author}
          </p>
          <p className="text-xs text-gray-500">{review.dateLabel}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <blockquote className="text-gray-700 text-sm leading-snug">
        <p
          className={expanded ? 'whitespace-pre-line' : undefined}
          style={
            !expanded
              ? {
                  display: '-webkit-box',
                  WebkitLineClamp: CLAMP_LINES,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }
              : undefined
          }
        >
          &ldquo;{review.text}&rdquo;
        </p>
      </blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-left text-xs font-semibold text-[#479983] hover:text-[#479983]/80 transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? 'Réduire' : 'Lire la suite'}
        </button>
      )}
    </article>
  );
}

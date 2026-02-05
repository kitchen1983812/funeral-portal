import React from 'react';
import { Star, User } from 'lucide-react';
import '../styles/Review.css';

const ReviewItem = ({ review }) => {
    return (
        <div className="review-card">
            <div className="review-header">
                <div className="flex items-center gap-sm">
                    <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                fill={i < review.rating ? "currentColor" : "none"}
                                color={i < review.rating ? "currentColor" : "#ccc"}
                            />
                        ))}
                    </div>
                    <span className="font-bold">{review.rating}.0</span>
                </div>
                <div className="review-meta">
                    <span className="tag tag-position">{review.position}</span>
                    <span className="tag">{review.age}</span>
                    <span className="tag">{review.gender}</span>
                </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-date">{review.date}</div>
        </div>
    );
};

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <div className="text-center py-xl">まだ口コミはありません。</div>;
    }

    const averageRating = (reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length).toFixed(1);

    return (
        <div className="review-section">
            <h3 className="section-title" style={{ fontSize: '1.5rem' }}>ご利用者様の声</h3>

            <div className="review-summary">
                <div className="text-center">
                    <div className="review-score-large">{averageRating}</div>
                    <div className="review-stars justify-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={24}
                                fill={i < Math.round(averageRating) ? "currentColor" : "none"}
                                color={i < Math.round(averageRating) ? "currentColor" : "#ccc"}
                            />
                        ))}
                    </div>
                    <div className="text-sm text-center mt-md">{reviews.length}件の評価</div>
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.9rem' }}>実際に利用されたご遺族・参列者様のリアルな声です。</p>
                </div>
            </div>

            <div className="review-list">
                {reviews.map(review => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default ReviewList;

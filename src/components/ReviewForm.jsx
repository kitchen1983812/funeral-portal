import React, { useState } from 'react';
import { Star } from 'lucide-react';
import '../styles/Review.css';

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [position, setPosition] = useState('喪主');
    const [age, setAge] = useState('40代');
    const [gender, setGender] = useState('男性');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('評価（★）を選択してください');
            return;
        }
        onSubmit({
            rating,
            comment,
            position,
            age,
            gender,
            date: new Date().toLocaleDateString('ja-JP'),
            id: Date.now()
        });
        // Reset form
        setRating(0);
        setComment('');
    };

    return (
        <div className="review-form-container">
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>口コミを投稿する</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">総合評価</label>
                    <div className="star-rating-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`star-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">立場</label>
                        <select className="form-select" value={position} onChange={(e) => setPosition(e.target.value)}>
                            <option>喪主</option>
                            <option>親族</option>
                            <option>一般参列者</option>
                            <option>関係者</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">年代</label>
                        <select className="form-select" value={age} onChange={(e) => setAge(e.target.value)}>
                            <option>20代</option>
                            <option>30代</option>
                            <option>40代</option>
                            <option>50代</option>
                            <option>60代</option>
                            <option>70代以上</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">性別</label>
                        <div className="flex gap-md" style={{ marginTop: '0.5rem' }}>
                            <label className="flex items-center gap-sm">
                                <input type="radio" name="gender" value="男性" checked={gender === '男性'} onChange={(e) => setGender(e.target.value)} /> 男性
                            </label>
                            <label className="flex items-center gap-sm">
                                <input type="radio" name="gender" value="女性" checked={gender === '女性'} onChange={(e) => setGender(e.target.value)} /> 女性
                            </label>
                            <label className="flex items-center gap-sm">
                                <input type="radio" name="gender" value="その他" checked={gender === 'その他'} onChange={(e) => setGender(e.target.value)} /> その他
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">口コミ内容</label>
                    <textarea
                        className="form-textarea"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="葬儀場の雰囲気、スタッフの対応、費用感などを具体的にご記入ください。"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>投稿する</button>
            </form>
        </div>
    );
};

export default ReviewForm;

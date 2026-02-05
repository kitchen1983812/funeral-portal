import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { supabase } from '../supabaseClient';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import '../styles/Detail.css';

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            // 1. Fetch Funeral Home Data with Company Info
            // For demo purposes, we fetch the first one if ID matches or just the first one created
            const { data: homeData, error: homeError } = await supabase
                .from('funeral_homes')
                .select('*, funeral_companies(*)')
                .limit(1)
                .single();

            if (homeError) throw homeError;
            setData(homeData);

            // 2. Fetch Reviews
            if (homeData) {
                const { data: reviewsData, error: reviewsError } = await supabase
                    .from('reviews')
                    .select('*')
                    .eq('funeral_home_id', homeData.id)
                    .order('created_at', { ascending: false });

                if (reviewsError) throw reviewsError;
                setReviews(reviewsData || []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmit = async (newReview) => {
        if (!data) return;

        try {
            const { error } = await supabase
                .from('reviews')
                .insert([
                    {
                        funeral_home_id: data.id,
                        rating: newReview.rating,
                        comment: newReview.comment,
                        position: newReview.position,
                        age: newReview.age,
                        gender: newReview.gender
                    }
                ]);

            if (error) throw error;

            // Refresh reviews
            fetchData();
            alert('口コミを投稿しました');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('口コミの投稿に失敗しました');
        }
    };

    if (loading) return <div className="container py-xl text-center">読み込み中...</div>;
    if (!data) return <div className="container py-xl text-center">データが見つかりません</div>;

    // Jsonb handling for features: Supabase returns JSON object/array directly
    const featuresList = Array.isArray(data.features) ? data.features : JSON.parse(data.features || '[]');

    return (
        <>
            <div className="detail-header">
                <div className="container">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <span className="tag tag-position" style={{ backgroundColor: 'var(--color-accent)', fontSize: '0.9rem' }}>推奨</span>
                        <h1 className="detail-title" style={{ margin: 0 }}>{data.name}</h1>
                    </div>
                    {data.funeral_companies && (
                        <div style={{ fontSize: '0.9rem', color: '#e0e0e0', marginBottom: '0.5rem' }}>
                            運営: {data.funeral_companies.name}
                        </div>
                    )}
                    <div className="detail-location">
                        <MapPin size={18} /> {data.address}
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {featuresList.map((feature, i) => (
                            <span key={i} className="tag">{feature}</span>
                        ))}
                    </div>
                </div>
            </div>

            <nav className="detail-nav">
                <div className="container">
                    <ul>
                        <li><a href="#about">施設概要</a></li>
                        <li><a href="#plans">プラン・費用</a></li>
                        <li><a href="#gallery">施設写真</a></li>
                        <li><a href="#reviews">口コミ・評判</a></li>
                        <li><a href="#access">アクセス</a></li>
                    </ul>
                </div>
            </nav>

            <div className="container detail-content">
                <section id="about" className="detail-section">
                    <h2>施設概要</h2>
                    <p>{data.description}</p>
                </section>

                <section id="plans" className="detail-section">
                    <h2>プラン・費用</h2>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', background: '#f8fafc' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>家族葬プラン</h3>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>400,000円〜</p>
                        <p className="text-sm">※詳細な見積もりはお問い合わせください</p>
                    </div>
                </section>

                <section id="gallery" className="detail-section">
                    <h2>施設写真</h2>
                    <div className="gallery-grid">
                        <div className="gallery-item" style={{ backgroundColor: '#e5e5e5' }}><div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>外観</div></div>
                        <div className="gallery-item" style={{ backgroundColor: '#e5e5e5' }}><div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>第一式場 (180席)</div></div>
                        <div className="gallery-item" style={{ backgroundColor: '#e5e5e5' }}><div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>エントランス</div></div>
                        <div className="gallery-item" style={{ backgroundColor: '#e5e5e5' }}><div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>親族控室</div></div>
                    </div>
                </section>

                <section id="reviews" className="detail-section">
                    <h2>口コミ・評判</h2>
                    <ReviewList reviews={reviews} />
                    <ReviewForm onSubmit={handleReviewSubmit} />
                </section>

                <section id="access" className="detail-section">
                    <h2>アクセス</h2>
                    <div className="card" style={{ padding: '1rem' }}>
                        <table className="info-table">
                            <tbody>
                                <tr>
                                    <th>住所</th>
                                    <td>{data.address}</td>
                                </tr>
                                <tr>
                                    <th>電話番号</th>
                                    <td>{data.tel}</td>
                                </tr>
                                <tr>
                                    <th>アクセス</th>
                                    <td>{data.access_summary}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Detail;

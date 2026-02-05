import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { MapPin, Phone } from 'lucide-react';
import '../../styles/Detail.css'; // Reusing detail styles for simplicity

const SearchResult = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const cityId = query.get('city_id');
    const freeWord = query.get('q');
    const area = query.get('area'); // from simple generic links if any

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTitle, setSearchTitle] = useState('検索結果');

    useEffect(() => {
        fetchResults();
    }, [cityId, freeWord, area]);

    const fetchResults = async () => {
        try {
            setLoading(true);
            let queryBuilder = supabase
                .from('funeral_homes')
                .select('*, city:cities(name, prefecture:prefectures(name)), funeral_companies(name)');

            if (cityId) {
                queryBuilder = queryBuilder.eq('city_id', cityId);
                // Fetch city name for title separately or assume from first result
            }

            if (freeWord) {
                // Simple text search on name or address
                queryBuilder = queryBuilder.or(`name.ilike.%${freeWord}%,address.ilike.%${freeWord}%`);
                setSearchTitle(`"${freeWord}" の検索結果`);
            }

            // Note: 'area' param might need handling if we used generic links, 
            // but our new flow uses city_id mostly. 

            const { data, error } = await queryBuilder;

            if (error) throw error;
            setResults(data || []);

            // Set title based on results if city search
            if (cityId && data && data.length > 0) {
                const city = data[0].city;
                if (city) {
                    setSearchTitle(`${city.prefecture?.name} ${city.name} の葬儀場`);
                }
            } else if (cityId) {
                setSearchTitle('検索結果');
            }

        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container py-xl text-center">読み込み中...</div>;

    return (
        <div className="container py-xl">
            <h1 className="section-title">{searchTitle} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>({results.length}件)</span></h1>

            <div className="result-list">
                {results.map(home => (
                    <div key={home.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--color-text)' }}>
                                    <Link to={`/detail/${home.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{home.name}</Link>
                                </h2>
                                {home.funeral_companies && (
                                    <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.25rem' }}>
                                        運営: {home.funeral_companies.name}
                                    </div>
                                )}
                            </div>
                            <Link to={`/detail/${home.id}`} className="btn btn-primary">詳細を見る</Link>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                            <MapPin size={18} /> {home.address}
                        </div>

                        {home.access_summary && (
                            <div style={{ fontSize: '0.9rem', background: '#f9f9f9', padding: '0.5rem', borderRadius: '4px' }}>
                                {home.access_summary}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {home.features && (Array.isArray(home.features) ? home.features : JSON.parse(home.features || '[]')).map((feature, i) => (
                                <span key={i} className="tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}

                {results.length === 0 && (
                    <div className="text-center py-xl card">
                        <p>条件に一致する葬儀場は見つかりませんでした。</p>
                        <Link to="/" className="btn btn-outline" style={{ marginTop: '1rem', display: 'inline-block' }}>トップへ戻る</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;

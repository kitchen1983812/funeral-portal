import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { ChevronRight } from 'lucide-react';

const SearchArea = () => {
    const { pref_slug } = useParams();
    const [prefecture, setPrefecture] = useState(null);
    const [cityGroups, setCityGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [pref_slug]);

    const fetchData = async () => {
        try {
            setLoading(true);

            // 1. Get Prefecture ID from slug
            const { data: prefData, error: prefError } = await supabase
                .from('prefectures')
                .select('id, name')
                .eq('slug', pref_slug)
                .single();

            if (prefError) throw prefError;
            setPrefecture(prefData);

            // 2. Get city groups and cities
            const { data: groupsData, error: groupsError } = await supabase
                .from('city_groups')
                .select('*, cities(*)')
                .eq('prefecture_id', prefData.id)
                .order('order');

            if (groupsError) throw groupsError;

            // Sort cities
            const sortedGroups = groupsData.map(group => ({
                ...group,
                cities: group.cities.sort((a, b) => a.order - b.order)
            }));

            setCityGroups(sortedGroups);

        } catch (error) {
            console.error('Error fetching area data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container py-xl text-center">読み込み中...</div>;
    if (!prefecture) return <div className="container py-xl text-center">都道府県が見つかりません</div>;

    return (
        <div className="container py-xl">
            <h1 className="section-title" style={{ borderBottom: '2px solid var(--color-primary)', paddingBottom: '1rem' }}>
                {prefecture.name}の地域から葬儀・家族葬が行える葬儀場を探す
            </h1>

            {cityGroups.map(group => (
                <div key={group.id} style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', borderLeft: '5px solid var(--color-accent)', paddingLeft: '1rem' }}>
                        {group.name}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                        {group.cities.map(city => (
                            <Link
                                key={city.id}
                                to={`/search/result?city_id=${city.id}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                    textDecoration: 'none',
                                    color: 'var(--color-primary)',
                                    fontWeight: '500',
                                    borderBottom: '1px dotted #ccc'
                                }}
                            >
                                <span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>
                                    <ChevronRight size={16} />
                                </span>
                                {city.name}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}

            {cityGroups.length === 0 && (
                <div className="text-center py-xl">
                    <p>この都道府県にはまだエリア情報が登録されていません。</p>
                </div>
            )}
        </div>
    );
};

export default SearchArea;

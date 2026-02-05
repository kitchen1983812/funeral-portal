import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/JapanMapSearch.css';

const JapanMapSearch = () => {
    const navigate = useNavigate();
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch regions and prefectures nested
                const { data, error } = await supabase
                    .from('regions')
                    .select('*, prefectures(*)')
                    .order('order');

                if (error) throw error;

                // Sort prefectures by order within regions
                const sortedData = data.map(region => ({
                    ...region,
                    prefectures: region.prefectures.sort((a, b) => a.order - b.order)
                }));

                setRegions(sortedData);
            } catch (error) {
                console.error('Error fetching area data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePrefectureClick = (prefSlug) => {
        navigate(`/search/area/${prefSlug}`);
    };

    if (loading) return <div>読み込み中...</div>;

    // Helper to find region by slug
    const getRegion = (slug) => regions.find(r => r.slug === slug);

    return (
        <div className="japan-map-container">
            {/* Hokkaido / Tohoku (Top Right) */}
            <div className="region-block region-hokkaido">
                <div className="region-title">北海道・東北</div>
                <div className="pref-list">
                    {getRegion('hokkaido-tohoku')?.prefectures.map(pref => (
                        <button key={pref.id} onClick={() => handlePrefectureClick(pref.slug)}>{pref.name}</button>
                    ))}
                </div>
            </div>

            {/* Kanto (Right) */}
            <div className="region-block region-kanto">
                <div className="region-title">関東</div>
                <div className="pref-list">
                    {getRegion('kanto')?.prefectures.map(pref => (
                        <button key={pref.id} onClick={() => handlePrefectureClick(pref.slug)}>{pref.name}</button>
                    ))}
                </div>
            </div>

            {/* Chubu (Center Top) */}
            <div className="region-block region-chubu">
                <div className="region-title">中部</div>
                <div className="pref-list">
                    {getRegion('chubu')?.prefectures.map(pref => (
                        <button key={pref.id} onClick={() => handlePrefectureClick(pref.slug)}>{pref.name}</button>
                    ))}
                </div>
            </div>

            {/* Kansai (Center Bottom) */}
            <div className="region-block region-kansai">
                <div className="region-title">関西</div>
                <div className="pref-list">
                    {getRegion('kansai')?.prefectures.map(pref => (
                        <button key={pref.id} onClick={() => handlePrefectureClick(pref.slug)}>{pref.name}</button>
                    ))}
                </div>
            </div>

            {/* Chugoku / Shikoku (Left) */}
            <div className="region-block region-chugoku">
                <div className="region-title">中国・四国</div>
                <div className="pref-list">
                    {getRegion('chugoku-shikoku')?.prefectures.map(pref => (
                        <button key={pref.id} onClick={() => handlePrefectureClick(pref.slug)}>{pref.name}</button>
                    ))}
                </div>
            </div>

            {/* Kyushu / Okinawa (Bottom Left) */}
            <div className="region-block region-kyushu">
                <div className="region-title">九州・沖縄</div>
                <div className="pref-list">
                    {getRegion('kyushu-okinawa')?.prefectures.map(pref => (
                        <button key={pref.id} onClick={() => handlePrefectureClick(pref.slug)}>{pref.name}</button>
                    ))}
                </div>
            </div>

            {/* Abstract Map Background (CSS Art or SVG could go here) */}
            <div className="map-background">
                {/* Simplified Map Representation */}
                <svg viewBox="0 0 400 300" className="japan-svg">
                    <path d="M280,30 L320,10 L340,60 L300,80 Z" className="map-shape map-hokkaido" />
                    <path d="M280,90 L320,160 L240,160 L260,100 Z" className="map-shape map-tohoku" />
                    <path d="M220,160 L270,220 L240,240 L200,200 Z" className="map-shape map-kanto" />
                    <path d="M160,150 L220,160 L200,220 L150,200 Z" className="map-shape map-chubu" />
                    <path d="M120,180 L160,180 L150,230 L110,210 Z" className="map-shape map-kansai" />
                    <path d="M50,180 L110,180 L100,210 L60,200 Z" className="map-shape map-chugoku" />
                    <path d="M80,220 L120,220 L110,240 L90,230 Z" className="map-shape map-shikoku" />
                    <path d="M10,210 L50,210 L40,260 L20,250 Z" className="map-shape map-kyushu" />
                </svg>
            </div>
        </div>
    );
};

export default JapanMapSearch;

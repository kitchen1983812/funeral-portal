import React, { useState } from 'react';
import { Search } from 'lucide-react';
import JapanMapSearch from './JapanMapSearch';
import '../styles/SearchPanel.css';

const SearchPanel = () => {
    const [activeMainTab, setActiveMainTab] = useState('area');
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        // Implement keyword search logic here
        window.location.href = `/search?q=${encodeURIComponent(keyword)}`;
    };

    return (
        <div className="search-panel-container">
            {/* Main Tabs */}
            <div className="search-main-tabs">
                <div
                    className={`search-main-tab ${activeMainTab === 'area' ? 'active' : ''}`}
                    onClick={() => setActiveMainTab('area')}
                >
                    エリアから探す
                </div>
                <div
                    className={`search-main-tab ${activeMainTab === 'train' ? 'active' : ''}`}
                    onClick={() => setActiveMainTab('train')}
                >
                    駅・沿線から探す
                </div>
            </div>

            {activeMainTab === 'area' ? (
                <div className="search-panel-content">
                    <div className="area-search-container" style={{ padding: '1rem', width: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                            お近くの式場で葬儀を行えます
                        </div>
                        <JapanMapSearch />
                    </div>
                </div>
            ) : (
                <div className="search-panel-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                    <p className="text-text-light">駅・沿線検索機能は準備中です</p>
                </div>
            )}

            {/* Bottom: Free Word Search */}
            <div className="freeword-search-bar">
                <label className="freeword-label">
                    <Search size={20} /> フリーワードで探す
                </label>
                <input
                    type="text"
                    className="freeword-input"
                    placeholder="郵便番号・住所・施設名などを入力"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="freeword-btn" onClick={handleSearch}>検索</button>
            </div>
        </div>
    );
};

export default SearchPanel;

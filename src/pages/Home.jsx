import React from 'react';
import SearchPanel from '../components/SearchPanel';

const Home = () => {
  return (
    <div className="container py-xl">
      <h1 className="text-center section-title">大切なお別れを、<br />もっと身近に、もっと自由に</h1>
      <p className="text-center" style={{ marginBottom: '3rem' }}>
        あなたに寄り添う葬儀場が見つかります。
      </p>

      {/* Advanced Search Panel */}
      <div style={{ marginBottom: '4rem' }}>
        <SearchPanel />
      </div>

      <div className="text-center">
        <p style={{ marginBottom: '1rem', color: '#666' }}>機能デモ</p>
        <a href="/detail/1" className="btn btn-outline">
          詳細ページを確認 (口コミ機能)
        </a>
      </div>
    </div>
  );
};

export default Home;

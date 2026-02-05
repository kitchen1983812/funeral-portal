import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container py-xl">
            <h1 className="section-title">管理画面ダッシュボード</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <div className="card" style={{ padding: '2rem' }}>
                    <h2>葬儀社管理</h2>
                    <p>葬儀社（運営会社）の登録・編集・削除を行います。</p>
                    <Link to="/admin/companies" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>葬儀社一覧へ</Link>
                </div>
                <div className="card" style={{ padding: '2rem' }}>
                    <h2>斎場管理</h2>
                    <p>斎場（施設）の登録・編集・削除を行います。</p>
                    <Link to="/admin/homes" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>斎場一覧へ</Link>
                </div>
                <div className="card" style={{ padding: '2rem' }}>
                    <h2>CSVインポート</h2>
                    <p>CSVファイルからデータを一括登録します。</p>
                    <Link to="/admin/import" className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>インポート画面へ</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

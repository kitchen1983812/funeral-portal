import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const CompaniesList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('funeral_companies')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCompanies(data || []);
        } catch (error) {
            console.error('Error fetching companies:', error);
            alert('データの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('本当に削除しますか？紐づく斎場がある場合、エラーになる可能性があります。')) return;

        try {
            const { error } = await supabase
                .from('funeral_companies')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setCompanies(companies.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting company:', error);
            alert('削除に失敗しました');
        }
    };

    if (loading) return <div className="container py-xl text-center">読み込み中...</div>;

    return (
        <div className="container py-xl">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ margin: 0 }}>葬儀社一覧</h1>
                <Link to="/admin/companies/new" className="btn btn-primary">新規登録</Link>
            </div>

            <div className="card">
                <table className="info-table" style={{ width: '100%' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                            <th style={{ padding: '1rem' }}>会社名</th>
                            <th style={{ padding: '1rem' }}>電話番号</th>
                            <th style={{ padding: '1rem' }}>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company => (
                            <tr key={company.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{company.name}</td>
                                <td style={{ padding: '1rem' }}>{company.tel}</td>
                                <td style={{ padding: '1rem' }}>
                                    <Link to={`/admin/companies/${company.id}`} style={{ marginRight: '1rem', color: 'var(--color-primary)' }}>編集</Link>
                                    <button onClick={() => handleDelete(company.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>削除</button>
                                </td>
                            </tr>
                        ))}
                        {companies.length === 0 && (
                            <tr>
                                <td colSpan="3" style={{ padding: '2rem', textAlign: 'center' }}>登録された葬儀社はありません</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: '2rem' }}>
                <Link to="/admin">← ダッシュボードに戻る</Link>
            </div>
        </div>
    );
};

export default CompaniesList;

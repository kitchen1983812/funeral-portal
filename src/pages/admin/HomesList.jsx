import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const HomesList = () => {
    const [homes, setHomes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHomes();
    }, []);

    const fetchHomes = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('funeral_homes')
                .select('*, funeral_companies(name)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setHomes(data || []);
        } catch (error) {
            console.error('Error fetching homes:', error);
            alert('データの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('本当に削除しますか？関連する口コミも削除される可能性があります。')) return;

        try {
            const { error } = await supabase
                .from('funeral_homes')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setHomes(homes.filter(h => h.id !== id));
        } catch (error) {
            console.error('Error deleting home:', error);
            alert('削除に失敗しました');
        }
    };

    if (loading) return <div className="container py-xl text-center">読み込み中...</div>;

    return (
        <div className="container py-xl">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ margin: 0 }}>斎場一覧</h1>
                <Link to="/admin/homes/new" className="btn btn-primary">新規登録</Link>
            </div>

            <div className="card">
                <table className="info-table" style={{ width: '100%' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                            <th style={{ padding: '1rem' }}>名称</th>
                            <th style={{ padding: '1rem' }}>運営会社</th>
                            <th style={{ padding: '1rem' }}>住所</th>
                            <th style={{ padding: '1rem' }}>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homes.map(home => (
                            <tr key={home.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{home.name}</td>
                                <td style={{ padding: '1rem' }}>{home.funeral_companies?.name || '-'}</td>
                                <td style={{ padding: '1rem' }}>{home.address}</td>
                                <td style={{ padding: '1rem' }}>
                                    <Link to={`/admin/homes/${home.id}`} style={{ marginRight: '1rem', color: 'var(--color-primary)' }}>編集</Link>
                                    <button onClick={() => handleDelete(home.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>削除</button>
                                </td>
                            </tr>
                        ))}
                        {homes.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>登録された斎場はありません</td>
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

export default HomesList;

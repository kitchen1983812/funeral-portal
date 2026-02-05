import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const CompanyEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        tel: '',
        website_url: ''
    });

    useEffect(() => {
        if (!isNew) {
            fetchCompany();
        }
    }, [id]);

    const fetchCompany = async () => {
        try {
            const { data, error } = await supabase
                .from('funeral_companies')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setFormData(data);
        } catch (error) {
            console.error('Error fetching company:', error);
            alert('データの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let error;
            if (isNew) {
                const { error: insertError } = await supabase
                    .from('funeral_companies')
                    .insert([formData]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase
                    .from('funeral_companies')
                    .update(formData)
                    .eq('id', id);
                error = updateError;
            }

            if (error) throw error;
            alert('保存しました');
            navigate('/admin/companies');
        } catch (error) {
            console.error('Error saving company:', error);
            alert('保存に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container py-xl text-center">読み込み中...</div>;

    return (
        <div className="container py-xl">
            <h1 className="section-title">{isNew ? '葬儀社登録' : '葬儀社編集'}</h1>

            <div className="card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>会社名 <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-control"
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>住所</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>電話番号</label>
                        <input
                            type="text"
                            name="tel"
                            value={formData.tel || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>WebサイトURL</label>
                        <input
                            type="text"
                            name="website_url"
                            value={formData.website_url || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/admin/companies" className="btn btn-outline">キャンセル</Link>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? '保存中...' : '保存する'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyEdit;

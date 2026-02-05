import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const HomeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        company_id: '',
        address: '',
        tel: '',
        description: '',
        access_summary: '',
        features_input: '' // Temporary input for JSON features
    });

    useEffect(() => {
        fetchCompanies();
        if (!isNew) {
            fetchHome();
        }
    }, [id]);

    const fetchCompanies = async () => {
        const { data } = await supabase.from('funeral_companies').select('id, name');
        setCompanies(data || []);
    };

    const fetchHome = async () => {
        try {
            const { data, error } = await supabase
                .from('funeral_homes')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            const features = Array.isArray(data.features) ? data.features.join(', ') : '';
            setFormData({ ...data, features_input: features });
        } catch (error) {
            console.error('Error fetching home:', error);
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

            // Prepare data for DB
            const featuresArray = formData.features_input.split(',').map(s => s.trim()).filter(s => s);
            const submitData = {
                name: formData.name,
                company_id: formData.company_id || null,
                address: formData.address,
                tel: formData.tel,
                description: formData.description,
                access_summary: formData.access_summary,
                features: JSON.stringify(featuresArray) // Supabase expects JSON
            };

            let error;
            if (isNew) {
                const { error: insertError } = await supabase
                    .from('funeral_homes')
                    .insert([submitData]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase
                    .from('funeral_homes')
                    .update(submitData)
                    .eq('id', id);
                error = updateError;
            }

            if (error) throw error;
            alert('保存しました');
            navigate('/admin/homes');
        } catch (error) {
            console.error('Error saving home:', error);
            alert('保存に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container py-xl text-center">読み込み中...</div>;

    return (
        <div className="container py-xl">
            <h1 className="section-title">{isNew ? '斎場登録' : '斎場編集'}</h1>

            <div className="card" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>斎場名 <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>運営会社</label>
                        <select name="company_id" value={formData.company_id || ''} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                            <option value="">選択してください</option>
                            {companies.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>住所</label>
                        <input type="text" name="address" value={formData.address || ''} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>電話番号</label>
                        <input type="text" name="tel" value={formData.tel || ''} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>施設概要</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} rows="4" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>アクセス情報</label>
                        <textarea name="access_summary" value={formData.access_summary || ''} onChange={handleChange} rows="2" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>特徴 (カンマ区切り)</label>
                        <input type="text" name="features_input" value={formData.features_input || ''} onChange={handleChange} placeholder="駐車場あり, バリアフリー, 宿泊可" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/admin/homes" className="btn btn-outline">キャンセル</Link>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? '保存中...' : '保存する'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HomeEdit;

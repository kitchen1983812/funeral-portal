import React, { useState } from 'react';
import Papa from 'papaparse';
import { supabase } from '../../supabaseClient';

const CsvImport = () => {
    const [targetTable, setTargetTable] = useState('funeral_companies');
    const [importing, setImporting] = useState(false);
    const [logs, setLogs] = useState([]);

    // Standard columns for mapping (others go to extended_data)
    const STANDARD_COLUMNS = {
        funeral_companies: ['name', 'address', 'tel', 'website_url'],
        funeral_homes: ['name', 'address', 'tel', 'access_summary', 'company_id', 'city_id'] // features handled separately if JSON
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImporting(true);
        setLogs([]);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                await processData(results.data);
                setImporting(false);
            },
            error: (error) => {
                console.error('CSV Error:', error);
                addLog(`CSV解析エラー: ${error.message}`, 'error');
                setImporting(false);
            }
        });
    };

    const processData = async (data) => {
        addLog(`${data.length} 件のデータを検出しました。インポートを開始します...`, 'info');

        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            const standardCols = STANDARD_COLUMNS[targetTable];

            let insertData = {};
            let extendedData = {};

            // Separate standard columns and extended data
            Object.keys(row).forEach(key => {
                // Skip empty keys
                if (!key) return;

                if (standardCols.includes(key)) {
                    insertData[key] = row[key];
                } else if (key === 'features' && targetTable === 'funeral_homes') {
                    // Try to parse features as JSON if possible, else extend
                    try {
                        insertData['features'] = JSON.parse(row[key]);
                    } catch (e) {
                        // split by comma if string
                        insertData['features'] = row[key].split(/[,、]/).map(s => s.trim()).filter(s => s);
                    }
                } else {
                    // Add to extended_data
                    extendedData[key] = row[key];
                }
            });

            // Add extended_data to insert object if not empty
            if (Object.keys(extendedData).length > 0) {
                insertData['extended_data'] = extendedData;
            }

            try {
                const { error } = await supabase
                    .from(targetTable)
                    .insert(insertData);

                if (error) throw error;
                successCount++;
            } catch (err) {
                console.error('Import Error:', err);
                errorCount++;
                addLog(`行 ${i + 1} (${row.name || 'No Name'}) のインポート失敗: ${err.message}`, 'error');
            }
        }

        addLog(`完了: 成功 ${successCount}件 / 失敗 ${errorCount}件`, 'success');
    };

    const addLog = (message, type = 'info') => {
        setLogs(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }]);
    };

    const downloadTemplate = () => {
        const standardCols = STANDARD_COLUMNS[targetTable];
        // Example headers: standard columns + some example extended columns
        let headers = [...standardCols];

        if (targetTable === 'funeral_companies') {
            headers.push('example_extended_col_1', 'example_extended_col_2');
        } else {
            headers.push('features', 'parking_count', 'founded_year');
        }

        const csvContent = headers.join(',') + '\n';
        // Add BOM for Excel compatibility
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${targetTable}_template.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container py-xl">
            <h1 className="section-title">CSV一括インポート</h1>

            <div className="card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>インポート対象テーブル</label>
                    <select
                        value={targetTable}
                        onChange={(e) => setTargetTable(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem' }}
                    >
                        <option value="funeral_companies">葬儀社 (Companies)</option>
                        <option value="funeral_homes">斎場 (Homes)</option>
                    </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <button
                        onClick={downloadTemplate}
                        className="btn btn-outline"
                        style={{ width: '100%', marginBottom: '1rem', cursor: 'pointer' }}
                    >
                        CSVテンプレートをダウンロード
                    </button>

                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CSVファイルを選択</label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        disabled={importing}
                        style={{ width: '100%' }}
                    />
                </div>

                {importing && <p style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>インポート処理中... 画面を閉じないでください。</p>}

                <div style={{ marginTop: '2rem', background: '#f9fafb', padding: '1rem', borderRadius: '4px', maxHeight: '300px', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>処理ログ</h3>
                    {logs.length === 0 && <p style={{ color: '#888' }}>まだログはありません。</p>}
                    {logs.map((log, index) => (
                        <div key={index} style={{
                            fontSize: '0.9rem',
                            marginBottom: '0.25rem',
                            color: log.type === 'error' ? 'red' : log.type === 'success' ? 'green' : '#333'
                        }}>
                            [{log.time}] {log.message}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
                <h3>CSVフォーマットについて</h3>
                <p>ヘッダー行（1行目）が必要です。以下の標準カラムは自動的にマッピングされます。</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    {STANDARD_COLUMNS[targetTable].map(col => <li key={col}>{col}</li>)}
                    {targetTable === 'funeral_homes' && <li>features (カンマ区切りテキスト可)</li>}
                </ul>
                <p><strong>これ以外の列名は、自動的に「拡張データ (extended_data)」として保存されます。</strong><br />例: `parking_count`, `founded_year` など、自由に追加可能です。</p>
            </div>
        </div>
    );
};

export default CsvImport;

// ScanLedger Frontend - Main Page
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface BackendStatus {
    status: string;
    redis?: string;
    db?: string;
    message?: string;
}

export default function Home() {
    const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use the environment variable or fallback to localhost for browser-side requests
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

        axios.get(`${apiUrl}/health`)
            .then((res: { data: BackendStatus }) => {
                setBackendStatus(res.data);
                setLoading(false);
            })
            .catch((err: Error) => {
                setBackendStatus({ status: 'error', message: err.message });
                setLoading(false);
            });
    }, []);

    return (
        <div style={{
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#f9fafb',
            minHeight: '100vh'
        }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: '#111827', fontSize: '2.5rem', marginBottom: '0.5rem' }}>ScanLedger MVP</h1>
                <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>Development Environment Successfully Initialized</p>
            </header>

            <main>
                <section style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                }}>
                    <h2 style={{ color: '#1f2937', marginTop: 0 }}>System Status</h2>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 'bold' }}>Frontend:</span>
                            <span style={{ color: '#059669' }}>● Running (Next.js + TypeScript)</span>
                        </div>

                        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>Backend Connectivity (FastAPI)</h3>
                            {loading ? (
                                <p>Checking backend status...</p>
                            ) : (
                                <pre style={{
                                    backgroundColor: '#f3f4f6',
                                    padding: '1rem',
                                    borderRadius: '6px',
                                    overflowX: 'auto',
                                    fontSize: '0.875rem'
                                }}>
                                    {JSON.stringify(backendStatus, null, 2)}
                                </pre>
                            )}
                        </div>
                    </div>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2 style={{ color: '#1f2937' }}>Stack Details</h2>
                    <ul style={{ color: '#4b5563', lineHeight: '1.6' }}>
                        <li><strong>Frontend:</strong> Next.js, TypeScript, Axios</li>
                        <li><strong>Backend:</strong> FastAPI, Uvicorn, Pydantic</li>
                        <li><strong>Database:</strong> PostgreSQL</li>
                        <li><strong>Cache:</strong> Redis</li>
                        <li><strong>Orchestration:</strong> Docker Compose</li>
                    </ul>
                </section>
            </main>

            <footer style={{ marginTop: '4rem', color: '#9ca3af', fontSize: '0.875rem', textAlign: 'center' }}>
                ScanLedger MVP &copy; {new Date().getFullYear()}
            </footer>
        </div>
    );
}

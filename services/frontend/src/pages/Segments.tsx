import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RuleEditor from '../components/RuleEditor/RuleEditor';

const Segments = () => {
    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSegments = async () => {
            try {
                const response = await axios.get('/api/segments');
                setSegments(response.data);
            } catch (error) {
                console.error('Error fetching segments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSegments();
    }, []);

    const handleAddSegment = (newSegment) => {
        setSegments([...segments, newSegment]);
    };

    if (loading) {
        return <div>Loading segments...</div>;
    }

    return (
        <div>
            <h1>Segments</h1>
            <RuleEditor onAddSegment={handleAddSegment} />
            <ul>
                {segments.map((segment, index) => (
                    <li key={index}>{segment.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Segments;
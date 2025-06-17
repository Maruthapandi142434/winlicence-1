import { useState, useEffect } from 'react';

export default function TagManager({ selectedTags = [], onTagsChange }) {
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/tags');
        if (!res.ok) throw new Error('Failed to fetch tags');
        const data = await res.json();
        setAvailableTags(data);
      } catch (err) {
        setError('Failed to load tags');
        console.error('Error loading tags:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) return <div>Loading tags...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const handleTagChange = (tagId) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    onTagsChange(newSelectedTags);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {availableTags && availableTags.map(tag => (
          <label key={tag.id} className="inline-flex items-center">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.id)}
              onChange={() => handleTagChange(tag.id)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">{tag.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
} 
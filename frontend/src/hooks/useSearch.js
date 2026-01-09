import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

/**
 * Search hook with debouncing and field filtering
 * @param {Array} data - Array of objects to search through
 * @param {Array<string>} searchFields - Array of field names to search in
 * @returns {Object} - { query, setQuery, filtered }
 */
export function useSearch(data, searchFields) {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);

    const filtered = useMemo(() => {
        if (!debouncedQuery || !data) return data;

        const lowerQuery = debouncedQuery.toLowerCase();

        return data.filter(item =>
            searchFields.some(field => {
                const value = item[field];
                if (!value) return false;
                return String(value).toLowerCase().includes(lowerQuery);
            })
        );
    }, [data, debouncedQuery, searchFields]);

    return { query, setQuery, filtered };
}

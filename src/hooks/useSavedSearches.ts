import { useState, useEffect, useCallback } from 'react';
import type { SavedSearch } from '../mocks/taskFilterData';

const STORAGE_KEY = 'task-saved-searches';

export interface UseSavedSearchesReturn {
    savedSearches: SavedSearch[];
    saveSearch: (name: string, filters: Record<string, string | string[]>) => void;
    loadSearch: (id: string) => SavedSearch | undefined;
    deleteSearch: (id: string) => void;
    renameSearch: (id: string, newName: string) => void;
    reorderSearches: (searches: SavedSearch[]) => void;
}

export const useSavedSearches = (initialSearches: SavedSearch[] = []): UseSavedSearchesReturn => {
    const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() => {
        // Try to load from localStorage
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Convert date strings back to Date objects
                return parsed.map((search: any) => ({
                    ...search,
                    createdAt: new Date(search.createdAt),
                    updatedAt: new Date(search.updatedAt),
                }));
            }
        } catch (error) {
            console.error('Failed to load saved searches from localStorage:', error);
        }
        return initialSearches;
    });

    // Save to localStorage whenever savedSearches changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSearches));
        } catch (error) {
            console.error('Failed to save searches to localStorage:', error);
        }
    }, [savedSearches]);

    const saveSearch = useCallback((name: string, filters: Record<string, string | string[]>) => {
        const newSearch: SavedSearch = {
            id: `search-${Date.now()}`,
            name,
            filters,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setSavedSearches(prev => [...prev, newSearch]);
    }, []);

    const loadSearch = useCallback((id: string): SavedSearch | undefined => {
        return savedSearches.find(search => search.id === id);
    }, [savedSearches]);

    const deleteSearch = useCallback((id: string) => {
        setSavedSearches(prev => prev.filter(search => search.id !== id));
    }, []);

    const renameSearch = useCallback((id: string, newName: string) => {
        setSavedSearches(prev =>
            prev.map(search =>
                search.id === id
                    ? { ...search, name: newName, updatedAt: new Date() }
                    : search
            )
        );
    }, []);

    const reorderSearches = useCallback((searches: SavedSearch[]) => {
        setSavedSearches(searches);
    }, []);

    return {
        savedSearches,
        saveSearch,
        loadSearch,
        deleteSearch,
        renameSearch,
        reorderSearches,
    };
};

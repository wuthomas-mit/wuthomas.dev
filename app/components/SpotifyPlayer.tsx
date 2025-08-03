'use client';

import { useState, useEffect } from 'react';

interface SpotifyTrack {
    name: string;
    artist: string;
    album: string;
    image: string;
    isPlaying: boolean;
    progress: number;
    duration: number;
    url: string;
}

interface SpotifyPlayerProps {
    onClose: () => void;
}

export default function SpotifyPlayer({ onClose }: SpotifyPlayerProps) {
    const [track, setTrack] = useState<SpotifyTrack | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSpotifyData = async () => {
            try {
                setLoading(true);

                // Try to fetch real Spotify data
                const response = await fetch('/api/spotify/current-track');

                if (response.status === 401) {
                    // Not authenticated, redirect to Spotify auth
                    setError('Please connect your Spotify account');
                    setLoading(false);
                    return;
                }

                if (response.ok) {
                    const trackData = await response.json();
                    setTrack(trackData);
                } else {
                    // Fallback to mock data if API fails
                    const mockTrack: SpotifyTrack = {
                        name: "As It Was",
                        artist: "Harry Styles",
                        album: "Harry's House",
                        image: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14",
                        isPlaying: false,
                        progress: 0,
                        duration: 167000,
                        url: "https://open.spotify.com/track/4Dvkj6JhhA12EX05fT7y2e"
                    };
                    setTrack(mockTrack);
                }

                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch Spotify data:', err);
                setError('Failed to load Spotify data');
                setLoading(false);
            }
        };

        fetchSpotifyData();
    }, []);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleOpenSpotify = () => {
        if (track?.url) {
            window.open(track.url, '_blank');
        }
    };

    const handleConnectSpotify = () => {
        window.location.href = '/api/auth/spotify';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-gradient-to-b from-gray-800 to-black rounded-lg p-6 w-80 shadow-2xl border border-gray-700 pointer-events-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-white font-semibold text-sm">Spotify</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4"></div>
                        <p className="text-gray-400 text-sm">Loading your music...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <p className="text-red-400 text-sm mb-4">{error}</p>
                        {error.includes('connect') ? (
                            <button
                                onClick={handleConnectSpotify}
                                className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded text-white text-sm transition-colors mb-2"
                            >
                                Connect Spotify
                            </button>
                        ) : null}
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white text-sm transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : track ? (
                    <div className="space-y-4">
                        {/* Album Art and Track Info */}
                        <div className="flex space-x-4">
                            <img
                                src={track.image}
                                alt={`${track.album} cover`}
                                className="w-16 h-16 rounded-md shadow-md"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/experiences/spotify.png';
                                }}
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold text-sm truncate">
                                    {track.name}
                                </h3>
                                <p className="text-gray-400 text-xs truncate">
                                    {track.artist}
                                </p>
                                <p className="text-gray-500 text-xs truncate">
                                    {track.album}
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>{formatTime(track.progress)}</span>
                                <span>{formatTime(track.duration)}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1">
                                <div
                                    className="bg-green-500 h-1 rounded-full transition-all duration-300"
                                    style={{ width: `${(track.progress / track.duration) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center space-x-4">
                            <button className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                                </svg>
                            </button>
                            <button className="text-white bg-green-500 hover:bg-green-400 rounded-full p-2 transition-colors">
                                {track.isPlaying ? (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                            <button className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                                </svg>
                            </button>
                        </div>

                        {/* Open in Spotify */}
                        <button
                            onClick={handleOpenSpotify}
                            className="w-full py-2 bg-green-500 hover:bg-green-400 rounded text-white text-sm font-semibold transition-colors"
                        >
                            Open in Spotify
                        </button>

                        {/* Status */}
                        <div className="text-center">
                            <span className="text-xs text-gray-500">
                                {track.isPlaying ? 'Currently playing' : 'Last played'}
                            </span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

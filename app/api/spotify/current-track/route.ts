import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('spotify_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Try to get currently playing track
    const currentlyPlayingResponse = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (currentlyPlayingResponse.status === 200) {
      const data = await currentlyPlayingResponse.json();
      if (data && data.item) {
        return NextResponse.json({
          name: data.item.name,
          artist: data.item.artists.map((artist: any) => artist.name).join(', '),
          album: data.item.album.name,
          image: data.item.album.images[0]?.url || '',
          isPlaying: data.is_playing,
          progress: data.progress_ms || 0,
          duration: data.item.duration_ms,
          url: data.item.external_urls.spotify,
        });
      }
    }

    // If no currently playing track, get recently played
    const recentlyPlayedResponse = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (recentlyPlayedResponse.ok) {
      const data = await recentlyPlayedResponse.json();
      if (data.items && data.items.length > 0) {
        const track = data.items[0].track;
        return NextResponse.json({
          name: track.name,
          artist: track.artists.map((artist: any) => artist.name).join(', '),
          album: track.album.name,
          image: track.album.images[0]?.url || '',
          isPlaying: false,
          progress: 0,
          duration: track.duration_ms,
          url: track.external_urls.spotify,
        });
      }
    }

    return NextResponse.json({ error: 'No track data available' }, { status: 404 });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json({ error: 'Failed to fetch track data' }, { status: 500 });
  }
}

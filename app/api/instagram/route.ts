import { NextResponse } from 'next/server';

interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      throw new Error('Missing Instagram configuration');
    }

    const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${accessToken}&limit=12`;

    const response = await fetch(url, {
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Instagram posts');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json(
      {
        error: 'Failed to load Instagram posts',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

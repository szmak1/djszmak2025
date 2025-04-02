export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Since we're on Netlify, we can try direct submission first
    try {
      // Direct submission to Netlify's form handler
      const directFormResponse = await fetch('/.netlify/functions/submission-created', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(
          Array.from(formData.entries()).map(pair => [pair[0], pair[1].toString()])
        ),
      });

      if (directFormResponse.ok) {
        console.log('Form submitted directly to Netlify successfully');
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Form submitted successfully',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      console.warn('Direct form submission failed, trying fallback method');
    } catch (directError) {
      console.error('Error in direct form submission:', directError);
      // Continue to fallback method
    }

    // Fallback: Create form params manually
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value.toString());
    }

    // Use environment variable for form URL or default
    const formUrl = process.env.NETLIFY_FORMS_URL || '/.netlify/functions/submission-created';

    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    // For debugging
    const responseText = await response.text();
    console.log('Netlify form submission response:', {
      status: response.status,
      text: responseText.substring(0, 200), // Log first 200 chars
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: 'Failed to submit form',
          status: response.status,
          details: responseText.substring(0, 100), // Include first 100 chars of error
        }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

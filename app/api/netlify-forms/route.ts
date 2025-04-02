export async function POST(request: Request) {
  const formData = await request.formData();
  const formUrl = process.env.NETLIFY_FORMS_URL || '/.netlify/functions/submission-created';

  const response = await fetch(formUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(
      Array.from(formData.entries()).map(([key, value]) => [key, value.toString()])
    ),
  });

  if (!response.ok) {
    return new Response(
      JSON.stringify({
        error: 'Failed to submit form',
        details: await response.text(),
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
}

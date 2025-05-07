// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Interface for request body
interface ContactRequestBody {
  cloudflare_turnstile: string;
  first_name: string;
  organisation?: string;
  email: string;
  user_message: string;
}

// Sanitize user input
function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>&"']/g, (char) => {
    const charMap: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&apos;',
    };
    return charMap[char];
  });
}

// Verify Cloudflare Turnstile token
async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Missing TURNSTILE_SECRET_KEY environment variable');
  }

  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const outcome = await response.json();
  if (outcome.success) {
    return true;
  } else {
    console.error('Turnstile verification failed:', outcome);
    return false;
  }
}

// Send message to Discord webhook
async function sendDiscordMessage(
  first_name: string,
  organisation: string | undefined,
  email: string,
  userMessage: string
): Promise<void> {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!discordWebhookUrl) {
    throw new Error('Missing DISCORD_WEBHOOK_URL environment variable');
  }

  const sanitizedMessage = sanitizeInput(userMessage);
  const sanitizedFirstName = sanitizeInput(first_name);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedOrganisation = sanitizeInput(organisation);

  const embed = {
    title: `${sanitizedFirstName} Report`,
    description: '```' + sanitizedMessage + '```',
    fields: [
      {
        name: 'Email',
        value: sanitizedEmail,
        inline: true,
      },
      {
        name: 'Organisation',
        value: sanitizedOrganisation || 'None',
        inline: true,
      },
    ],
    color: 0x0099ff,
  };

  const discordPayload = {
    embeds: [embed],
  };

  const response = await fetch(discordWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(discordPayload),
  });

  if (!response.ok) {
    console.error('Error sending message to Discord:', response.statusText);
    throw new Error('Failed to send message to Discord');
  }
  console.log('Message sent to Discord');
}

// POST handler for the API route
export async function POST(req: NextRequest) {
  try {
    const body: ContactRequestBody = await req.json();
    const { cloudflare_turnstile, first_name, organisation, email, user_message } = body;

    // Validate required fields
    if (!first_name || !email || !user_message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Verify Turnstile
    const isValid = await verifyTurnstile(cloudflare_turnstile);
    if (!isValid) {
      return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 });
    }

    // Send message to Discord
    await sendDiscordMessage(first_name, organisation, email, user_message);
    return NextResponse.json({ message: 'Message sent to Discord' }, { status: 200 });
  } catch (error) {
    console.error('Error occurred while handling submission:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
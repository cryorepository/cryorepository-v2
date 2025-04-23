import { NextRequest, NextResponse } from "next/server";

// Define TypeScript interfaces
interface SubmissionBody {
  cloudflare_turnstile: string;
  page_name: string;
  page_url: string;
  email: string;
  user_message: string;
}

interface TurnstileResponse {
  success: boolean;
  error?: string[];
}

// Sanitize input by removing specific characters
function sanitizeInput(input: string): string {
  return input.replace(/[`~!^*_|+\-=\[\]{}\\\/]/gi, "");
}

// Send message to Discord webhook
async function sendDiscordMessage(pageName: string, pageUrl: string, email: string, userMessage: string): Promise<void> {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!discordWebhookUrl) {
    throw new Error("DISCORD_WEBHOOK_URL is not defined");
  }
  console.log("request");

  const sanitizedMessage = sanitizeInput(userMessage);
  const discordMessage = {
    content: pageUrl
      ? `# [${sanitizeInput(pageName)}](${pageUrl})\n\n**Email: ${sanitizeInput(email)}**\n\n\`\`\`${sanitizedMessage}\`\`\``
      : `# ${sanitizeInput(pageName)}\n\n**Email: ${sanitizeInput(email)}**\n\n\`\`\`${sanitizedMessage}\`\`\``,
  };

  const response = await fetch(discordWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discordMessage),
  });

  if (!response.ok) {
    console.error("Failed to send message to Discord:", response.statusText);
    throw new Error("Failed to send message to Discord");
  }

  console.log("Message sent to Discord");
}

// Verify Cloudflare Turnstile token
async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not defined");
    throw new Error("TURNSTILE_SECRET_KEY is not defined");
  }

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const outcome: TurnstileResponse = await response.json();

  if (outcome.success) {
    return true;
  } else {
    console.error("Turnstile verification failed:", outcome);
    return false;
  }
}

// POST /api/report-error
export async function POST(req: NextRequest) {
  try {
    const body: SubmissionBody = await req.json();

    const { cloudflare_turnstile, page_name, page_url, email, user_message } = body;

    // Validate required fields
    if (!page_name || !email || !user_message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Verify Turnstile token
    const isValid = await verifyTurnstile(cloudflare_turnstile);
    if (!isValid) {
      return NextResponse.json({ error: "Turnstile verification failed" }, { status: 400 });
    }

    // Send message to Discord
    await sendDiscordMessage(page_name, page_url, email, user_message);

    return NextResponse.json({ message: "Message sent to Discord" }, { status: 200 });
  } catch (error) {
    console.error("Error occurred while handling submission:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
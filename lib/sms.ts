export async function sendSMS(phone: string, message: string) {
  const apiKey = process.env.ARKESEL_API_KEY;
  
  if (!apiKey) {
    console.warn("No ARKESEL_API_KEY set. SMS not sent.");
    return false;
  }

  try {
    const response = await fetch('https://sms.arkesel.com/api/v2/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: 'ASHVILLE',
        message: message,
        recipients: [phone],
      }),
    });

    const data = await response.json();
    console.log("SMS Response:", data);
    return response.ok;
  } catch (error) {
    console.error("Failed to send SMS:", error);
    return false;
  }
}

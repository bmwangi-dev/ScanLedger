from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
from typing import List
import os

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT")),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

fm = FastMail(conf)

async def send_waitlist_confirmation(email: EmailStr, name: str):
    """Send a waitlist confirmation email to the user"""
    
    html_body = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ScanLedger Waitlist</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, hsl(222, 47%, 11%) 0%, hsl(222, 30%, 20%) 50%, hsl(200, 50%, 15%) 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; font-family: 'Space Grotesk', sans-serif;">
                                    Welcome to ScanLedger!
                                </h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="margin: 0 0 20px; color: hsl(222, 47%, 11%); font-size: 24px; font-weight: 700;">
                                    Hi {name}! 👋
                                </h2>
                                
                                <p style="margin: 0 0 20px; color: hsl(215, 16%, 47%); font-size: 16px; line-height: 1.6;">
                                    Thank you for joining the ScanLedger waitlist! We're excited to have you on board.
                                </p>
                                
                                <p style="margin: 0 0 20px; color: hsl(215, 16%, 47%); font-size: 16px; line-height: 1.6;">
                                    ScanLedger is revolutionizing expense tracking by combining powerful OCR technology with blockchain security. Here's what you can expect:
                                </p>
                                
                                <div style="background-color: hsl(210, 40%, 96%); border-radius: 12px; padding: 20px; margin: 20px 0;">
                                    <ul style="margin: 0; padding-left: 20px; color: hsl(222, 47%, 11%);">
                                        <li style="margin-bottom: 10px;"><strong>Smart OCR Extraction</strong> - Automatically capture receipt data</li>
                                        <li style="margin-bottom: 10px;"><strong>Blockchain Anchoring</strong> - Tamper-proof financial records</li>
                                        <li style="margin-bottom: 10px;"><strong>Real-time Dashboards</strong> - Track expenses effortlessly</li>
                                        <li style="margin-bottom: 0;"><strong>Bank-level Security</strong> - Your data is always protected</li>
                                    </ul>
                                </div>
                                
                                <p style="margin: 20px 0; color: hsl(215, 16%, 47%); font-size: 16px; line-height: 1.6;">
                                    As a waitlist member, you'll be among the first to know when we launch, and you'll get exclusive early access to the platform.
                                </p>
                                
                                <p style="margin: 20px 0 0; color: hsl(215, 16%, 47%); font-size: 16px; line-height: 1.6;">
                                    We'll keep you updated on our progress. Stay tuned! 🚀
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: hsl(222, 47%, 11%); padding: 30px; text-align: center;">
                                <p style="margin: 0 0 10px; color: rgba(255, 255, 255, 0.6); font-size: 14px;">
                                    © 2026 ScanLedger. All rights reserved.
                                </p>
                                <p style="margin: 0; color: rgba(255, 255, 255, 0.6); font-size: 12px;">
                                    You received this email because you signed up for the ScanLedger waitlist.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    
    message = MessageSchema(
        subject="You're on the ScanLedger Waitlist! 🎉",
        recipients=[email],
        body=html_body,
        subtype=MessageType.html
    )
    
    await fm.send_message(message)
    return True

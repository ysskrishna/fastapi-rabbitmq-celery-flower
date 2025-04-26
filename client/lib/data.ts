export type Template = {
  id: number
  title: string
  content: string
  language: string
  template_type: string
  tags: string[]
  type: "sms" | "email"
  subject?: string
}

export const templates: Template[] = [
  {
    id: 1,
    title: "OTP Verification",
    content: "Your OTP is {{otp}}, valid for 5 minutes.",
    language: "en",
    template_type: "security",
    tags: ["otp", "security", "login"],
    type: "sms",
  },
  {
    id: 2,
    title: "Account Activation",
    content: "Welcome to {{app_name}}! Use code {{activation_code}} to activate your account.",
    language: "en",
    template_type: "security",
    tags: ["activation", "account", "security"],
    type: "sms",
  },
  {
    id: 3,
    title: "Account Verification",
    subject: "Verify your email address",
    content:
      "<html><head><style>body{font-family: Arial, sans-serif; padding: 20px; color: #333;} .container{max-width: 600px; margin: 0 auto;} h1{color: #4CAF50;} .button{background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;} @media (max-width: 600px){.container{padding: 15px;}}</style></head><body><div class='container'><h1>Account Verification</h1><p>Hi {{user_name}},</p><p>Thank you for signing up. Please verify your email address by clicking the button below:</p><a href='{{verification_link}}' class='button'>Verify Email</a><p>If you didn't sign up for this account, please ignore this email.</p><p>Best regards, <br>The {{company_name}} Team</p></div></body></html>",
    language: "en",
    template_type: "security",
    tags: ["account", "verification"],
    type: "email",
  },
  {
    id: 4,
    title: "Password Reset",
    subject: "Reset your password",
    content:
      "<html><head><style>body{font-family: Arial, sans-serif; padding: 20px; color: #333;} .container{max-width: 600px; margin: 0 auto;} h1{color: #FF5733;} .button{background-color: #FF5733; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;} @media (max-width: 600px){.container{padding: 15px;}}</style></head><body><div class='container'><h1>Password Reset Request</h1><p>Hi {{user_name}},</p><p>We received a request to reset your password. Click the button below to reset your password:</p><a href='{{reset_link}}' class='button'>Reset Password</a><p>If you didn't request a password reset, please ignore this email.</p><p>Best regards, <br>The {{company_name}} Team</p></div></body></html>",
    language: "en",
    template_type: "security",
    tags: ["password", "reset"],
    type: "email",
  },
  {
    id: 5,
    title: "Order Confirmation",
    subject: "Your order has been confirmed",
    content:
      "<html><head><style>body{font-family: Arial, sans-serif; padding: 20px; color: #333;} .container{max-width: 600px; margin: 0 auto;} h1{color: #3498DB;} .button{background-color: #3498DB; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;} @media (max-width: 600px){.container{padding: 15px;}}</style></head><body><div class='container'><h1>Order Confirmation</h1><p>Hi {{user_name}},</p><p>Thank you for your order. Your order #{{order_id}} has been confirmed and is being processed.</p><p>Order Details:</p><p>{{order_details}}</p><a href='{{order_link}}' class='button'>View Order</a><p>Best regards, <br>The {{company_name}} Team</p></div></body></html>",
    language: "en",
    template_type: "transactional",
    tags: ["order", "confirmation", "purchase"],
    type: "email",
  },
  {
    id: 6,
    title: "Order Shipped",
    content:
      "Your order #{{order_id}} has been shipped and will arrive in {{delivery_days}} days. Track: {{tracking_link}}",
    language: "en",
    template_type: "transactional",
    tags: ["order", "shipping", "delivery"],
    type: "sms",
  },
  {
    id: 7,
    title: "Appointment Reminder",
    content:
      "Reminder: Your appointment is scheduled for {{appointment_date}} at {{appointment_time}}. Reply YES to confirm or NO to reschedule.",
    language: "en",
    template_type: "notification",
    tags: ["appointment", "reminder", "schedule"],
    type: "sms",
  },
  {
    id: 8,
    title: "Welcome Email",
    subject: "Welcome to our platform!",
    content:
      "<html><head><style>body{font-family: Arial, sans-serif; padding: 20px; color: #333;} .container{max-width: 600px; margin: 0 auto;} h1{color: #9B59B6;} .button{background-color: #9B59B6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;} @media (max-width: 600px){.container{padding: 15px;}}</style></head><body><div class='container'><h1>Welcome to {{company_name}}!</h1><p>Hi {{user_name}},</p><p>We're excited to have you on board. Here are some resources to help you get started:</p><ul><li><a href='{{getting_started_link}}'>Getting Started Guide</a></li><li><a href='{{faq_link}}'>Frequently Asked Questions</a></li></ul><a href='{{dashboard_link}}' class='button'>Go to Dashboard</a><p>Best regards, <br>The {{company_name}} Team</p></div></body></html>",
    language: "en",
    template_type: "marketing",
    tags: ["welcome", "onboarding"],
    type: "email",
  },
  {
    id: 9,
    title: "Payment Confirmation",
    content: "Payment of {{amount}} received for invoice #{{invoice_id}}. Thank you for your business!",
    language: "en",
    template_type: "transactional",
    tags: ["payment", "invoice", "confirmation"],
    type: "sms",
  },
  {
    id: 10,
    title: "Promotional Offer",
    subject: "Special offer just for you!",
    content:
      "<html><head><style>body{font-family: Arial, sans-serif; padding: 20px; color: #333;} .container{max-width: 600px; margin: 0 auto;} h1{color: #E74C3C;} .button{background-color: #E74C3C; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;} .promo{font-size: 24px; font-weight: bold; color: #E74C3C;} @media (max-width: 600px){.container{padding: 15px;}}</style></head><body><div class='container'><h1>Special Offer!</h1><p>Hi {{user_name}},</p><p>We have a special offer just for you!</p><p class='promo'>{{discount_percentage}}% OFF your next purchase</p><p>Use code <strong>{{promo_code}}</strong> at checkout. Valid until {{expiry_date}}.</p><a href='{{shop_link}}' class='button'>Shop Now</a><p>Best regards, <br>The {{company_name}} Team</p></div></body></html>",
    language: "en",
    template_type: "marketing",
    tags: ["promotion", "discount", "offer"],
    type: "email",
  },
  {
    id: 11,
    title: "Subscription Renewal",
    content:
      "Your {{service_name}} subscription will renew on {{renewal_date}}. Reply STOP to cancel or visit {{account_link}} to manage.",
    language: "en",
    template_type: "notification",
    tags: ["subscription", "renewal", "billing"],
    type: "sms",
  },
  {
    id: 12,
    title: "Newsletter",
    subject: "Your Weekly Newsletter",
    content:
      "<html><head><style>body{font-family: Arial, sans-serif; padding: 20px; color: #333;} .container{max-width: 600px; margin: 0 auto;} h1{color: #2ECC71;} .button{background-color: #2ECC71; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;} @media (max-width: 600px){.container{padding: 15px;}}</style></head><body><div class='container'><h1>Weekly Newsletter</h1><p>Hi {{user_name}},</p><p>Here are this week's top stories:</p><ul>{{newsletter_content}}</ul><a href='{{full_newsletter_link}}' class='button'>Read More</a><p>Best regards, <br>The {{company_name}} Team</p></div></body></html>",
    language: "en",
    template_type: "marketing",
    tags: ["newsletter", "weekly", "updates"],
    type: "email",
  },
]

export function getAllTemplates(): Template[] {
  return templates
}

export function getTemplateById(id: number): Template | undefined {
  return templates.find((template) => template.id === id)
}

export function getUniqueTemplateTypes(): string[] {
  return [...new Set(templates.map((template) => template.template_type))]
}

export function getUniqueLanguages(): string[] {
  return [...new Set(templates.map((template) => template.language))]
}

export function getUniqueTags(): string[] {
  const allTags = templates.flatMap((template) => template.tags)
  return [...new Set(allTags)]
}

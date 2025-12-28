/**
 * Build an email verification template.
 * Returns an object with `subject`, `text` and `html` properties ready for nodemailer.
 *
 * @param {string} username - Recipient name (optional)
 * @param {string} otp - One-time password or verification code
 * @param {object} [options] - Optional values: { appName, supportEmail, expiryMins, frontendUrl }
 */
const VerificationEmail = (
	username,
	otp,
	options = {
		appName: process.env.APP_NAME || "Mega Store",
		supportEmail: process.env.EMAIL || "support@megastore.example",
		expiryMins: 10,
		frontendUrl: process.env.FRONTEND_URL || "",
	}
) => {
	const { appName, supportEmail, expiryMins, frontendUrl } = options;

	const subject = `${appName} — Your verification code`;

	const text = `${username ? `${username},\n\n` : ""}Use the following verification code to complete your action on ${appName}:\n\n${otp}\n\nThis code expires in ${expiryMins} minutes. If you did not request this, please ignore this email or contact ${supportEmail}.`;

	const html = `
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>${appName} Verification</title>
		</head>
		<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin:0; padding:0; background:#f5f7fb;">
			<table role="presentation" width="100%" style="background:#f5f7fb; padding:40px 0;">
				<tr>
					<td align="center">
						<table role="presentation" width="600" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
							<tr>
								<td style="padding:24px; text-align:left; background:linear-gradient(90deg,#0ea5a4,#06b6d4); color:#fff;">
									<h1 style="margin:0; font-size:20px;">${appName}</h1>
								</td>
							</tr>
							<tr>
								<td style="padding:32px; color:#0f172a;">
									<p style="margin:0 0 16px; font-size:16px;">Hello ${username || "there"},</p>
									<p style="margin:0 0 24px; color:#475569;">Use the verification code below to complete your action. This code will expire in <strong>${expiryMins} minutes</strong>.</p>

									<div style="display:flex; align-items:center; justify-content:center; margin:20px 0;">
										<div style="padding:18px 26px; background:#0f172a; color:#fff; font-size:28px; letter-spacing:2px; border-radius:6px; font-weight:700;">
											${otp}
										</div>
									</div>

									${frontendUrl ? `<p style="margin:0 0 24px; color:#475569;">Or <a href="${frontendUrl}" style="color:#0ea5a4;">open ${appName}</a> and enter the code.</p>` : ''}

									<p style="margin:0 0 8px; color:#94a3b8; font-size:13px;">If you did not request this code, you can safely ignore this email. For help, contact <a href="mailto:${supportEmail}" style="color:#0ea5a4;">${supportEmail}</a>.</p>
								</td>
							</tr>
							<tr>
								<td style="padding:16px; text-align:center; font-size:12px; color:#94a3b8; background:#f8fafc;">
									© ${new Date().getFullYear()} ${appName}. All rights reserved.
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</body>
	</html>
	`;

	return { subject, text, html };
};

export default VerificationEmail;
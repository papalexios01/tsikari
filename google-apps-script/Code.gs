/**
 * Archontiko Tsikari – booking form handler (free, runs inside your Gmail account).
 *
 * What it does on every website booking request:
 *   1. Saves the request as a new row in a Google Sheet ("Bookings").
 *   2. Emails the owner (OWNER_EMAIL) with all details – "Reply" goes straight to the guest.
 *   3. Emails the guest an automatic confirmation – "Reply" goes to the owner.
 *
 * SETUP (one time, ~3 minutes):
 *   1. Open https://script.google.com while signed in as the owner Gmail → New project.
 *   2. Paste this whole file into Code.gs and Save.
 *   3. Deploy → New deployment → type "Web app".
 *        Execute as: Me      Who has access: Anyone
 *   4. Approve the permissions (Gmail + Sheets). Copy the Web app URL (ends in /exec).
 *   5. In your hosting (Vercel/Netlify/Cloudflare) set the env variable
 *        VITE_BOOKING_WEBHOOK_URL = <that URL>
 *      and redeploy the site.
 * If you edit this script later: Deploy → Manage deployments → Edit → New version.
 */

const OWNER_EMAIL = 'papalexios001@gmail.com';
const HOTEL_NAME = 'Archontiko Tsikari';
const SHEET_NAME = 'Bookings';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d.website) return json({ ok: true }); // honeypot – bots
    const req = ['full_name', 'email', 'check_in', 'check_out'];
    for (const k of req) if (!d[k]) return json({ ok: false, error: 'Missing ' + k });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return json({ ok: false, error: 'Invalid email' });

    const clean = (v, n) => String(v || '').slice(0, n).trim();
    const b = {
      name: clean(d.full_name, 120), email: clean(d.email, 200), phone: clean(d.phone, 40),
      room: clean(d.room, 80) || 'No preference', checkIn: clean(d.check_in, 10), checkOut: clean(d.check_out, 10),
      guests: clean(d.guests, 3), nights: clean(d.nights, 4), message: clean(d.message, 2000),
    };

    saveRow(b);

    const rows = [
      ['Name', b.name], ['Email', b.email], ['Phone', b.phone || '—'], ['Studio', b.room],
      ['Check-in', b.checkIn], ['Check-out', b.checkOut], ['Nights', b.nights], ['Guests', b.guests],
      ['Message', b.message || '—'],
    ];
    const table = rows.map(([k, v]) =>
      '<tr><td style="padding:6px 16px 6px 0;color:#8a7560">' + k + '</td><td style="padding:6px 0">' + esc(v) + '</td></tr>').join('');

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      replyTo: b.email,
      name: HOTEL_NAME + ' Website',
      subject: 'New booking request – ' + b.name + ' (' + b.checkIn + ' → ' + b.checkOut + ')',
      htmlBody: wrap('New booking request', '<table style="font-size:15px">' + table + '</table><p style="margin-top:24px;color:#8a7560">Press Reply to answer the guest directly.</p>'),
    });

    MailApp.sendEmail({
      to: b.email,
      replyTo: OWNER_EMAIL,
      name: HOTEL_NAME,
      subject: 'We received your request – ' + HOTEL_NAME,
      htmlBody: wrap('Thank you, ' + esc(b.name.split(' ')[0]),
        '<p>We have received your booking request and will reply shortly with availability and rates.</p>' +
        '<table style="font-size:15px">' + table + '</table>' +
        '<p style="margin-top:24px">This is not yet a confirmed reservation. You can reply to this email with any question.</p>' +
        '<p>Warm regards,<br>' + HOTEL_NAME + ', Lemnos</p>'),
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() { return json({ ok: true, service: HOTEL_NAME + ' booking handler' }); }

function saveRow(b) {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID'), ss;
  try { ss = id && SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  if (!ss) {
    ss = SpreadsheetApp.create(HOTEL_NAME + ' – Booking requests');
    props.setProperty('SHEET_ID', ss.getId());
    ss.getSheets()[0].setName(SHEET_NAME)
      .appendRow(['Received', 'Name', 'Email', 'Phone', 'Studio', 'Check-in', 'Check-out', 'Nights', 'Guests', 'Message']);
  }
  ss.getSheetByName(SHEET_NAME).appendRow([new Date(), b.name, b.email, b.phone, b.room, b.checkIn, b.checkOut, b.nights, b.guests, b.message]);
}

function wrap(title, body) {
  return '<div style="font-family:Georgia,serif;background:#f6efe6;padding:32px"><div style="max-width:560px;margin:auto;background:#fffaf4;padding:32px;border-top:3px solid #b5603c">' +
    '<p style="letter-spacing:3px;font-size:11px;color:#b5603c;margin:0">' + HOTEL_NAME.toUpperCase() + '</p>' +
    '<h1 style="font-weight:normal;color:#3b2a1e">' + title + '</h1><div style="color:#3b2a1e;line-height:1.6">' + body + '</div></div></div>';
}
function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

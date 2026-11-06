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

    const nightsTxt = b.nights ? b.nights + (b.nights === '1' ? ' night' : ' nights') : '';
    const guestsTxt = b.guests ? b.guests + (b.guests === '1' ? ' guest' : ' guests') : '';
    const stay = staySummary(b, nightsTxt, guestsTxt);
    const details = detailRows([
      ['Guest', b.name], ['Email', '<a href="mailto:' + esc(b.email) + '" style="color:#b5603c;text-decoration:none">' + esc(b.email) + '</a>', true],
      ['Phone', b.phone ? '<a href="tel:' + esc(b.phone.replace(/\s/g, '')) + '" style="color:#b5603c;text-decoration:none">' + esc(b.phone) + '</a>' : '—', true],
      ['Studio', b.room],
    ]);
    const msg = b.message ? '<div style="margin:28px 0 0;padding:20px 22px;background:#f6efe6;border-left:2px solid #b5603c;font-style:italic;color:#4a3a2e;font-size:16px;line-height:1.65">“' + esc(b.message).replace(/\n/g, '<br>') + '”</div>' : '';

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      replyTo: b.email,
      name: HOTEL_NAME + ' Website',
      subject: 'New request · ' + b.name + ' · ' + fmtShort(b.checkIn) + ' – ' + fmtShort(b.checkOut),
      htmlBody: wrap('New booking request', 'Received ' + Utilities.formatDate(new Date(), 'Europe/Athens', "d MMMM yyyy 'at' HH:mm"),
        stay + '<h2 style="' + H2 + '">Guest details</h2>' + details + msg +
        button('Reply to ' + esc(b.name.split(' ')[0]), 'mailto:' + esc(b.email) + '?subject=' + encodeURIComponent('Your stay at ' + HOTEL_NAME)),
        'Press Reply to answer the guest directly. Saved to your “Booking requests” sheet.'),
    });

    MailApp.sendEmail({
      to: b.email,
      replyTo: OWNER_EMAIL,
      name: HOTEL_NAME,
      subject: 'Your request is received · ' + HOTEL_NAME + ', Lemnos',
      htmlBody: wrap('Thank you, ' + esc(b.name.split(' ')[0]), 'We have received your request',
        '<p style="margin:0 0 24px;font-size:17px;line-height:1.7;color:#4a3a2e">Thank you for choosing our 1901 mansion in Varos. We will personally reply within 24 hours with availability and rates for your dates.</p>' +
        stay + '<h2 style="' + H2 + '">Your details</h2>' + details + msg +
        '<p style="margin:28px 0 0;padding:16px 20px;background:#f6efe6;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#6b5848">Please note: this is a request, not yet a confirmed reservation. Simply reply to this email with any question.</p>' +
        button('Reply to us', 'mailto:' + OWNER_EMAIL) +
        '<p style="margin:32px 0 0;font-size:17px;line-height:1.6;color:#3b2a1e">Warm regards,<br><em>The ' + HOTEL_NAME + ' family</em></p>',
        'Varos, Lemnos, Greece'),
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

const H2 = 'margin:36px 0 12px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:#b5603c';

function fmtLong(iso) {
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? esc(iso) : Utilities.formatDate(d, 'Europe/Athens', 'EEE, d MMM yyyy');
}
function fmtShort(iso) {
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? iso : Utilities.formatDate(d, 'Europe/Athens', 'd MMM');
}

function staySummary(b, nightsTxt, guestsTxt) {
  const cell = (label, value) => '<td class="stk" width="50%" valign="top" style="padding:20px 22px">' +
    '<div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#9a8470">' + label + '</div>' +
    '<div style="margin-top:6px;font-size:21px;color:#2a1d14">' + value + '</div></td>';
  const meta = [nightsTxt, guestsTxt, esc(b.room)].filter(Boolean).join(' &nbsp;·&nbsp; ');
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8dccb;background:#fbf6ef">' +
    '<tr>' + cell('Check-in', fmtLong(b.checkIn)) + cell('Check-out', fmtLong(b.checkOut)) + '</tr>' +
    '<tr><td colspan="2" style="padding:14px 22px;border-top:1px solid #e8dccb;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b5848">' + meta + '</td></tr></table>';
}

function detailRows(rows) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' + rows.map(([k, v, raw]) =>
    '<tr><td style="padding:12px 0;border-bottom:1px solid #eee3d4;font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#9a8470;width:34%" valign="top">' + k +
    '</td><td style="padding:12px 0;border-bottom:1px solid #eee3d4;font-size:16px;color:#2a1d14;word-break:break-word" valign="top">' + (raw ? v : esc(v)) + '</td></tr>').join('') + '</table>';
}

function button(label, href) {
  return '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0 0"><tr><td style="background:#2a1d14">' +
    '<a href="' + href + '" style="display:inline-block;padding:15px 30px;font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#f6efe6;text-decoration:none">' + label + '</a></td></tr></table>';
}

function wrap(title, kicker, body, footnote) {
  return '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light">' +
    '<style>@media (max-width:600px){.pad{padding:28px 22px!important}.stk{display:block!important;width:100%!important;box-sizing:border-box}.h1{font-size:30px!important}}</style></head>' +
    '<body style="margin:0;padding:0;background:#efe6d9">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efe6d9"><tr><td align="center" style="padding:32px 12px">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;font-family:Georgia,\'Times New Roman\',serif">' +
    '<tr><td align="center" style="padding:8px 0 24px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:5px;color:#8a6a4f">ARCHONTIKO&nbsp;TSIKARI</td></tr>' +
    '<tr><td style="background:#2a1d14;padding:44px 40px 40px" class="pad" align="center">' +
    '<div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#d9a77f">' + kicker + '</div>' +
    '<div style="width:40px;height:1px;background:#b5603c;margin:18px auto"></div>' +
    '<h1 class="h1" style="margin:0;font-weight:normal;font-size:38px;line-height:1.15;color:#f6efe6">' + title + '</h1></td></tr>' +
    '<tr><td class="pad" style="background:#fffaf4;padding:44px 40px">' + body + '</td></tr>' +
    '<tr><td align="center" style="padding:28px 20px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.7;color:#8a7560">' +
    (footnote ? footnote + '<br>' : '') + 'Archontiko Tsikari · Boutique studios in a 1901 mansion · Varos, Lemnos</td></tr>' +
    '</table></td></tr></table></body></html>';
}
function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

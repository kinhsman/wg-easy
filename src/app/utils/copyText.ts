/**
 * Copies text to the clipboard, also on plain-http pages (wg-easy is often
 * opened as http://host:51821), where browsers hide navigator.clipboard.
 * Call it from a click handler. Returns whether it worked.
 */
export async function copyText(text: string): Promise<boolean> {
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to the older way
    }
  }
  // Older way: select a hidden textarea and copy. Put it inside an open
  // dialog if there is one, because dialogs keep focus to themselves.
  const host = document.querySelector('[role="dialog"]') ?? document.body;
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.top = '0';
  area.style.left = '-9999px';
  area.style.opacity = '0';
  host.appendChild(area);
  area.focus();
  area.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}

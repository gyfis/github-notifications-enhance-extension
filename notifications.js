document.getElementsByClassName('notification-indicator')[0].prepend('Notifications');
document.getElementsByClassName('notification-indicator')[0].className += " text-bold px-2 HeaderNavlink"

let unreadBadge = document.getElementsByClassName('mail-status unread')[0];
if (!!unreadBadge) {
  unreadBadge.style.left = '100px';
  unreadBadge.style.top = '-4px';
}

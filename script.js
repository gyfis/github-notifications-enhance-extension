// #########################################
// ## Automatically click on "Select all" ##
// #########################################

let checkAll = document.getElementsByClassName('js-notifications-mark-all-prompt')[0];
checkAll.click();


// #############################################################
// ## Pull "mark all read" and "mark all unread" from submenu ##
// #############################################################

function findAndMoveDropdownAction(action) {
  let actionsHolder = document.getElementsByClassName('js-notifications-mark-selected-actions')[0];

  let markAllReadForm = document.querySelector('form[action="' + action + '"]');
  let markAllReadButton = markAllReadForm.querySelector('button');

  markAllReadButton.classList = ''
  markAllReadButton.classList.add('d-flex', 'btn', 'btn-sm');

  let markAllReadHolder = document.createElement('div');
  markAllReadHolder.classList.add('js-notification-action', 'js-notification-bulk-action', 'mr-2');

  markAllReadHolder.prepend(markAllReadForm);
  actionsHolder.prepend(markAllReadHolder);
}

findAndMoveDropdownAction('/notifications/beta/unmark');
findAndMoveDropdownAction('/notifications/beta/mark');


// ########################################
// ## Remove unnecessary dropdown button ##
// ########################################

let actionsHolder = document.getElementsByClassName('js-notifications-mark-selected-actions')[0];
actionsHolder.querySelector('.dropdown.details-overlay').remove();

// #################################
// ## Append pull requests panels ##
// #################################

let mainContent = document.getElementsByClassName('js-check-all-container')[0].parentNode;

function createHeader(headerTitle) {
  let header = document.createElement('H3');
  header.appendChild(document.createTextNode(headerTitle));
  return header;
}

function filterContent(content) {
  if (content.getElementsByClassName('js-issue-row').length > 0) return;

  let blankslate = content.getElementsByClassName('blankslate')[0];
  if (!blankslate) return;

  let margin = document.createElement('div');
  margin.classList.add('paginate-container');
  blankslate.parentNode.replaceChild(margin, blankslate);
}

function downloadData(container, url, headerTitle) {
  let content = document.createElement('div');

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;

    content.innerHTML = xhr.response;
    filterContent(content);

    container.innerHTML = content.querySelector("#js-issues-toolbar").outerHTML;
    container.prepend(createHeader(headerTitle));
    container.classList = 'pl-md-3 py-md-3';
  }

  xhr.send();
}

let createdContainer = document.createElement('div');
let reviewRequestsContainer = document.createElement('div');
let assignedContainer = document.createElement('div');
let mentionedContainer = document.createElement('div');

const modifiedPages = [{
  container: createdContainer,
  url: '/pulls',
  headerTitle: 'Created PRs'
}, {
  container: reviewRequestsContainer,
  url: '/pulls/review-requested',
  headerTitle: 'Review requests'
}, {
  container: assignedContainer,
  url: '/pulls/assigned',
  headerTitle: 'Assigned PRs'
}, {
  container: mentionedContainer,
  url: '/pulls/mentioned',
  headerTitle: 'Mentioned PRs'
}];

for (let page of modifiedPages) {
  mainContent.appendChild(page.container);
  downloadData(page.container, page.url, page.headerTitle);
}
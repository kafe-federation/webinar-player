let picker = document.getElementById('picker')

let DecompressZip = require('decompress-zip');
let shell = require('electron').shell;
let app = require('electron').remote;
let win = require('electron').remote.getCurrentWindow()
let dialog = app.dialog;

let maximized = false;

var ipcRenderer = require('electron').ipcRenderer;

let home = ipcRenderer.sendSync('synchronous-message', '')
const BASEPATH = home

function uncompress(ZIP_FILE_PATH, DESTINATION_PATH) {
    if ( ZIP_FILE_PATH.split(".")[ZIP_FILE_PATH.split(".").length - 1] !== "kwr" ) {
      alert("please open only *.kwr file");
      return;
    }

    let unzipper = new DecompressZip(ZIP_FILE_PATH);
    unzipper.on('error', function (err) {});
    unzipper.on('extract', function (log) {
      run_player(DESTINATION_PATH + "/" + log[0].folder);
    });
    unzipper.on('progress', function (fileIndex, fileCount) {});
    unzipper.extract({ path: DESTINATION_PATH });
}

function run_player(folder) {
  $('#main').css('display', 'none');
  $('#player').css('display', 'block');
  $('#iframe').attr('src', "playback.html?path=" + encodeURIComponent(folder));
}

function change_event(event) {
  event.preventDefault();
  let files = event.target.files;
  uncompress(files[0].path, BASEPATH);
}

el = document;
css_target = document.getElementById('picker-main-container');

el.addEventListener('drop', function (event) {
  $(css_target).css('background', 'transparent');
  uncompress(event.dataTransfer.files[0].path, BASEPATH);
  event.preventDefault();
});

el.addEventListener('dragover', function() {
  $(css_target).css('background', '#d4edda');
})

el.addEventListener('dragleave', function() {
  $(css_target).css('background', 'transparent');
})

$('#picker-btn').click(function() { $("#picker").click(); });

$('#maximize-btn').click(function() {
  if ( ! maximized ) {
    win.maximize();
    maximized = true;
  } else {
    win.unmaximize()
    maximized = false;
  }
});

$('#close-btn').click(function() {
  win.close();
});

$(document).on('click', 'a[href^="http"]', function(event) {
   event.preventDefault();
   shell.openExternal(this.href);
});

$(document).on('click', 'a[href^="http"]', function(event) {
  event.preventDefault();
  shell.openExternal(this.href);
});


if (location.href.split("?path=")[1]) {
  url = decodeURIComponent(location.href.split("?path=")[1]);
  $('#iframe').attr('src', "playback.html?path=" + url);
}

document.getElementById('picker').addEventListener('change', change_event)

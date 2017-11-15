$(loaded);

function loaded() {
  show_tasks();  // taskを描画
  $("button").click(function() {
    save_task();
  });

  // checkboxにcheckが入っていたらtaskを削除する
  $("input[name='remove']").click(function() {
    for (var i = 0; i < localStorage.length; ++i) {
      var key = localStorage.key(i);
      if ($(`[name="${key}"]`).prop("checked")) {
        console.log(key);
        localStorage.removeItem(`${key}`);
      }
    };
  });
}

function escape_html(string) {
  return string.replace(/[&'`"<>]/g, function(match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}

function check_text(text) {
  if (text.length !== 0 && 20 >= text.length) {
    return true;
  } else {
    alert("文字数は1〜20文字にしてください");
    return false;
  }
}

function save_task() {
  var task = document.getElementById("todo").value;  
  var date = new Date();

  if (check_text(task)) {
    localStorage.setItem(date, task);  // localstorageに追加
  }
};

// taskを表示させる
function show_tasks() {
  for (var i = 0; i < localStorage.length; ++i) {
    var key = localStorage.key(i);
    var task = escape_html(localStorage.getItem(key))  /// htmlタグがあったらescapeさせる

    $("#tasks").append(function() {
      return `<input type="checkbox" name="${key}"> ` + key + "  " + task + "</br>"
    });
  };
};
// ページが更新されたら全キーを取得して表示
// todoが追加されたら localstrage にadd してjqで表示させる

function show() {  //debug
  alert("hoge");
};

$(loaded);

function loaded() {
  show_tasks();  // taskを描画
  $("button").click(function() {
    save_task();
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
    alert("文字数は1~20文字にしてください");
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

function show_tasks() {
  var keys = [];
  for (var i = 0; i < localStorage.length; ++i) {
    keys.push(localStorage.key(i));  // 登録されているキーをすべて取得
  }
//<input type="checkbox" name="q1" value="その1">
  keys.forEach(function(key) {
    var task = escape_html(localStorage.getItem(key))  /// htmlタグがあったらescapeさせる
//    $("#todo_list").append(`<input type="checkbox" name="trigger" value="${key}">` + key + "  " + task + "</br>"); // 要素の追加
      $("#todo_list").append(function() {
        return `<input type="checkbox" name="trigger" value="${key}">` + key + "  " + task + "</br>"
      });
  });
};
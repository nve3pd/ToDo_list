// ページが更新されたら全キーを取得して表示
// todoが追加されたら localstrage にadd してjqで表示させる

function show() {  //debug
  alert("hoge");
};

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

function add_localstrage() {
  var task = document.getElementById("todo").value;  
  var date = new Date();

  if (task.length != 0 && 20 >= task.length) {
    localStorage.setItem(date, task);  // localstorageに追加
  } else {
    alert("文字数は1~20文字にしてください");
  }
};

function show_tasks() {
  var keys = [];
  for (var i = 0; i < localStorage.length; ++i) {
    keys.push(localStorage.key(i));  // 登録されているキーをすべて取得
  }

  keys.forEach(function(key) {
    var task = escape_html(localStorage.getItem(key))  /// htmlタグがあったらescapeさせる
    $("#todo_list").append(key + "  " + task + " <br>"); // 要素の追加
  });
};

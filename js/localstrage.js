// ページが更新されたら全キーを取得して表示
// todoが追加されたら localstrage にadd してjqで表示させる

function show() {
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
  var task = escape_html(document.getElementById("todo").value);  // htmlタグが入力されたらescapeさせる
  var date = new Date();

  localStorage.setItem(date, task);  // localstorageに追加
};

function show_tasks() {
  var keys = [];
  for (var i = 0; i < localStorage.length; ++i) {
    keys.push(localStorage.key(i));  // 登録されているキーをすべて取得
  }

  keys.forEach(function(key) {
    var task = localStorage.getItem(key)  // キーからvalueを取得
    $("#todo_list").append(key + "  " + task + " <br>"); // 要素の追加
  });
};

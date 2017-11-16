$(loaded);

function loaded() {
  show_tasks();  // taskを描画
  $("button").click(function() {
    save_task();
  });

  // checkboxにcheckが入っていたらtaskを削除する
  $("input[name='remove']").click(function() {
    var remove_tasks = $('input[name="task"]:checked').map(function(){
      return $(this).val();
    }).get();

    remove_tasks.forEach(function(key){
      localStorage.removeItem(`${key}`);
    });
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
  if (text.length === 0 || 20 < text.length) {
    alert("文字列は0〜20文字以内にしてください");
    return false;
  }

  // すでに同じtaskが登録されていないかをcheck
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var task = localStorage.getItem(key);
    // すでにあった場合はfalse
    if (text === task) {
      alert("同じ内容は避けてください");
      return false;
    }
  }
    return true;
}

// 日付情報をいい感じにformatして返す
function date_format() {
  var res = "";
  var date = new Date();

  res += date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + "_" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return res;
}

// taskを保存する
function save_task() {
  var task = document.getElementById("todo").value.trim();  // trimで左右の空白をなくす
  var date = date_format();

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
      var res = "";
      res += `<input type="checkbox" name="task" value="${key}"> ` + task;  // タスクの書き込み
      res += "    <font color='#8b8c8e'>" + key + "に登録されました.</font><br>";  // 時間の書き込み
      return res;
    });
  };
};
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
  alert(text.length);
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

// taskを保存する
function save_task() {
  var task = document.getElementById("todo").value.trim();  // trimで左右の空白をなくす
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
      return `<input type="checkbox" name="task" value="${key}"> ` + key + "  " + task + "</br>";
    });
  };
};
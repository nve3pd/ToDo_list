// ページが更新されたら全キーを取得して表示
// todoが追加されたら localstrage にadd してjqで表示させる

function show() {
  alert("hoge");
};

function add_localstrage() {
  var task = document.getElementById("todo").value;
  var date = new Date();

  localStorage.setItem(date, task);  // add localstorage
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

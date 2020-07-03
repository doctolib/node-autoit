var au = require('./index');

au.Init();
au.Run("notepad.exe");
au.WinWait("[Class:Notepad2]");
au.Send("Hello, autoit & nodejs!");

var isVisible = au.ControlCommand("[Class:Notepad2]", "", "[CLASS:Edit]", "IsVisible");
console.log(isVisible); 

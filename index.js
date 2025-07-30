'use strict';

var koffi = require('koffi');
var path = require('path');
var os = require('os');
var wchar_t = require(path.join(__dirname, 'wchar.js'));

function get_dll(){
    switch(os.arch()){
    case 'ia32': return 'AutoItX3.dll';
    case 'x64': return 'AutoItX3_x64.dll';
    }
    return null;
}

// Types
var LONG = 'int32';  // Windows LONG is 32-bit signed integer (used in structs)

var RECT = koffi.struct('RECT', {
    'left': LONG,
    'top': LONG,
    'right': LONG,
    'bottom': LONG,
});

var POINT = koffi.struct('POINT', {
    'x': LONG,
    'y': LONG,
});

// Struct pointer types are now handled directly as 'void*' in function signatures

var $ = {};

// Constants
var SW_SHOWNORMAL = 1;

// Window Classes
$.WC_ANIMATE = 'SysAnimate32'
$.WC_BUTTON = 'Button'
$.WC_COMBOBOX = 'ComboBox'
$.WC_COMBOBOXEX = 'ComboBoxEx32'
$.WC_DATETIMEPICK = 'SysDateTimePick32'
$.WC_EDIT = 'Edit'
$.WC_HEADER = 'SysHeader32'
$.WC_HOTKEY = 'msctls_hotkey32'
$.WC_IPADDRESS = 'SysIPAddress32'
$.WC_LINK = 'SysLink'
$.WC_LISTBOX = 'ListBox'
$.WC_LISTVIEW = 'SysListView32'
$.WC_MONTHCAL = 'SysMonthCal32'
$.WC_NATIVEFONTCTL = 'NativeFontCtl'
$.WC_PAGESCROLLER = 'SysPager'
$.WC_PROGRESS = 'msctls_progress32'
$.WC_REBAR = 'ReBarWindow32'
$.WC_SCROLLBAR = 'ScrollBar'
$.WC_STATIC = 'Static'
$.WC_STATUSBAR = 'msctls_statusbar32'
$.WC_TABCONTROL = 'SysTabControl32'
$.WC_TOOLBAR = 'ToolbarWindow32'
$.WC_TOOLTIPS = 'tooltips_class32'
$.WC_TRACKBAR = 'msctls_trackbar32'
$.WC_TREEVIEW = 'SysTreeView32'
$.WC_UPDOWN = 'msctls_updown32'

// Window Styles
$.WS_OVERLAPPED = 0
$.WS_TILED = $.WS_OVERLAPPED
$.WS_MAXIMIZEBOX = 0x00010000
$.WS_MINIMIZEBOX = 0x00020000
$.WS_TABSTOP = 0x00010000
$.WS_GROUP = 0x00020000
$.WS_SIZEBOX = 0x00040000
$.WS_THICKFRAME = $.WS_SIZEBOX
$.WS_SYSMENU = 0x00080000
$.WS_HSCROLL = 0x00100000
$.WS_VSCROLL = 0x00200000
$.WS_DLGFRAME = 0x00400000
$.WS_BORDER = 0x00800000
$.WS_CAPTION = 0x00C00000
$.WS_OVERLAPPEDWINDOW = ($.WS_CAPTION | $.WS_MAXIMIZEBOX | $.WS_MINIMIZEBOX | $.WS_OVERLAPPED | $.WS_SYSMENU | $.WS_THICKFRAME)
$.WS_TILEDWINDOW = $.WS_OVERLAPPEDWINDOW
$.WS_MAXIMIZE = 0x01000000
$.WS_CLIPCHILDREN = 0x02000000
$.WS_CLIPSIBLINGS = 0x04000000
$.WS_DISABLED = 0x08000000
$.WS_VISIBLE = 0x10000000
$.WS_MINIMIZE = 0x20000000
$.WS_ICONIC = $.WS_MINIMIZE
$.WS_CHILD = 0x40000000
$.WS_CHILDWINDOW = $.WS_CHILD
$.WS_POPUP = 0x80000000
$.WS_POPUPWINDOW = 0x80880000

// Dialog Styles
$.DS_3DLOOK = 0x0004
$.DS_ABSALIGN = 0x0001
$.DS_CENTER = 0x0800
$.DS_CENTERMOUSE = 0x1000
$.DS_CONTEXTHELP = 0x2000
$.DS_CONTROL = 0x0400
$.DS_FIXEDSYS = 0x0008
$.DS_LOCALEDIT = 0x0020
$.DS_MODALFRAME = 0x0080
$.DS_NOFAILCREATE = 0x0010
$.DS_NOIDLEMSG = 0x0100
$.DS_SETFONT = 0x0040
$.DS_SETFOREGROUND = 0x0200
$.DS_SHELLFONT = ($.DS_FIXEDSYS | $.DS_SETFONT)
$.DS_SYSMODAL = 0x0002

// Window Extended Styles
$.WS_EX_ACCEPTFILES = 0x00000010
$.WS_EX_APPWINDOW = 0x00040000
$.WS_EX_COMPOSITED = 0x02000000
$.WS_EX_CONTROLPARENT = 0x10000
$.WS_EX_CLIENTEDGE = 0x00000200
$.WS_EX_CONTEXTHELP = 0x00000400
$.WS_EX_DLGMODALFRAME = 0x00000001
$.WS_EX_LAYERED = 0x00080000
$.WS_EX_LAYOUTRTL = 0x400000
$.WS_EX_LEFT = 0x00000000
$.WS_EX_LEFTSCROLLBAR = 0x00004000
$.WS_EX_LTRREADING = 0x00000000
$.WS_EX_MDICHILD = 0x00000040
$.WS_EX_NOACTIVATE = 0x08000000
$.WS_EX_NOINHERITLAYOUT = 0x00100000
$.WS_EX_NOPARENTNOTIFY = 0x00000004
$.WS_EX_RIGHT = 0x00001000
$.WS_EX_RIGHTSCROLLBAR = 0x00000000
$.WS_EX_RTLREADING = 0x2000
$.WS_EX_STATICEDGE = 0x00020000
$.WS_EX_TOOLWINDOW = 0x00000080
$.WS_EX_TOPMOST = 0x00000008
$.WS_EX_TRANSPARENT = 0x00000020
$.WS_EX_WINDOWEDGE = 0x00000100

$.WS_EX_OVERLAPPEDWINDOW = ($.WS_EX_CLIENTEDGE | $.WS_EX_WINDOWEDGE)
$.WS_EX_PALETTEWINDOW = ($.WS_EX_TOOLWINDOW | $.WS_EX_TOPMOST | $.WS_EX_WINDOWEDGE)

// Messages
$.WM_NULL = 0x0000
$.WM_CREATE = 0x0001
$.WM_DESTROY = 0x0002
$.WM_MOVE = 0x0003
$.WM_SIZEWAIT = 0x0004
$.WM_SIZE = 0x0005
$.WM_ACTIVATE = 0x0006
$.WM_SETFOCUS = 0x0007
$.WM_KILLFOCUS = 0x0008
$.WM_SETVISIBLE = 0x0009
$.WM_ENABLE = 0x000A
$.WM_SETREDRAW = 0x000B
$.WM_SETTEXT = 0x000C
$.WM_GETTEXT = 0x000D
$.WM_GETTEXTLENGTH = 0x000E
$.WM_PAINT = 0x000F
$.WM_CLOSE = 0x0010
$.WM_QUERYENDSESSION = 0x0011
$.WM_QUIT = 0x0012
$.WM_ERASEBKGND = 0x0014
$.WM_QUERYOPEN = 0x0013
$.WM_SYSCOLORCHANGE = 0x0015
$.WM_ENDSESSION = 0x0016
$.WM_SYSTEMERROR = 0x0017
$.WM_SHOWWINDOW = 0x0018
$.WM_CTLCOLOR = 0x0019
$.WM_SETTINGCHANGE = 0x001A
$.WM_WININICHANGE = 0x001A
$.WM_DEVMODECHANGE = 0x001B
$.WM_ACTIVATEAPP = 0x001C
$.WM_FONTCHANGE = 0x001D
$.WM_TIMECHANGE = 0x001E
$.WM_CANCELMODE = 0x001F
$.WM_SETCURSOR = 0x0020
$.WM_MOUSEACTIVATE = 0x0021
$.WM_CHILDACTIVATE = 0x0022
$.WM_QUEUESYNC = 0x0023
$.WM_GETMINMAXINFO = 0x0024
$.WM_LOGOFF = 0x0025
$.WM_PAINTICON = 0x0026
$.WM_ICONERASEBKGND = 0x0027
$.WM_NEXTDLGCTL = 0x0028
$.WM_ALTTABACTIVE = 0x0029
$.WM_SPOOLERSTATUS = 0x002A
$.WM_DRAWITEM = 0x002B
$.WM_MEASUREITEM = 0x002C
$.WM_DELETEITEM = 0x002D
$.WM_VKEYTOITEM = 0x002E
$.WM_CHARTOITEM = 0x002F
$.WM_SETFONT = 0x0030
$.WM_GETFONT = 0x0031
$.WM_SETHOTKEY = 0x0032
$.WM_GETHOTKEY = 0x0033
$.WM_FILESYSCHANGE = 0x0034
$.WM_ISACTIVEICON = 0x0035
$.WM_QUERYPARKICON = 0x0036
$.WM_QUERYDRAGICON = 0x0037
$.WM_WINHELP = 0x0038
$.WM_COMPAREITEM = 0x0039
$.WM_FULLSCREEN = 0x003A
$.WM_CLIENTSHUTDOWN = 0x003B
$.WM_DDEMLEVENT = 0x003C
$.WM_GETOBJECT = 0x003D
$.WM_CALCSCROLL = 0x003F
$.WM_TESTING = 0x0040
$.WM_COMPACTING = 0x0041
$.WM_OTHERWINDOWCREATED = 0x0042
$.WM_OTHERWINDOWDESTROYED = 0x0043
$.WM_COMMNOTIFY = 0x0044
$.WM_MEDIASTATUSCHANGE = 0x0045
$.WM_WINDOWPOSCHANGING = 0x0046
$.WM_WINDOWPOSCHANGED = 0x0047
$.WM_POWER = 0x0048
$.WM_COPYGLOBALDATA = 0x0049
$.WM_COPYDATA = 0x004A
$.WM_CANCELJOURNAL = 0x004B
$.WM_LOGONNOTIFY = 0x004C
$.WM_KEYF1 = 0x004D
$.WM_NOTIFY = 0x004E
$.WM_ACCESS_WINDOW = 0x004F
$.WM_INPUTLANGCHANGEREQUEST = 0x0050
$.WM_INPUTLANGCHANGE = 0x0051
$.WM_TCARD = 0x0052
$.WM_HELP = 0x0053
$.WM_USERCHANGED = 0x0054
$.WM_NOTIFYFORMAT = 0x0055

$.WM_QM_ACTIVATE = 0x0060
$.WM_HOOK_DO_CALLBACK = 0x0061
$.WM_SYSCOPYDATA = 0x0062

$.WM_FINALDESTROY = 0x0070
$.WM_MEASUREITEM_CLIENTDATA = 0x0071

$.WM_CONTEXTMENU = 0x007B
$.WM_STYLECHANGING = 0x007C
$.WM_STYLECHANGED = 0x007D
$.WM_DISPLAYCHANGE = 0x007E
$.WM_GETICON = 0x007F
$.WM_SETICON = 0x0080
$.WM_NCCREATE = 0x0081
$.WM_NCDESTROY = 0x0082
$.WM_NCCALCSIZE = 0x0083
$.WM_NCHITTEST = 0x0084
$.WM_NCPAINT = 0x0085
$.WM_NCACTIVATE = 0x0086
$.WM_GETDLGCODE = 0x0087
$.WM_SYNCPAINT = 0x0088
$.WM_SYNCTASK = 0x0089
$.WM_KLUDGEMINRECT = 0x008B
$.WM_LPKDRAWSWITCHWND = 0x008C
$.WM_UAHDESTROYWINDOW = 0x0090
$.WM_UAHDRAWMENU = 0x0091
$.WM_UAHDRAWMENUITEM = 0x0092
$.WM_UAHINITMENU = 0x0093
$.WM_UAHMEASUREMENUITEM = 0x0094
$.WM_UAHNCPAINTMENUPOPUP = 0x0095

$.WM_NCMOUSEMOVE = 0x00A0
$.WM_NCLBUTTONDOWN = 0x00A1
$.WM_NCLBUTTONUP = 0x00A2
$.WM_NCLBUTTONDBLCLK = 0x00A3
$.WM_NCRBUTTONDOWN = 0x00A4
$.WM_NCRBUTTONUP = 0x00A5
$.WM_NCRBUTTONDBLCLK = 0x00A6
$.WM_NCMBUTTONDOWN = 0x00A7
$.WM_NCMBUTTONUP = 0x00A8
$.WM_NCMBUTTONDBLCLK = 0x00A9
$.WM_NCXBUTTONDOWN = 0x00AB
$.WM_NCXBUTTONUP = 0x00AC
$.WM_NCXBUTTONDBLCLK = 0x00AD
$.WM_NCUAHDRAWCAPTION = 0x00AE
$.WM_NCUAHDRAWFRAME = 0x00AF
$.WM_INPUT_DEVICE_CHANGE = 0x00FE
$.WM_INPUT = 0x00FF

$.WM_KEYDOWN = 0x0100
$.WM_KEYFIRST = 0x0100
$.WM_KEYUP = 0x0101
$.WM_CHAR = 0x0102
$.WM_DEADCHAR = 0x0103
$.WM_SYSKEYDOWN = 0x0104
$.WM_SYSKEYUP = 0x0105
$.WM_SYSCHAR = 0x0106
$.WM_SYSDEADCHAR = 0x0107
$.WM_YOMICHAR = 0x0108
$.WM_KEYLAST = 0x0109
$.WM_UNICHAR = 0x0109
$.WM_CONVERTREQUEST = 0x010A
$.WM_CONVERTRESULT = 0x010B
$.WM_IM_INFO = 0x010C
$.WM_IME_STARTCOMPOSITION = 0x010D
$.WM_IME_ENDCOMPOSITION = 0x010E
$.WM_IME_COMPOSITION = 0x010F
$.WM_IME_KEYLAST = 0x010F
$.WM_INITDIALOG = 0x0110
$.WM_COMMAND = 0x0111
$.WM_SYSCOMMAND = 0x0112
$.WM_TIMER = 0x0113
$.WM_HSCROLL = 0x0114
$.WM_VSCROLL = 0x0115
$.WM_INITMENU = 0x0116
$.WM_INITMENUPOPUP = 0x0117
$.WM_SYSTIMER = 0x0118
$.WM_GESTURE = 0x0119
$.WM_GESTURENOTIFY = 0x011A
$.WM_GESTUREINPUT = 0x011B
$.WM_GESTURENOTIFIED = 0x011C
$.WM_MENUSELECT = 0x011F
$.WM_MENUCHAR = 0x0120
$.WM_ENTERIDLE = 0x0121
$.WM_MENURBUTTONUP = 0x0122
$.WM_MENUDRAG = 0x0123
$.WM_MENUGETOBJECT = 0x0124
$.WM_UNINITMENUPOPUP = 0x0125
$.WM_MENUCOMMAND = 0x0126
$.WM_CHANGEUISTATE = 0x0127
$.WM_UPDATEUISTATE = 0x0128
$.WM_QUERYUISTATE = 0x0129
$.WM_LBTRACKPOINT = 0x0131
$.WM_CTLCOLORMSGBOX = 0x0132
$.WM_CTLCOLOREDIT = 0x0133
$.WM_CTLCOLORLISTBOX = 0x0134
$.WM_CTLCOLORBTN = 0x0135
$.WM_CTLCOLORDLG = 0x0136
$.WM_CTLCOLORSCROLLBAR = 0x0137
$.WM_CTLCOLORSTATIC = 0x0138

$.MN_GETHMENU = 0x01E1

$.WM_PARENTNOTIFY = 0x0210
$.WM_ENTERMENULOOP = 0x0211
$.WM_EXITMENULOOP = 0x0212
$.WM_NEXTMENU = 0x0213
$.WM_SIZING = 0x0214
$.WM_CAPTURECHANGED = 0x0215
$.WM_MOVING = 0x0216
$.WM_POWERBROADCAST = 0x0218
$.WM_DEVICECHANGE = 0x0219
$.WM_MDICREATE = 0x0220
$.WM_MDIDESTROY = 0x0221
$.WM_MDIACTIVATE = 0x0222
$.WM_MDIRESTORE = 0x0223
$.WM_MDINEXT = 0x0224
$.WM_MDIMAXIMIZE = 0x0225
$.WM_MDITILE = 0x0226
$.WM_MDICASCADE = 0x0227
$.WM_MDIICONARRANGE = 0x0228
$.WM_MDIGETACTIVE = 0x0229
$.WM_DROPOBJECT = 0x022A
$.WM_QUERYDROPOBJECT = 0x022B
$.WM_BEGINDRAG = 0x022C
$.WM_DRAGLOOP = 0x022D
$.WM_DRAGSELECT = 0x022E
$.WM_DRAGMOVE = 0x022F
$.WM_MDISETMENU = 0x0230
$.WM_ENTERSIZEMOVE = 0x0231
$.WM_EXITSIZEMOVE = 0x0232
$.WM_DROPFILES = 0x0233
$.WM_MDIREFRESHMENU = 0x0234
$.WM_TOUCH = 0x0240

$.WM_IME_SETCONTEXT = 0x0281
$.WM_IME_NOTIFY = 0x0282
$.WM_IME_CONTROL = 0x0283
$.WM_IME_COMPOSITIONFULL = 0x0284
$.WM_IME_SELECT = 0x0285
$.WM_IME_CHAR = 0x0286
$.WM_IME_SYSTEM = 0x0287
$.WM_IME_REQUEST = 0x0288
$.WM_IME_KEYDOWN = 0x0290
$.WM_IME_KEYUP = 0x0291
$.WM_NCMOUSEHOVER = 0x02A0
$.WM_MOUSEHOVER = 0x02A1
$.WM_NCMOUSELEAVE = 0x02A2
$.WM_MOUSELEAVE = 0x02A3
$.WM_WTSSESSION_CHANGE = 0x02B1
$.WM_TABLET_FIRST = 0x02C0
$.WM_TABLET_LAST = 0x02DF

$.WM_CUT = 0x0300
$.WM_COPY = 0x0301
$.WM_PASTE = 0x0302
$.WM_CLEAR = 0x0303
$.WM_UNDO = 0x0304
$.WM_PALETTEISCHANGING = 0x0310
$.WM_HOTKEY = 0x0312
$.WM_PALETTECHANGED = 0x0311
$.WM_SYSMENU = 0x0313
$.WM_HOOKMSG = 0x0314
$.WM_EXITPROCESS = 0x0315
$.WM_WAKETHREAD = 0x0316
$.WM_PRINT = 0x0317
$.WM_PRINTCLIENT = 0x0318
$.WM_APPCOMMAND = 0x0319
$.WM_QUERYNEWPALETTE = 0x030F
$.WM_THEMECHANGED = 0x031A
$.WM_UAHINIT = 0x031B
$.WM_DESKTOPNOTIFY = 0x031C
$.WM_CLIPBOARDUPDATE = 0x031D
$.WM_DWMCOMPOSITIONCHANGED = 0x031E
$.WM_DWMNCRENDERINGCHANGED = 0x031F
$.WM_DWMCOLORIZATIONCOLORCHANGED = 0x0320
$.WM_DWMWINDOWMAXIMIZEDCHANGE = 0x0321
$.WM_DWMEXILEFRAME = 0x0322
$.WM_DWMSENDICONICTHUMBNAIL = 0x0323
$.WM_MAGNIFICATION_STARTED = 0x0324
$.WM_MAGNIFICATION_ENDED = 0x0325
$.WM_DWMSENDICONICLIVEPREVIEWBITMAP = 0x0326
$.WM_DWMTHUMBNAILSIZECHANGED = 0x0327
$.WM_MAGNIFICATION_OUTPUT = 0x0328
$.WM_MEASURECONTROL = 0x0330
$.WM_GETACTIONTEXT = 0x0331
$.WM_FORWARDKEYDOWN = 0x0333
$.WM_FORWARDKEYUP = 0x0334
$.WM_GETTITLEBARINFOEX = 0x033F
$.WM_NOTIFYWOW = 0x0340
$.WM_HANDHELDFIRST = 0x0358
$.WM_HANDHELDLAST = 0x035F
$.WM_AFXFIRST = 0x0360
$.WM_AFXLAST = 0x037F
$.WM_PENWINFIRST = 0x0380
$.WM_PENWINLAST = 0x038F
$.WM_DDE_INITIATE = 0x03E0
$.WM_DDE_TERMINATE = 0x03E1
$.WM_DDE_ADVISE = 0x03E2
$.WM_DDE_UNADVISE = 0x03E3
$.WM_DDE_ACK = 0x03E4
$.WM_DDE_DATA = 0x03E5
$.WM_DDE_REQUEST = 0x03E6
$.WM_DDE_POKE = 0x03E7
$.WM_DDE_EXECUTE = 0x03E8
$.WM_DBNOTIFICATION = 0x03FD
$.WM_NETCONNECT = 0x03FE
$.WM_HIBERNATE = 0x03FF

$.WM_USER = 0x0400

$.WM_APP = 0x8000

// Windows Notification Message Constants
$.NM_FIRST = 0

$.NM_OUTOFMEMORY = $.NM_FIRST - 1
$.NM_CLICK = $.NM_FIRST - 2
$.NM_DBLCLK = $.NM_FIRST - 3
$.NM_RETURN = $.NM_FIRST - 4
$.NM_RCLICK = $.NM_FIRST - 5
$.NM_RDBLCLK = $.NM_FIRST - 6
$.NM_SETFOCUS = $.NM_FIRST - 7
$.NM_KILLFOCUS = $.NM_FIRST - 8
$.NM_CUSTOMDRAW = $.NM_FIRST - 12
$.NM_HOVER = $.NM_FIRST - 13
$.NM_NCHITTEST = $.NM_FIRST - 14
$.NM_KEYDOWN = $.NM_FIRST - 15
$.NM_RELEASEDCAPTURE = $.NM_FIRST - 16
$.NM_SETCURSOR = $.NM_FIRST - 17
$.NM_CHAR = $.NM_FIRST - 18
$.NM_TOOLTIPSCREATED = $.NM_FIRST - 19
$.NM_LDOWN = $.NM_FIRST - 20
$.NM_RDOWN = $.NM_FIRST - 21
$.NM_THEMECHANGED = $.NM_FIRST - 22

$.WM_MOUSEFIRST = 0x0200
$.WM_MOUSEMOVE = 0x0200
$.WM_LBUTTONDOWN = 0x0201
$.WM_LBUTTONUP = 0x0202
$.WM_LBUTTONDBLCLK = 0x0203
$.WM_RBUTTONDOWN = 0x0204
$.WM_RBUTTONUP = 0x0205
$.WM_RBUTTONDBLCLK = 0x0206
$.WM_MBUTTONDOWN = 0x0207
$.WM_MBUTTONUP = 0x0208
$.WM_MBUTTONDBLCLK = 0x0209
$.WM_MOUSEWHEEL = 0x020A
$.WM_XBUTTONDOWN = 0x020B
$.WM_XBUTTONUP = 0x020C
$.WM_XBUTTONDBLCLK = 0x020D
$.WM_MOUSEHWHEEL = 0x020E

// Pen styles
$.PS_SOLID = 0
$.PS_DASH = 1
$.PS_DOT = 2
$.PS_DASHDOT = 3
$.PS_DASHDOTDOT = 4
$.PS_NULL = 5
$.PS_INSIDEFRAME = 6
$.PS_USERSTYLE = 7
$.PS_ALTERNATE = 8

$.PS_ENDCAP_ROUND = 0x00000000
$.PS_ENDCAP_SQUARE = 0x00000100
$.PS_ENDCAP_FLAT = 0x00000200

$.PS_JOIN_BEVEL = 0x00001000
$.PS_JOIN_MITER = 0x00002000
$.PS_JOIN_ROUND = 0x00000000

$.PS_GEOMETRIC = 0x00010000
$.PS_COSMETIC = 0x00000000

// Layered attributes Constants
$.LWA_ALPHA = 0x2
$.LWA_COLORKEY = 0x1

// Region's combine modes Constants
$.RGN_AND = 1
$.RGN_OR = 2
$.RGN_XOR = 3
$.RGN_DIFF = 4
$.RGN_COPY = 5

// Type of the resulting region from region's combine
$.ERRORREGION = 0
$.NULLREGION = 1
$.SIMPLEREGION = 2
$.COMPLEXREGION = 3

// Background mix modes
$.TRANSPARENT = 1
$.OPAQUE = 2

// Common Control Messages

// Messages to send to controls
$.CCM_FIRST = 0x2000
$.CCM_GETUNICODEFORMAT = ($.CCM_FIRST + 6)
$.CCM_SETUNICODEFORMAT = ($.CCM_FIRST + 5)
$.CCM_SETBKCOLOR = $.CCM_FIRST + 1
$.CCM_SETCOLORSCHEME = $.CCM_FIRST + 2
$.CCM_GETCOLORSCHEME = $.CCM_FIRST + 3
$.CCM_GETDROPTARGET = $.CCM_FIRST + 4
$.CCM_SETWINDOWTHEME = $.CCM_FIRST + 11

// GetAncestor Constants
$.GA_PARENT = 1
$.GA_ROOT = 2
$.GA_ROOTOWNER = 3

// GetSystemMetrics Constants
$.SM_CXSCREEN = 0
$.SM_CYSCREEN = 1
$.SM_CXVSCROLL = 2
$.SM_CYHSCROLL = 3
$.SM_CYCAPTION = 4
$.SM_CXBORDER = 5
$.SM_CYBORDER = 6
$.SM_CXDLGFRAME = 7
$.SM_CYDLGFRAME = 8
$.SM_CYVTHUMB = 9
$.SM_CXHTHUMB = 10
$.SM_CXICON = 11
$.SM_CYICON = 12
$.SM_CXCURSOR = 13
$.SM_CYCURSOR = 14
$.SM_CYMENU = 15
$.SM_CXFULLSCREEN = 16
$.SM_CYFULLSCREEN = 17
$.SM_CYKANJIWINDOW = 18
$.SM_MOUSEPRESENT = 19
$.SM_CYVSCROLL = 20
$.SM_CXHSCROLL = 21
$.SM_DEBUG = 22
$.SM_SWAPBUTTON = 23
$.SM_RESERVED1 = 24
$.SM_RESERVED2 = 25
$.SM_RESERVED3 = 26
$.SM_RESERVED4 = 27
$.SM_CXMIN = 28
$.SM_CYMIN = 29
$.SM_CXSIZE = 30
$.SM_CYSIZE = 31
$.SM_CXFRAME = 32
$.SM_CYFRAME = 33
$.SM_CXMINTRACK = 34
$.SM_CYMINTRACK = 35
$.SM_CXDOUBLECLK = 36
$.SM_CYDOUBLECLK = 37
$.SM_CXICONSPACING = 38
$.SM_CYICONSPACING = 39
$.SM_MENUDROPALIGNMENT = 40
$.SM_PENWINDOWS = 41
$.SM_DBCSENABLED = 42
$.SM_CMOUSEBUTTONS = 43
$.SM_SECURE = 44
$.SM_CXEDGE = 45
$.SM_CYEDGE = 46
$.SM_CXMINSPACING = 47
$.SM_CYMINSPACING = 48
$.SM_CXSMICON = 49
$.SM_CYSMICON = 50
$.SM_CYSMCAPTION = 51
$.SM_CXSMSIZE = 52
$.SM_CYSMSIZE = 53
$.SM_CXMENUSIZE = 54
$.SM_CYMENUSIZE = 55
$.SM_ARRANGE = 56
$.SM_CXMINIMIZED = 57
$.SM_CYMINIMIZED = 58
$.SM_CXMAXTRACK = 59
$.SM_CYMAXTRACK = 60
$.SM_CXMAXIMIZED = 61
$.SM_CYMAXIMIZED = 62
$.SM_NETWORK = 63
$.SM_CLEANBOOT = 67
$.SM_CXDRAG = 68
$.SM_CYDRAG = 69
$.SM_SHOWSOUNDS = 70
$.SM_CXMENUCHECK = 71
$.SM_CYMENUCHECK = 72
$.SM_SLOWMACHINE = 73
$.SM_MIDEASTENABLED = 74
$.SM_MOUSEWHEELPRESENT = 75
$.SM_XVIRTUALSCREEN = 76
$.SM_YVIRTUALSCREEN = 77
$.SM_CXVIRTUALSCREEN = 78
$.SM_CYVIRTUALSCREEN = 79
$.SM_CMONITORS = 80
$.SM_SAMEDISPLAYFORMAT = 81
$.SM_IMMENABLED = 82
$.SM_CXFOCUSBORDER = 83
$.SM_CYFOCUSBORDER = 84
$.SM_TABLETPC = 86
$.SM_MEDIACENTER = 87
$.SM_STARTER = 88
$.SM_SERVERR2 = 89
$.SM_CMETRICS = 90

$.SM_REMOTESESSION = 0x1000
$.SM_SHUTTINGDOWN = 0x2000
$.SM_REMOTECONTROL = 0x2001
$.SM_CARETBLINKINGENABLED = 0x2002

// Ternary raster operations
$.BLACKNESS = 0x00000042 // Fills the destination rectangle using the color associated with index 0 in the physical palette
$.CAPTUREBLT = 0X40000000 // Includes any window that are layered on top of your window in the resulting image
$.DSTINVERT = 0x00550009 // Inverts the destination rectangle
$.MERGECOPY = 0x00C000CA // Copies the inverted source rectangle to the destination
$.MERGEPAINT = 0x00BB0226 // Merges the color of the inverted source rectangle with the colors of the destination rectangle by using the OR operator
$.NOMIRRORBITMAP = 0X80000000 // Prevents the bitmap from being mirrored
$.NOTSRCCOPY = 0x00330008 // Copies the inverted source rectangle to the destination
$.NOTSRCERASE = 0x001100A6 // Combines the colors of the source and destination rectangles by using the Boolean OR operator and then inverts the resultant color
$.PATCOPY = 0x00F00021 // Copies the brush selected in hdcDest, into the destination bitmap
$.PATINVERT = 0x005A0049 // Combines the colors of the brush currently selected  in  hDest,  with  the  colors  of  the destination rectangle by using the XOR operator
$.PATPAINT = 0x00FB0A09 // Combines the colors of the brush currently selected  in  hDest,  with  the  colors  of  the inverted source rectangle by using the OR operator
$.SRCAND = 0x008800C6 // Combines the colors of the source and destination rectangles by using the Boolean AND operator
$.SRCCOPY = 0x00CC0020 // Copies the source rectangle directly to the destination rectangle
$.SRCERASE = 0x00440328 // Combines the inverted colors of the destination rectangle with the colors of the source rectangle by using the Boolean AND operator
$.SRCINVERT = 0x00660046 // Combines the colors of the source and destination rectangles by using the Boolean XOR operator
$.SRCPAINT = 0x00EE0086 // Combines the colors of the source and destination rectangles by using the Boolean OR operator
$.WHITENESS = 0x00FF0062 // Fills the destination rectangle using the color associated with index 1 in the physical palette

// DrawText Constants
$.DT_BOTTOM = 0x8
$.DT_CALCRECT = 0x400
$.DT_CENTER = 0x1
$.DT_EDITCONTROL = 0x2000
$.DT_END_ELLIPSIS = 0x8000
$.DT_EXPANDTABS = 0x40
$.DT_EXTERNALLEADING = 0x200
$.DT_HIDEPREFIX = 0x100000
$.DT_INTERNAL = 0x1000
$.DT_LEFT = 0x0
$.DT_MODIFYSTRING = 0x10000
$.DT_NOCLIP = 0x100
$.DT_NOFULLWIDTHCHARBREAK = 0x80000
$.DT_NOPREFIX = 0x800
$.DT_PATH_ELLIPSIS = 0x4000
$.DT_PREFIXONLY = 0x200000
$.DT_RIGHT = 0x2
$.DT_RTLREADING = 0x20000
$.DT_SINGLELINE = 0x20
$.DT_TABSTOP = 0x80
$.DT_TOP = 0x0
$.DT_VCENTER = 0x4
$.DT_WORDBREAK = 0x10
$.DT_WORD_ELLIPSIS = 0x40000

// RedrawWindow Constants
$.RDW_ERASE = 0x0004 // Causes the window to receive a WM_ERASEBKGND message when the window is repainted
$.RDW_FRAME = 0x0400 // Causes any part of the nonclient area of the window that intersects the update region to receive a WM_NCPAINT message
$.RDW_INTERNALPAINT = 0x0002 // Causes a WM_PAINT message to be posted to the window regardless of whether any portion of the window is invalid
$.RDW_INVALIDATE = 0x0001 // Invalidates DllStructGetData($.tRECT or $.hRegion, "") If both are 0, the entire window is invalidated
$.RDW_NOERASE = 0x0020 // Suppresses any pending WM_ERASEBKGND messages
$.RDW_NOFRAME = 0x0800 // Suppresses any pending WM_NCPAINT messages
$.RDW_NOINTERNALPAINT = 0x0010 // Suppresses any pending internal WM_PAINT messages
$.RDW_VALIDATE = 0x0008 // Validates Rect or hRegion
$.RDW_ERASENOW = 0x0200 // Causes the affected windows to receive WM_NCPAINT and WM_ERASEBKGND messages
$.RDW_UPDATENOW = 0x0100 // Causes the affected windows to receive WM_NCPAINT, WM_ERASEBKGND, and WM_PAINT messages
$.RDW_ALLCHILDREN = 0x0080 // Includes child windows in the repainting operation
$.RDW_NOCHILDREN = 0x0040 // Excludes child windows from the repainting operation

// Clipboard Constants
$.WM_RENDERFORMAT = 0x0305 // Sent if the owner has delayed rendering a specific clipboard format
$.WM_RENDERALLFORMATS = 0x0306 // Sent if the owner has delayed rendering clipboard formats
$.WM_DESTROYCLIPBOARD = 0x0307 // Sent when a call to EmptyClipboard empties the clipboard
$.WM_DRAWCLIPBOARD = 0x0308 // Sent when the content of the clipboard changes
$.WM_PAINTCLIPBOARD = 0x0309 // Sent when the clipboard viewer's client area needs repainting
$.WM_VSCROLLCLIPBOARD = 0x030A // Sent when an event occurs in the viewer's vertical scroll bar
$.WM_SIZECLIPBOARD = 0x030B // Sent when the clipboard viewer's client area has changed size
$.WM_ASKCBFORMATNAME = 0x030C // Sent to request the name of a $.CF_OWNERDISPLAY clipboard format
$.WM_CHANGECBCHAIN = 0x030D // Sent when a window is being removed from the chain
$.WM_HSCROLLCLIPBOARD = 0x030E // Sent when an event occurs in the viewer's horizontal scroll bar

// WM_NCHITTEST and MOUSEHOOKSTRUCT Mouse Position Codes
$.HTERROR = -2
$.HTTRANSPARENT = -1
$.HTNOWHERE = 0
$.HTCLIENT = 1
$.HTCAPTION = 2
$.HTSYSMENU = 3
$.HTGROWBOX = 4
$.HTSIZE = $.HTGROWBOX
$.HTMENU = 5
$.HTHSCROLL = 6
$.HTVSCROLL = 7
$.HTMINBUTTON = 8
$.HTMAXBUTTON = 9
$.HTLEFT = 10
$.HTRIGHT = 11
$.HTTOP = 12
$.HTTOPLEFT = 13
$.HTTOPRIGHT = 14
$.HTBOTTOM = 15
$.HTBOTTOMLEFT = 16
$.HTBOTTOMRIGHT = 17
$.HTBORDER = 18
$.HTREDUCE = $.HTMINBUTTON
$.HTZOOM = $.HTMAXBUTTON
$.HTSIZEFIRST = $.HTLEFT
$.HTSIZELAST = $.HTBOTTOMRIGHT
$.HTOBJECT = 19
$.HTCLOSE = 20
$.HTHELP = 21

// Windows Color Constants
$.COLOR_SCROLLBAR = 0
$.COLOR_BACKGROUND = 1
$.COLOR_ACTIVECAPTION = 2
$.COLOR_INACTIVECAPTION = 3
$.COLOR_MENU = 4
$.COLOR_WINDOW = 5
$.COLOR_WINDOWFRAME = 6
$.COLOR_MENUTEXT = 7
$.COLOR_WINDOWTEXT = 8
$.COLOR_CAPTIONTEXT = 9
$.COLOR_ACTIVEBORDER = 10
$.COLOR_INACTIVEBORDER = 11
$.COLOR_APPWORKSPACE = 12
$.COLOR_HIGHLIGHT = 13
$.COLOR_HIGHLIGHTTEXT = 14
$.COLOR_BTNFACE = 15
$.COLOR_BTNSHADOW = 16
$.COLOR_GRAYTEXT = 17
$.COLOR_BTNTEXT = 18
$.COLOR_INACTIVECAPTIONTEXT = 19
$.COLOR_BTNHIGHLIGHT = 20
$.COLOR_3DDKSHADOW = 21
$.COLOR_3DLIGHT = 22
$.COLOR_INFOTEXT = 23
$.COLOR_INFOBK = 24
$.COLOR_HOTLIGHT = 26
$.COLOR_GRADIENTACTIVECAPTION = 27
$.COLOR_GRADIENTINACTIVECAPTION = 28
$.COLOR_MENUHILIGHT = 29
$.COLOR_MENUBAR = 30

$.COLOR_DESKTOP = 1
$.COLOR_3DFACE = 15
$.COLOR_3DSHADOW = 16
$.COLOR_3DHIGHLIGHT = 20
$.COLOR_3DHILIGHT = 20
$.COLOR_BTNHILIGHT = 20

// Standard Resource Identifier Constants
$.HINST_COMMCTRL = -1

$.IDB_STD_SMALL_COLOR = 0
$.IDB_STD_LARGE_COLOR = 1
$.IDB_VIEW_SMALL_COLOR = 4
$.IDB_VIEW_LARGE_COLOR = 5
$.IDB_HIST_SMALL_COLOR = 8
$.IDB_HIST_LARGE_COLOR = 9

// Flags for $.tagSTARTUPINFO structure (Process and Thread structures)
$.STARTF_FORCEOFFFEEDBACK = 0x80
$.STARTF_FORCEONFEEDBACK = 0x40
$.STARTF_PREVENTPINNING = 0x00002000
$.STARTF_RUNFULLSCREEN = 0x20
$.STARTF_TITLEISAPPID = 0x00001000
$.STARTF_TITLEISLINKNAME = 0x00000800
$.STARTF_USECOUNTCHARS = 0x8
$.STARTF_USEFILLATTRIBUTE = 0x10
$.STARTF_USEHOTKEY = 0x200
$.STARTF_USEPOSITION = 0x4
$.STARTF_USESHOWWINDOW = 0x1
$.STARTF_USESIZE = 0x2
$.STARTF_USESTDHANDLES = 0x100

// Drawstate Constants
$.CDDS_PREPAINT = 0x00000001
$.CDDS_POSTPAINT = 0x00000002
$.CDDS_PREERASE = 0x00000003
$.CDDS_POSTERASE = 0x00000004
$.CDDS_ITEM = 0x00010000
$.CDDS_ITEMPREPAINT = 0x00010001
$.CDDS_ITEMPOSTPAINT = 0x00010002
$.CDDS_ITEMPREERASE = 0x00010003
$.CDDS_ITEMPOSTERASE = 0x00010004
$.CDDS_SUBITEM = 0x00020000

// Itemstate Constants
$.CDIS_SELECTED = 0x0001
$.CDIS_GRAYED = 0x0002
$.CDIS_DISABLED = 0x0004
$.CDIS_CHECKED = 0x0008
$.CDIS_FOCUS = 0x0010
$.CDIS_DEFAULT = 0x0020
$.CDIS_HOT = 0x0040
$.CDIS_MARKED = 0x0080
$.CDIS_INDETERMINATE = 0x0100
$.CDIS_SHOWKEYBOARDCUES = 0x0200
// The current item state For Vista and above
$.CDIS_NEARHOT = 0x0400
$.CDIS_OTHERSIDEHOT = 0x0800
$.CDIS_DROPHILITED = 0x1000

// Custom Draw Return Constants
$.CDRF_DODEFAULT = 0x00000000
$.CDRF_NEWFONT = 0x00000002
$.CDRF_SKIPDEFAULT = 0x00000004
$.CDRF_NOTIFYPOSTPAINT = 0x00000010
$.CDRF_NOTIFYITEMDRAW = 0x00000020
$.CDRF_NOTIFYSUBITEMDRAW = 0x00000020
$.CDRF_NOTIFYPOSTERASE = 0x00000040
// Return Values For Vista and above
$.CDRF_DOERASE = 0x00000008
$.CDRF_SKIPPOSTPAINT = 0x00000100

// Control default styles
$.GUI_SS_DEFAULT_GUI = ($.WS_MINIMIZEBOX | $.WS_CAPTION | $.WS_POPUP | $.WS_SYSMENU)
// ===============================================================================================================================


// #CONSTANTS# ===================================================================================================================
$.MF_UNHILITE = 0x0
$.MF_ENABLED = 0x0
$.MF_UNCHECKED = 0x0
$.MF_STRING = 0x0
$.MF_GRAYED = 0x00000001
$.MF_DISABLED = 0x00000002
$.MF_BITMAP = 0x00000004
$.MF_CHECKED = 0x00000008
$.MF_POPUP = 0x00000010
$.MF_MENUBARBREAK = 0x00000020
$.MF_MENUBREAK = 0x00000040
$.MF_HILITE = 0x00000080
$.MF_OWNERDRAW = 0x00000100
$.MF_USECHECKBITMAPS = 0x00000200
$.MF_BYPOSITION = 0x00000400
$.MF_SEPARATOR = 0x00000800
$.MF_DEFAULT = 0x00001000
$.MF_SYSMENU = 0x00002000
$.MF_HELP = 0x00004000
$.MF_RIGHTJUSTIFY = 0x00004000
$.MF_MOUSESELECT = 0x00008000

$.MFS_GRAYED = 0x00000003
$.MFS_DISABLED = $.MFS_GRAYED
$.MFS_CHECKED = $.MF_CHECKED
$.MFS_HILITE = $.MF_HILITE
$.MFS_ENABLED = $.MF_ENABLED
$.MFS_UNCHECKED = $.MF_UNCHECKED
$.MFS_UNHILITE = $.MF_UNHILITE
$.MFS_DEFAULT = $.MF_DEFAULT

$.MFT_STRING = $.MF_STRING
$.MFT_BITMAP = $.MF_BITMAP
$.MFT_MENUBARBREAK = $.MF_MENUBARBREAK
$.MFT_MENUBREAK = $.MF_MENUBREAK
$.MFT_OWNERDRAW = $.MF_OWNERDRAW
$.MFT_RADIOCHECK = 0x00000200
$.MFT_SEPARATOR = $.MF_SEPARATOR
$.MFT_RIGHTORDER = 0x00002000
$.MFT_RIGHTJUSTIFY = $.MF_RIGHTJUSTIFY

$.MIIM_STATE = 0x00000001
$.MIIM_ID = 0x00000002
$.MIIM_SUBMENU = 0x00000004
$.MIIM_CHECKMARKS = 0x00000008
$.MIIM_TYPE = 0x00000010
$.MIIM_DATA = 0x00000020
$.MIIM_DATAMASK = 0x0000003F
$.MIIM_STRING = 0x00000040
$.MIIM_BITMAP = 0x00000080
$.MIIM_FTYPE = 0x00000100

$.MIM_MAXHEIGHT = 0x00000001
$.MIM_BACKGROUND = 0x00000002
$.MIM_HELPID = 0x00000004
$.MIM_MENUDATA = 0x00000008
$.MIM_STYLE = 0x00000010
$.MIM_APPLYTOSUBMENUS = 0x80000000

$.MNS_CHECKORBMP = 0x04000000
$.MNS_NOTIFYBYPOS = 0x08000000
$.MNS_AUTODISMISS = 0x10000000
$.MNS_DRAGDROP = 0x20000000
$.MNS_MODELESS = 0x40000000
$.MNS_NOCHECK = 0x80000000

$.TPM_LEFTBUTTON = 0x0
$.TPM_LEFTALIGN = 0x0
$.TPM_TOPALIGN = 0x0
$.TPM_HORIZONTAL = 0x0
$.TPM_RECURSE = 0x00000001
$.TPM_RIGHTBUTTON = 0x00000002
$.TPM_CENTERALIGN = 0x00000004
$.TPM_RIGHTALIGN = 0x00000008
$.TPM_VCENTERALIGN = 0x00000010
$.TPM_BOTTOMALIGN = 0x00000020
$.TPM_VERTICAL = 0x00000040
$.TPM_NONOTIFY = 0x00000080
$.TPM_RETURNCMD = 0x00000100
$.TPM_HORPOSANIMATION = 0x00000400
$.TPM_HORNEGANIMATION = 0x00000800
$.TPM_VERPOSANIMATION = 0x00001000
$.TPM_VERNEGANIMATION = 0x00002000
$.TPM_NOANIMATION = 0x00004000
$.TPM_LAYOUTRTL = 0x00008000
$.TPM_WORKAREA = 0x00010000

// System Menu Commands
$.SC_SIZE = 0xF000
$.SC_MOVE = 0xF010
$.SC_MINIMIZE = 0xF020
$.SC_MAXIMIZE = 0xF030
$.SC_NEXTWINDOW = 0xF040
$.SC_PREVWINDOW = 0xF050
$.SC_CLOSE = 0xF060
$.SC_VSCROLL = 0xF070
$.SC_HSCROLL = 0xF080
$.SC_MOUSEMENU = 0xF090
$.SC_KEYMENU = 0xF100
$.SC_ARRANGE = 0xF110
$.SC_RESTORE = 0xF120
$.SC_TASKLIST = 0xF130
$.SC_SCREENSAVE = 0xF140
$.SC_HOTKEY = 0xF150
$.SC_DEFAULT = 0xF160
$.SC_MONITORPOWER = 0xF170
$.SC_CONTEXTHELP = 0xF180
$.SC_SEPARATOR = 0xF00F

// Reserved IDs for System Objects
$.OBJID_SYSMENU = 0xFFFFFFFF
$.OBJID_MENU = 0xFFFFFFFD
// ===============================================================================================================================

















var def_args = {
    'ClipGet':                  {1: 512},
    'ControlClick':             {1: '', 3: 'LEFT', 4: 1, 5: AU3_INTDEFAULT, 6: AU3_INTDEFAULT},
    'ControlClickByHandle':     {2: 'LEFT', 3: 1, 4: AU3_INTDEFAULT, 5: AU3_INTDEFAULT},
    'ControlCommand':           {1: '', 4: '', 6: 256},
    'ControlCommandByHandle':   {3: '', 5: 256},
    'ControlListView':          {1: '', 4: '', 5: '', 7: 256},
    'ControlListViewByHandle':  {3: '', 4: '', 6: 256},
    'ControlDisable':           {1: ''},
    'ControlEnable':            {1: ''},
    'ControlFocus':             {1: ''},
    'ControlGetFocus':          {1: '', 3: 256},
    'ControlGetFocusByHandle':  {2: 256}
};

































var def_args = {
    'ClipGet':                  {1: 512},
    'ControlClick':             {1: '', 3: 'LEFT', 4: 1, 5: AU3_INTDEFAULT, 6: AU3_INTDEFAULT},
    'ControlClickByHandle':     {2: 'LEFT', 3: 1, 4: AU3_INTDEFAULT, 5: AU3_INTDEFAULT},
    'ControlCommand':           {1: '', 4: '', 6: 256},
    'ControlCommandByHandle':   {3: '', 5: 256},
    'ControlListView':          {1: '', 4: '', 5: '', 7: 256},
    'ControlListViewByHandle':  {3: '', 4: '', 6: 256},
    'ControlDisable':           {1: ''},
    'ControlEnable':            {1: ''},
    'ControlFocus':             {1: ''},
    'ControlGetFocus':          {1: '', 3: 256},
    'ControlGetFocusByHandle':  {2: 256},
    'ControlGetHandleAsText':   {1: '', 4: 256},
    'ControlGetPos':            {1: ''},
    'ControlGetText':           {1: '', 4: 512},
    'ControlGetTextByHandle':   {3: 512},
    'ControlHide':              {1: ''},
    'ControlMove':              {1: '', 5: -1, 6: -1},
    'ControlMoveByHandle':      {4: -1, 5: -1},
    'ControlSend':              {1: '', 4: 0},
    'ControlSendByHandle':      {3: 0},
    'ControlSetText':           {1: ''},
    'ControlShow':              {1: ''},
    'ControlTreeView':          {1: '', 4: '', 5: '', 7: 256},
    'ControlTreeViewByHandle':  {3: '', 4: '', 6: 256},
    'DriveMapAdd':              {3: '', 4: '', 6: 256},
    'DriveMapGet':              {2: 256},
    'MouseClick':               {0: 'LEFT', 1: AU3_INTDEFAULT, 2: AU3_INTDEFAULT, 3: 1, 4: -1},
    'MouseClickDrag':           {5: -1},
    'MouseDown':                {0: 'LEFT'},
    'MouseMove':                {2: -1},
    'MouseUp':                  {0: 'LEFT'},
    'PixelChecksum':            {1: 1},
    'PixelSearch':              {2: 0, 3: 1},
    'ProcessWait':              {1: 0},
    'ProcessWaitClose':         {1: 0},
    'Run':                      {1: '', 2: SW_SHOWNORMAL},
    'RunWait':                  {1: '', 2: SW_SHOWNORMAL},
    'RunAs':                    {5: '', 6: SW_SHOWNORMAL},
    'RunAsWait':                {5: '', 6: SW_SHOWNORMAL},
    'Send':                     {1: 0},
    'StatusbarGetText':         {1: '', 2: 1, 4: 256},
    'StatusbarGetTextByHandle': {1: 1, 3: 256},
    'ToolTip':                  {1: AU3_INTDEFAULT, 2: AU3_INTDEFAULT},
    'WinActivate':              {1: ''},
    'WinClose':                 {1: ''},
    'WinExists':                {1: ''},
    'WinGetClassList':          {1: '', 3: 512},
    'WinGetClassListByHandle':  {2: 512},
    'WinGetClientSize':         {1: ''},
    'WinGetHandle':             {1: ''},
    'WinGetHandleAsText':       {1: '', 3: 256},
    'WinGetPos':                {1: ''},
    'WinGetProcess':            {1: ''},
    'WinGetState':              {1: ''},
    'WinGetText':               {1: '', 3: 512},
    'WinGetTextByHandle':       {2: 512},
    'WinGetTitle':              {1: '', 3: 512},
    'WinGetTitleByHandle':      {2: 512},
    'WinKill':                  {1: ''},
    'WinMenuSelectItem':        {1: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''},
    'WinMenuSelectItemByHandle':{2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: ''},
    'WinMove':                  {1: '', 4: -1, 5: -1},
    'WinMoveByHandle':          {3: -1, 4: -1},
    'WinSetOnTop':              {1: ''},
    'WinSetState':              {1: ''},
    'WinSetTitle':              {1: ''},
    'WinSetTrans':              {1: ''},
    'WinWait':                  {1: '', 2: 0},
    'WinWaitByHandle':          {1: 0},
    'WinWaitActive':            {1: '', 2: 0},
    'WinWaitActiveByHandle':    {1: 0},
    'WinWaitClose':             {1: '', 2: 0},
    'WinWaitCloseByHandle':     {1: 0},
    'WinWaitNotActive':         {1: '', 2: 0},
    'WinWaitNotActiveByHandle': {1: 0},
};

var arg_to_return_value = {
    'ClipGet':                  {arg: 0, type: 'wstring', ex_arg: 1},
    'ControlCommand':           {arg: 5, type: 'wstring', ex_arg: 6},
    'ControlCommandByHandle':   {arg: 4, type: 'wstring', ex_arg: 5},
    'ControlListView':          {arg: 6, type: 'wstring', ex_arg: 7},
    'ControlListViewByHandle':  {arg: 5, type: 'wstring', ex_arg: 6},
    'ControlGetFocus':          {arg: 2, type: 'wstring', ex_arg: 3},
    'ControlGetFocusByHandle':  {arg: 1, type: 'wstring', ex_arg: 2},
    'ControlGetHandleAsText':   {arg: 3, type: 'wstring', ex_arg: 4},
    'ControlGetPos':            {arg: 3, type: 'rect'},
    'ControlGetPosByHandle':    {arg: 2, type: 'rect'},
    'ControlGetText':           {arg: 3, type: 'wstring', ex_arg: 4},
    'ControlGetTextByHandle':   {arg: 2, type: 'wstring', ex_arg: 3},
    'ControlTreeView':          {arg: 6, type: 'wstring', ex_arg: 7},
    'ControlTreeViewByHandle':  {arg: 5, type: 'wstring', ex_arg: 6},
    'DriveMapAdd':              {arg: 5, type: 'wstring', ex_arg: 6},
    'DriveMapGet':              {arg: 1, type: 'wstring', ex_arg: 2},
    'MouseGetPos':              {arg: 0, type: 'point'},
    'PixelSearch':              {arg: 4, type: 'point'},
    'StatusbarGetText':         {arg: 3, type: 'wstring', ex_arg: 4},
    'StatusbarGetTextByHandle': {arg: 2, type: 'wstring', ex_arg: 3},
    'WinGetCaretPos':           {arg: 0, type: 'point'},
    'WinGetClassList':          {arg: 2, type: 'wstring', ex_arg: 3},
    'WinGetClassListByHandle':  {arg: 1, type: 'wstring', ex_arg: 2},
    'WinGetClientSize':         {arg: 2, type: 'rect'},
    'WinGetClientSizeByHandle': {arg: 1, type: 'rect'},
    'WinGetHandleAsText':       {arg: 2, type: 'wstring', ex_arg: 3},
    'WinGetPos':                {arg: 2, type: 'rect'},
    'WinGetPosByHandle':        {arg: 1, type: 'rect'},
    'WinGetText':               {arg: 2, type: 'wstring', ex_arg: 3},
    'WinGetTextByHandle':       {arg: 1, type: 'wstring', ex_arg: 2},
    'WinGetTitle':              {arg: 2, type: 'wstring', ex_arg: 3},
    'WinGetTitleByHandle':      {arg: 1, type: 'wstring', ex_arg: 2},
};


var dll = get_dll();
if(dll === null)
    throw new Error('autoit can not run on this platform!');

var autoit;
var dllPaths = [
    path.join(__dirname, dll),                           // Normal Node.js environment
    path.join(process.cwd(), dll),                       // Current working directory
    path.join(process.cwd(), 'node_modules', 'autoit', dll), // Relative to CWD
    path.join(path.dirname(process.execPath), dll),      // Next to executable (pkg)
    dll                                                  // Just the filename (system PATH)
];

var loadError;
for (var i = 0; i < dllPaths.length; i++) {
    try {
        autoit = koffi.load(dllPaths[i]);
        break;
    } catch (err) {
        loadError = err;
    }
}

if (!autoit) {
    throw new Error('AutoIt failed to load, using mock implementation: ' + loadError.message);
}

// Definitions (moved here after autoit is loaded)
var AU3_INTDEFAULT = -2147483647;	// "Default" value for _some_ int parameters (largest negative number)

var autoit_functions = {
    Init: autoit.func('void AU3_Init()'),
    error: autoit.func('int AU3_error()'),
    AutoItSetOption: autoit.func('int AU3_AutoItSetOption(str16, int)'),
    ClipGet: autoit.func('void AU3_ClipGet(str16, int)'),
    ClipPut: autoit.func('void AU3_ClipPut(str16)'),
    ControlClick: autoit.func('int AU3_ControlClick(str16, str16, str16, str16, int, int, int)'),
    ControlClickByHandle: autoit.func('int AU3_ControlClickByHandle(int, int, str16, int, int, int)'),
    ControlCommand: autoit.func('void AU3_ControlCommand(str16, str16, str16, str16, str16, str16, int)'),
    ControlCommandByHandle: autoit.func('void AU3_ControlCommandByHandle(int, int, str16, str16, str16, int)'),
    ControlListView: autoit.func('void AU3_ControlListView(str16, str16, str16, str16, str16, str16, str16, int)'),
    ControlListViewByHandle: autoit.func('void AU3_ControlListViewByHandle(int, int, str16, str16, str16, str16, int)'),
    ControlDisable: autoit.func('int AU3_ControlDisable(str16, str16, str16)'),
    ControlDisableByHandle: autoit.func('int AU3_ControlDisableByHandle(int, int)'),
    ControlEnable: autoit.func('int AU3_ControlEnable(str16, str16, str16)'),
    ControlEnableByHandle: autoit.func('int AU3_ControlEnableByHandle(int, int)'),
    ControlFocus: autoit.func('int AU3_ControlFocus(str16, str16, str16)'),
    ControlFocusByHandle: autoit.func('int AU3_ControlFocusByHandle(int, int)'),
    ControlGetFocus: autoit.func('void AU3_ControlGetFocus(str16, str16, str16, int)'),
    ControlGetFocusByHandle: autoit.func('void AU3_ControlGetFocusByHandle(int, str16, int)'),
    ControlGetHandle: autoit.func('int AU3_ControlGetHandle(int, str16)'),
    ControlGetHandleAsText: autoit.func('void AU3_ControlGetHandleAsText(str16, str16, str16, str16, int)'),
    ControlGetPos: autoit.func('int AU3_ControlGetPos(str16, str16, str16, void*)'),
    ControlGetPosByHandle: autoit.func('int AU3_ControlGetPosByHandle(int, int, void*)'),
    ControlGetText: autoit.func('void AU3_ControlGetText(str16, str16, str16, str16, int)'),
    ControlGetTextByHandle: autoit.func('void AU3_ControlGetTextByHandle(int, int, str16, int)'),
    ControlHide: autoit.func('int AU3_ControlHide(str16, str16, str16)'),
    ControlHideByHandle: autoit.func('int AU3_ControlHideByHandle(int, int)'),
    ControlMove: autoit.func('int AU3_ControlMove(str16, str16, str16, int, int, int, int)'),
    ControlMoveByHandle: autoit.func('int AU3_ControlMoveByHandle(int, int, int, int, int, int)'),
    ControlSend: autoit.func('int AU3_ControlSend(str16, str16, str16, str16, int)'),
    ControlSendByHandle: autoit.func('int AU3_ControlSendByHandle(int, int, str16, int)'),
    ControlSetText: autoit.func('int AU3_ControlSetText(str16, str16, str16, str16)'),
    ControlSetTextByHandle: autoit.func('int AU3_ControlSetTextByHandle(int, int, str16)'),
    ControlShow: autoit.func('int AU3_ControlShow(str16, str16, str16)'),
    ControlShowByHandle: autoit.func('int AU3_ControlShowByHandle(int, int)'),
    ControlTreeView: autoit.func('void AU3_ControlTreeView(str16, str16, str16, str16, str16, str16, str16, int)'),
    ControlTreeViewByHandle: autoit.func('void AU3_ControlTreeViewByHandle(int, int, str16, str16, str16, str16, int)'),
    DriveMapAdd: autoit.func('void AU3_DriveMapAdd(str16, str16, int, str16, str16, str16, int)'),
    DriveMapDel: autoit.func('int AU3_DriveMapDel(str16)'),
    DriveMapGet: autoit.func('void AU3_DriveMapGet(str16, str16, int)'),
    IsAdmin: autoit.func('int AU3_IsAdmin()'),
    MouseClick: autoit.func('int AU3_MouseClick(str16, int, int, int, int)'),
    MouseClickDrag: autoit.func('int AU3_MouseClickDrag(str16, int, int, int, int, int)'),
    MouseDown: autoit.func('void AU3_MouseDown(str16)'),
    MouseGetCursor: autoit.func('int AU3_MouseGetCursor()'),
    MouseGetPos: autoit.func('void AU3_MouseGetPos(void*)'),
    MouseMove: autoit.func('int AU3_MouseMove(int, int, int)'),
    MouseUp: autoit.func('void AU3_MouseUp(str16)'),
    MouseWheel: autoit.func('void AU3_MouseWheel(str16, int)'),
    Opt: autoit.func('int AU3_Opt(str16, int)'),
    PixelChecksum: autoit.func('uint32 AU3_PixelChecksum(void*, int)'),
    PixelGetColor: autoit.func('int AU3_PixelGetColor(int, int)'),
    PixelSearch: autoit.func('void AU3_PixelSearch(void*, int, int, int, void*)'),
    ProcessClose: autoit.func('int AU3_ProcessClose(str16)'),
    ProcessExists: autoit.func('int AU3_ProcessExists(str16)'),
    ProcessSetPriority: autoit.func('int AU3_ProcessSetPriority(str16, int)'),
    ProcessWait: autoit.func('int AU3_ProcessWait(str16, int)'),
    ProcessWaitClose: autoit.func('int AU3_ProcessWaitClose(str16, int)'),
    Run: autoit.func('int AU3_Run(str16, str16, int)'),
    RunWait: autoit.func('int AU3_RunWait(str16, str16, int)'),
    RunAs: autoit.func('int AU3_RunAs(str16, str16, str16, int, str16, str16, int)'),
    RunAsWait: autoit.func('int AU3_RunAsWait(str16, str16, str16, int, str16, str16, int)'),
    Send: autoit.func('void AU3_Send(str16, int)'),
    Shutdown: autoit.func('int AU3_Shutdown(int)'),
    Sleep: autoit.func('void AU3_Sleep(int)'),
    StatusbarGetText: autoit.func('int AU3_StatusbarGetText(str16, str16, int, str16, int)'),
    StatusbarGetTextByHandle: autoit.func('int AU3_StatusbarGetTextByHandle(int, int, str16, int)'),
    ToolTip: autoit.func('void AU3_ToolTip(str16, int, int)'),
    WinActivate: autoit.func('int AU3_WinActivate(str16, str16)'),
    WinActivateByHandle: autoit.func('int AU3_WinActivateByHandle(int)'),
    WinActive: autoit.func('int AU3_WinActive(str16, str16)'),
    WinActiveByHandle: autoit.func('int AU3_WinActiveByHandle(int)'),
    WinClose: autoit.func('int AU3_WinClose(str16, str16)'),
    WinCloseByHandle: autoit.func('int AU3_WinCloseByHandle(int)'),
    WinExists: autoit.func('int AU3_WinExists(str16, str16)'),
    WinExistsByHandle: autoit.func('int AU3_WinExistsByHandle(int)'),
    WinGetCaretPos: autoit.func('int AU3_WinGetCaretPos(void*)'),
    WinGetClassList: autoit.func('void AU3_WinGetClassList(str16, str16, str16, int)'),
    WinGetClassListByHandle: autoit.func('void AU3_WinGetClassListByHandle(int, str16, int)'),
    WinGetClientSize: autoit.func('int AU3_WinGetClientSize(str16, str16, void*)'),
    WinGetClientSizeByHandle: autoit.func('int AU3_WinGetClientSizeByHandle(int, void*)'),
    WinGetHandle: autoit.func('int AU3_WinGetHandle(str16, str16)'),
    WinGetHandleAsText: autoit.func('void AU3_WinGetHandleAsText(str16, str16, str16, int)'),
    WinGetPos: autoit.func('int AU3_WinGetPos(str16, str16, void*)'),
    WinGetPosByHandle: autoit.func('int AU3_WinGetPosByHandle(int, void*)'),
    WinGetProcess: autoit.func('uint32 AU3_WinGetProcess(str16, str16)'),
    WinGetProcessByHandle: autoit.func('uint32 AU3_WinGetProcessByHandle(int)'),
    WinGetState: autoit.func('int AU3_WinGetState(str16, str16)'),
    WinGetStateByHandle: autoit.func('int AU3_WinGetStateByHandle(int)'),
    WinGetText: autoit.func('void AU3_WinGetText(str16, str16, str16, int)'),
    WinGetTextByHandle: autoit.func('void AU3_WinGetTextByHandle(int, str16, int)'),
    WinGetTitle: autoit.func('void AU3_WinGetTitle(str16, str16, str16, int)'),
    WinGetTitleByHandle: autoit.func('void AU3_WinGetTitleByHandle(int, str16, int)'),
    WinKill: autoit.func('int AU3_WinKill(str16, str16)'),
    WinKillByHandle: autoit.func('int AU3_WinKillByHandle(int)'),
    WinMenuSelectItem: autoit.func('int AU3_WinMenuSelectItem(str16, str16, str16, str16, str16, str16, str16, str16, str16, str16)'),
    WinMenuSelectItemByHandle: autoit.func('int AU3_WinMenuSelectItemByHandle(int, str16, str16, str16, str16, str16, str16, str16, str16)'),
    WinMinimizeAll: autoit.func('void AU3_WinMinimizeAll()'),
    WinMinimizeAllUndo: autoit.func('void AU3_WinMinimizeAllUndo()'),
    WinMove: autoit.func('int AU3_WinMove(str16, str16, int, int, int, int)'),
    WinMoveByHandle: autoit.func('int AU3_WinMoveByHandle(int, int, int, int, int)'),
    WinSetOnTop: autoit.func('int AU3_WinSetOnTop(str16, str16, int)'),
    WinSetOnTopByHandle: autoit.func('int AU3_WinSetOnTopByHandle(int, int)'),
    WinSetState: autoit.func('int AU3_WinSetState(str16, str16, int)'),
    WinSetStateByHandle: autoit.func('int AU3_WinSetStateByHandle(int, int)'),
    WinSetTitle: autoit.func('int AU3_WinSetTitle(str16, str16, str16)'),
    WinSetTitleByHandle: autoit.func('int AU3_WinSetTitleByHandle(int, str16)'),
    WinSetTrans: autoit.func('int AU3_WinSetTrans(str16, str16, int)'),
    WinSetTransByHandle: autoit.func('int AU3_WinSetTransByHandle(int, int)'),
    WinWait: autoit.func('int AU3_WinWait(str16, str16, int)'),
    WinWaitByHandle: autoit.func('int AU3_WinWaitByHandle(int, int)'),
    WinWaitActive: autoit.func('int AU3_WinWaitActive(str16, str16, int)'),
    WinWaitActiveByHandle: autoit.func('int AU3_WinWaitActiveByHandle(int, int)'),
    WinWaitClose: autoit.func('int AU3_WinWaitClose(str16, str16, int)'),
    WinWaitCloseByHandle: autoit.func('int AU3_WinWaitCloseByHandle(int, int)'),
    WinWaitNotActive: autoit.func('int AU3_WinWaitNotActive(str16, str16, int)'),
    WinWaitNotActiveByHandle: autoit.func('int AU3_WinWaitNotActiveByHandle(int, int)')
};

function modify_func(func){
    // Functions are now already created with autoit.func(), just assign them to $
    $[func] = autoit_functions[func];
    $[func].async = $[func];
}

function modify_def_args(func){
    var old_func = $[func];
    var get_args = def_args[func];

    $[func] = function(){
        var return_func = arg_to_return_value[func];
        var return_arg = (return_func === undefined ? -1 : return_func.arg);

        var args = Array.prototype.slice.call(arguments);
        for(var i in get_args){
            var j = (return_arg >= 0 && i >= return_arg ? i - 1 : i);
            while(j >= args.length) args.push(undefined);
            if(args[j] === undefined) args[j] = get_args[i];
        }
        return old_func.apply(this, args);
    }

    $[func].async = function(){
        // Note: koffi doesn't have built-in async, so we'll use the sync version
        var return_func = arg_to_return_value[func];
        var return_arg = (return_func === undefined ? -1 : return_func.arg);
        
        var args = Array.prototype.slice.call(arguments);
        var callback = args.pop(); // remove callback from args
        
        for(var i in get_args){
            var j = (return_arg >= 0 && i >= return_arg ? i - 1 : i);
            while(j >= args.length) args.push(undefined);
            if(args[j] === undefined) args[j] = get_args[i];
        }
        
        try {
            var result = $[func].apply(this, args);
            process.nextTick(function() {
                callback(null, result);
            });
        } catch (err) {
            process.nextTick(function() {
                callback(err);
            });
        }
    }
}

function getWString(buf){
    for(var i = 0; i < buf.length; i += 2){
        if(buf[i] == 0 && buf[i + 1] == 0)
            return wchar_t.toString(buf.slice(0, i));
    }
    return wchar_t.toString(buf);
}

function modify_arg_to_return_value(func){
    var old_func = $[func];
    var get_ret = arg_to_return_value[func];

    $[func] = function(){
        if(get_ret.type == 'wstring'){
            var args = Array.prototype.slice.call(arguments);
            args.splice(get_ret.arg, 0, undefined);
            var nBufSize = args[get_ret.ex_arg];
            var buf = Buffer.alloc(wchar_t.size * nBufSize);
            args[get_ret.arg] = buf;
            old_func.apply(this, args);
            return getWString(buf);
        }
        else if(get_ret.type == 'rect'){
            var args = Array.prototype.slice.call(arguments);
            args.splice(get_ret.arg, 0, undefined);
            var rect = koffi.alloc(RECT); // Allocate struct buffer
            args[get_ret.arg] = rect;
            old_func.apply(this, args);
            return koffi.decode(rect, RECT); // Decode struct from buffer
        }
        else if(get_ret.type == 'point'){
            var args = Array.prototype.slice.call(arguments);
            args.splice(get_ret.arg, 0, undefined);
            var point = koffi.alloc(POINT); // Allocate struct buffer
            args[get_ret.arg] = point;
            old_func.apply(this, args);
            return koffi.decode(point, POINT); // Decode struct from buffer
        }
        else
            console.log('unknown return type ' + get_ret.type);
    }

    $[func].async = function(){
        // Note: koffi doesn't have built-in async, so we'll use the sync version
        // For compatibility, we'll wrap it in a Promise for async behavior
        var args = Array.prototype.slice.call(arguments);
        var callback = args.pop(); // remove callback from args
        
        try {
            var result = $[func].apply(this, args);
            // Call callback with result in next tick to simulate async behavior
            process.nextTick(function() {
                callback(null, result);
            });
        } catch (err) {
            process.nextTick(function() {
                callback(err);
            });
        }
    }
}

function modify_byhande_func(func){
    // Function names no longer have AU3_ prefix
    var appendix = 'ByHandle';
    var is_byhandle = (func.length > appendix.length && func.substr(func.length - appendix.length) == appendix);
    if(!is_byhandle) return;

    var byname_func = func.substr(0, func.length - appendix.length);
    if($[byname_func] === undefined) return;
    //console.log(byname_func + '   ' + func);

    var old_func = $[byname_func];
    $[byname_func] = function(){
        if(typeof arguments[0] === 'number')
            return $[func].apply(this, arguments);
        else
            return old_func.apply(this, arguments);
    }
    $[byname_func].async = function(){
        if(typeof arguments[0] === 'number')
            return $[func].apply(this, arguments);
        else
            return old_func.async.apply(this, arguments);
    }
}


for(var func in autoit_functions){
    try {
        modify_func(func);
    } catch (error) {
        console.error(`Error creating function ${func}:`, error.message);
        console.error('Function definition:', autoit_functions[func]);
        throw error;
    }
}
for(var func in arg_to_return_value){
    modify_arg_to_return_value(func);
}
for(var func in def_args){
    modify_def_args(func);
}
for(var func in autoit_functions){
    modify_byhande_func(func);
}



var user32dll = koffi.load('user32.dll');
var PostMessage = user32dll.func('PostMessageW', 'int', ['int', 'uint32', 'uint32', 'uint32']);
$.PostMessage = function(hWnd, msg, wParam, lParam){
    if(wParam === undefined) wParam = 0;
    if(lParam === undefined) lParam = 0;
    return PostMessage(hWnd, msg, wParam, lParam);
}

var SendMessage = user32dll.func('SendMessageW', 'int', ['int', 'uint32', 'uint32', 'uint32']);
$.SendMessage = function(hWnd, msg, wParam, lParam){
    if(wParam === undefined) wParam = 0;
    if(lParam === undefined) lParam = 0;
    return SendMessage(hWnd, msg, wParam, lParam);
}

$.GetDlgCtrlID = user32dll.func('GetDlgCtrlID', 'int', ['int']);

// Export struct types as constructors instead of direct objects
$.RECT = function() { return koffi.alloc(RECT); };
$.POINT = function() { return koffi.alloc(POINT); };

module.exports = $;

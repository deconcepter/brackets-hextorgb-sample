/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, window, $, Mustache, navigator */

define(function (require, exports, module) {
    "use strict";
    
    var CommandManager              = brackets.getModule("command/CommandManager"),
        Menus                       = brackets.getModule("command/Menus"),
        EditorManager               = brackets.getModule("editor/EditorManager");
    
    /** @constant {string} */
    var COMMAND_ID  = "jp.codezine.commands.hex_to_rgb";
    var MENU_ID     = "jp.codezine.custom_menu";
    
    function hexToRGB() {
        // 選択したテキストを取得
        var selection = EditorManager.getFocusedEditor().getSelectedText();
        
        // #を取りのぞいた文字列を取得
        var hex = selection.charAt(0) === "#" ? selection.substring(1, 7) : selection;
        
        // RGB値に変換
        var R = parseInt(hex.substring(0, 2), 16);
        var G = parseInt(hex.substring(2, 4), 16);
        var B = parseInt(hex.substring(4, 6), 16);
        
        // 正しいRGB値に変換されていたら選択テキストを置き換える
        if (!isNaN(R) && !isNaN(G) && !isNaN(B)) {
            EditorManager.getFocusedEditor()._codeMirror.replaceSelection('rgb(' + R + ', ' + G + ', ' + B + ')');
        }
    }
        
    CommandManager.register('Hex to RGB', COMMAND_ID, hexToRGB);
    
    var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    contextMenu.addMenuItem(COMMAND_ID);
});
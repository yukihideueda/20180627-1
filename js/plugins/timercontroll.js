+//============================================================================= 


+// CRTA_TimerManager.js 


+//============================================================================= 


+  


+/*: 


+ * @plugindesc v1.1.0 �^�C�}�[�֌W�̊Ǘ��v���O�C�� 


+ * @author tokineco@cretia studio 


+ * 


+ * @param Font Size 


+ * @desc �t�H���g�T�C�Y 


+ * Default: 32 


+ * @default 32 


+ * 


+ * @param Width 


+ * @desc ���� 


+ * Default: 96 


+ * @default 96 


+ * 


+ * @param Height 


+ * @desc �c�� 


+ * Default: 48 


+ * @default 48 


+ * 


+ * @param Position X 


+ * @desc X�ʒu 


+ * Default: Graphics.width - this.bitmap.width 


+ * @default Graphics.width - this.bitmap.width 


+ 


+ * @param Position Y 


+ * @desc Y�ʒu 


+ * Default: 0 


+ * @default 0 


+ * 


+ * @help 


+ * �T�v: 


+ * �c�N�[���W���̃J�E���g�_�E���^�C�}�[�̕\����ς�����A���낢��ȑ�����s���v���O�C���ł��B 


+ * ���ԉ����A�����A��~�A�ĊJ���s���܂��B 


+ * 


+ * �ڍׂȎg�p���@�͉��L���������������B 


+ * http://studio.cretia.net/blog/666 


+ * 


+ * �v���O�C���R�}���h: 


+ *   CRTA_TimerManager add 10       # �^�C�}�[���w��b������������ 


+ *   CRTA_TimerManager sub 10       # �^�C�}�[���w��b������������ 


+ *   CRTA_TimerManager pause        # �^�C�}�[���ꎞ��~������ 


+ *   CRTA_TimerManager resume       # �^�C�}�[���ĊJ������ 


+ *  


+ * �����̃v���O�C���ł́A�ȉ������������Ă��܂��̂ŁA�{�̃A�b�v�f�[�g�⋣���ɒ��ӂ��Ă��������B 


+ *    Sprite_Timer.prototype.createBitmap 


+ *    Sprite_Timer.prototype.updatePosition 


+ *    Game_Timer.prototype.start 


+ *    Game_Timer.prototype.update 


+ *  


+ * ���C�Z���X: 


+ * ���̃v���O�C���͈ȉ��̃��C�Z���X�̂��ƁA�g�p���邱�Ƃ��ł��܂��B  


+ *   Copyright (c) 2016 tokineco 


+ *   Released under the MIT license 


+ *   https://github.com/tokineco/RMMV_CRTAPlugins/blob/master/LICENSE 


+ */ 


+  


+(function() { 


+  


+    var parameters = PluginManager.parameters('CRTA_TimerManager'); 


+    var fontSize = Number(parameters['Font Size'] || 32); 


+    var width = Number(parameters['Width'] || 96); 


+    var height = Number(parameters['Height'] || 48); 


+    var posX = String(parameters['Position X']); 


+    var posY = String(parameters['Position Y']); 


+ 


+    var _timerPause = false; 


+ 


+    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand; 


+    Game_Interpreter.prototype.pluginCommand = function(command, args) { 


+        _Game_Interpreter_pluginCommand.call(this, command, args); 


+        if (command === 'CRTA_TimerManager') { 


+ 


+            switch (args[0]) { 


+            case 'add': 


+                $gameTimer.addFrames(eval(args[1])); 


+                break; 


+            case 'sub': 


+                $gameTimer.subFrames(eval(args[1])); 


+                break; 


+            case 'pause': 


+                $gameTimer.pause(); 


+                break; 


+            case 'resume': 


+                $gameTimer.resume(); 


+                break; 


+            } 


+        } 


+    }; 


+ 


+    var _Sprite_Timer_createBitmap = Sprite_Timer.prototype.createBitmap; 


+    Sprite_Timer.prototype.createBitmap = function() { 


+        _Sprite_Timer_createBitmap.call(this); 


+ 


+        this.bitmap.width = width; 


+        this.bitmap.height = height; 


+        this.bitmap.fontSize = fontSize; 


+    } 


+ 


+    var _Sprite_Timer_updatePosition = Sprite_Timer.prototype.updatePosition; 


+    Sprite_Timer.prototype.updatePosition = function() { 


+        _Sprite_Timer_updatePosition.call(this); 


+ 


+        this.x = eval(posX); 


+        this.y = eval(posY); 


+    }; 


+ 


+ 


+    //================================= 


+    // Game_Timer (�v���O�C���X�N���v�g�p) 


+    //================================= 


+    // override 


+    var _Game_Timer_start = Game_Timer.prototype.start; 


+    Game_Timer.prototype.start = function(count) { 


+        _Game_Timer_start.call(this, count); 


+        _timerPause = false; 


+    }; 


+ 


+    // override 


+    var _Game_Timer_update = Game_Timer.prototype.update; 


+    Game_Timer.prototype.update = function(sceneActive) { 


+        if (!_timerPause) { 


+            _Game_Timer_update.call(this, sceneActive); 


+        } 


+    }; 


+ 


+    // Game_Timer �� addFrames ��ǉ� 


+    Game_Timer.prototype.addFrames = function(second) { 


+        this._frames += second * 60; 


+    }; 


+ 


+    // Game_Timer �� subFrames ��ǉ� 


+    Game_Timer.prototype.subFrames = function(second) { 


+        this._frames -= second * 60; 


+        if (this._frames < 0) { 


+            this._frames = 0; 


+        } 


+    }; 


+ 


+    // Game_Timer �� pause ��ǉ� 


+    Game_Timer.prototype.pause = function() { 


+        _timerPause = true; 


+    }; 


+ 


+    // Game_Timer �� resume ��ǉ� 


+    Game_Timer.prototype.resume = function() { 


+        _timerPause = false; 


+    }; 


+ 


+})();
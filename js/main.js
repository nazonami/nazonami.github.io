enchant();

/*
 * 定数
 */
// パラメータ
var SCREEN_WIDTH    = 320;  // スクリーンの幅
var SCREEN_HEIGHT   = 480;  // スクリーンの高さ
var LIMIT_TIME = 20; // 制限時間

var combo = 0;

window.onload = function() {
    var game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
    game.fps = 24;
    game.score = 0;
    game.preload('./img/mascot_chara.png', './img/all.png', './img/logo.png', './img/button.png','./img/hacka_chan.png'); 

    var ButtonImage = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 233, 53);
            this.x = x - 116;
            this.y = y - 12;
            this.image = game.assets['./img/button.png'];
            this.frame = 0;
        }
    });

    var Chara = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y, f) {
            enchant.Sprite.call(this, 118, 256);
            this.x = x;
            this.y = y;
            this.image = game.assets['./img/mascot_chara.png'];
            this.frame = f % 6;
        }
    });

    var TargetChara = enchant.Class.create(Chara, {
        initialize: function() {
            Chara.call(this, 0, rand(SCREEN_HEIGHT - 200), rand(5));
            this.scaleX = 0.8 * plusOrMinus(); 
            this.scaleY = 0.8
            this.speed = (this.frame + 1) * 2.5 * plusOrMinus();
            if (this.speed < 0){
                this.x = SCREEN_WIDTH;
            }
            this.addEventListener('enterframe', function() {
                this.x += this.speed;
                // 画面外に出たら消す
                if ((this.x > SCREEN_WIDTH | this.x < -118)|(this.y > SCREEN_HEIGHT | this.y < -256)) {
                    this.parentNode.removeChild(this);
                }
            });
            // タッチイベントを設定する
            this.addEventListener('touchstart', function(e) {
                combo ++;
                var comboCount = new Label(combo + 'HIT!');
                comboCount.textAlign = 'center';
                comboCount.x = this.x - SCREEN_WIDTH/2;
                comboCount.y = this.y + 10;
                comboCount.font = '24px sans-serif';
                comboCount.color = '#f00'
                this.parentNode.addChild(comboCount);
                comboCount.tl.moveBy(0, -10, 8).then(function(){
                    this.parentNode.removeChild(comboCount);
                });              
                game.score += 100 * (this.frame + 1);
                this.tl.moveTo(this.x, -256, 6).and().rotateBy(-360, 8);
            });
        }
    });

    game.onload = function() { 
        /**
        * タイトルシーン
        */
        var createStartScene = function() {
            var scene = new Scene(); 
            scene.backgroundColor = '#ffffff'; 
            // スタート画像設定
            var startImage = new Sprite(256, 159); 
            startImage.image = game.assets['./img/all.png'];
            startImage.x = 24; 
            startImage.y = 64;   
            scene.addChild(startImage); 

            var logo = new Sprite(256, 37); 
            logo.image = game.assets['./img/logo.png'];
            logo.x = 24; 
            logo.y = 224;   
            scene.addChild(logo); 
            // タイトルラベル設定
            var title = new Label('マスコットすまっしゅ！');
            title.color = '#494949'; 
            title.textAlign = 'center';
            title.width = SCREEN_WIDTH;
            title.x = 0; 
            title.y = 24;     
            title.font = '24px sans-serif';    
            scene.addChild(title);    
            // メニュー
            // グループ用オブジェクト
            var startGroup = new Group();
            var specialThanksGroup = new Group();
            var  start = new Label('はじめる');  
             start.textAlign = 'center';         
             start.width = SCREEN_WIDTH;
             start.x = 0;              
             start.y = 320;           
             start.font = '28px sans-serif';     
            var startButton = new ButtonImage(SCREEN_WIDTH/2, 320);
            startGroup.addChild(startButton);
            startGroup.addChild(start);
            scene.addChild(startGroup);

            var specialThanks = new Label('すぺしゃる さんくす');  
            specialThanks.textAlign = 'center';
            specialThanks.width = SCREEN_WIDTH;
            specialThanks.x = 0;              
            specialThanks.y = 406;           
            specialThanks.font = '20px sans-serif';
            var specialThanksButton = new ButtonImage(SCREEN_WIDTH/2, 400);
            specialThanksGroup.addChild(specialThanksButton);
            specialThanksGroup.addChild(specialThanks);
            scene.addChild(specialThanksGroup);

            
            // ボタンを押したらシーンを切り替える
            startGroup.addEventListener('touchstart', function(e) {
                scene.removeChild(startImage);
                scene.removeChild(logo);
                game.replaceScene(createRuleScene());    
            });
            specialThanksGroup.addEventListener('touchstart', function(e) {
                scene.removeChild(startImage);
                scene.removeChild(logo);          
                game.replaceScene(createLicenseScene());    
            });

            // タイトルシーンを返します。
            return scene;
        };

        /**
        * ライセンスシーン
        */
        var createLicenseScene = function() {
            var scene = new Scene(); 
            scene.backgroundColor = 'rgba(0, 0, 0, 0)'; 
            var license = new Entity();
            license._element = document.createElement('div');
            license.width = 320;
            license.height = 480; 
            license._element.innerHTML = '<div style="font-size:8pt;"><h1>お借りしたキャラクター</h1><p>プロ生ちゃん（暮井 慧）</br>© 2011 プログラミング生放送</p><p>あんずちゃん（美雲あんず）</br>©GMO Internet, Inc.   ※再使用は禁止です</p><p>美雲このは</br>©GMO Internet, Inc.  ※再使用は禁止です</p><p>クラウディア・窓辺 (Claudia Madobe)</br>© 2011 Microsoft Corporation All Rights Reserved.</p><p>ユニティちゃん（大鳥こはく）</p><img src="http://unity-chan.com/images/imageLicenseLogo.png"  width="30" height="30" alt="ユニティちゃんライセンス"><p>このコンテンツは、『ユニティちゃんライセンス』で提供されています</p><p>クエリ・ラブクラフト（クエリちゃん）</p><p>ハッカドール１号</p></div>';
            scene.addChild(license);
            scene.addEventListener('touchstart', function(e) {
                game.replaceScene(createStartScene());    
            });
            return scene;
        };

        /**
        * ルール説明シーン
        */
        var createRuleScene = function() {
             var scene = new Scene(); 
            scene.backgroundColor = 'rgba(0, 0, 0, 0)'; 
            var rule = new Entity();
            rule._element = document.createElement('div');
            rule.width = 320;
            rule.height = 480; 
            rule._element.innerHTML = '<h1>  ルール説明 </h1><p>  流れてくるマスコットをクリックしますっ！  </p><p>  右のキャラほど得点が多くもらえちゃいますっ！  </p>';
            scene.addChild(rule);
            scene.addEventListener('touchstart', function(e) {
                game.replaceScene(createGameScene());    
            });
            // キャラの初期表示
            for(var i = 0; i < 6; i++){
                var mascot = new Chara(i * 35, 48, i);
                mascot.scaleX = 0.6; 
                mascot.scaleY = 0.6;
                scene.addChild(mascot);
            }


            // ハッカドールちゃん
            var sprite = new Sprite(256, 256);
            sprite.x = 36 ;
            sprite.y = SCREEN_HEIGHT - 256;
       
            sprite.image = game.assets['./img/hacka_chan.png'];
            scene.addChild(sprite);
            // アニメ
            sprite.addEventListener('enterframe', function() {            
                sprite.frame = [0, 2, 1, 2, 3, 2][Math.floor(sprite.age/12) % 6] + 10;
            });   

            var label = new Label('画面をタッチ!');
            label.font = '24px sans-serif';  
            label.x = 0; 
            label.y = 420; 
            scene.addChild(label); 

            return scene;
        };
        /**
        * ゲームシーン
        */
        var createGameScene = function() {
            var scene = new Scene();  
            scene.backgroundColor = '#ffffff';
          
            var time =  LIMIT_TIME;
            combo = 0;
            game.score = 0;
            // 得点欄を作成
            var label = new Label(''); 
            label.font = '24px sans-serif'; 
            scene.addChild(label);  
            // 残り時間欄を作成
            var timeLimit = new Label('残り時間:' + time); 
            timeLimit.font = '24px sans-serif';  
            timeLimit.x = 0;       
            timeLimit.y = 28;    
            scene.addChild(timeLimit); 
            
            // ハッカドールちゃん
            var sprite = new Sprite(256, 256);
            sprite.x = 36 ;
            sprite.y = 120;
       
            sprite.image = game.assets['./img/hacka_chan.png'];
            scene.addChild(sprite);

            // キャラの初期表示
            for(var i = 0; i < 6; i++){
                var mascot = new TargetChara();
                scene.addChild(mascot);
            }

            scene.addEventListener('enterframe', function(){

                // 残り時間の表示を更新
                if(this.age % game.fps == 0){
                    time --; 
                    timeLimit.text = 'タイム:' + time; 
                    // 時間切れ
                    if (time <= 0) {
                        game.replaceScene(createGameoverScene());
                    }
                }
                // キャラクター生成
                if(this.age % 6 == 0){
                    var mascot = new TargetChara();
                    scene.addChild(mascot);
                    label.text = 'スコア: ' + game.score + '点';
                }

                // ハッカドールちゃんアニメ
                sprite.frame = [0, 1, 2, 3, 2, 1][Math.floor(sprite.age/8) % 6];
            })


            // ゲームシーンを返す
            return scene;
        };


        /**
        * ゲームオーバーシーン
        */
        var createGameoverScene = function() {
            var scene = new Scene(); 
            scene.backgroundColor = 'rgba(0, 0, 0)';  

            // スコアラベル設定
            var comboCount = new Label(combo + 'HIT!');
            comboCount.textAlign = 'center';
            comboCount.x = 0;
            comboCount.y = 20;
            comboCount.font = '24px sans-serif';
            comboCount.color = '#f00'
            scene.addChild(comboCount);
            var label = new Label(game.score + '点獲得ですよっ！');    
            label.textAlign = 'center';     
            label.color = '#272727';           
            label.x = 0;      
            label.y = 60;     
            label.font = '20px sans-serif';  
            scene.addChild(label);    
            
            // リトライラベル(ボタン)設定
            var retryGroup = new Group();
            var retryLabel = new Label('もういちど'); 
            retryLabel.textAlign = 'center';
            retryLabel.color = '#000';    
            retryLabel.x = 12;   
            retryLabel.y = 400;    
            retryLabel.font = '20px sans-serif';  
            var retryButton = new ButtonImage(SCREEN_WIDTH/2, 400);
            retryGroup.addChild(retryButton); 
            retryGroup.addChild(retryLabel); 
            scene.addChild(retryGroup); 
            retryGroup.addEventListener('touchstart', function(e) {
                game.replaceScene(createStartScene());  
            });
        
            // ハッカドールちゃん
            var sprite = new Sprite(256, 256);
            sprite.x = 36 ;
            sprite.y = 120;
       
            sprite.image = game.assets['./img/hacka_chan.png'];
            scene.addChild(sprite);
            // アニメ
            sprite.addEventListener('enterframe', function() {            
                sprite.frame = [0, 1, 2, 3, 4, 3, 2, 1][Math.floor(sprite.age/4) % 8] + 5;
            });    


            return scene;
        };
        game.replaceScene(createStartScene()); 
    }
    game.start(); 
};

// 引数を上限としてランダムな整数値を返す
function rand(num){ return Math.round(Math.random() * num) };

// +1 か -1 のどちらかを返す
function plusOrMinus(){return rand(1) * 2 - 1};
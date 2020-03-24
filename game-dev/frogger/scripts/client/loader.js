let FroggerGame = {
    input: {},
    screens: {},
    components: {},
    utilities: {},
    renderer: {},
    assets: {},
    constants: {},
    objects: {}
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
FroggerGame.loader = (function () {
    'use strict';
    const utilitiesPath = "./utilities/"
    const inputPath = utilitiesPath + "input/"
    const objectsPath = "./objects/"
    const drawPath = "./draw/"
    const particlePath = drawPath + "particles/"
    const pagesPath = "./pages/"

    let scriptOrder = [
        {
            scripts: [
                utilitiesPath + "constants",
                utilitiesPath + "random",
                utilitiesPath + "htmlAttach",
                inputPath + "inputKeyboard",
                inputPath + "inputMouse",
                utilitiesPath + "storage",
            ],
            message: 'Utilities',
            onComplete: null,
        },
        {
            scripts: [
                drawPath + "drawables",
                drawPath + "graphics",
                particlePath + "circleParticles",
                particlePath + "linearParticles",
            ],
            message: 'Draw',
            onComplete: null,
        },
        {
            scripts: [
                objectsPath + "audio",
                objectsPath + "frog",
                objectsPath + "terrain",
                objectsPath + "cars",
                objectsPath + "turtles",
                objectsPath + "trucks",
                objectsPath + "logs",
                objectsPath + "alligators",
                objectsPath + "bonus"
            ],
            message: 'Objects',
            onComplete: null,
        },
        {
            scripts: [
                pagesPath + "mainMenu",
                pagesPath + "gamePlay",
                pagesPath + "highscores",
                pagesPath + "customizeControls",
                pagesPath + "credits",
            ],
            message: 'Utilities',
            onComplete: null,
        },
    ];
    const designPath = "./design/"
    const audioPath = designPath + ""
    const imagesPath = designPath + "images/"

    let assetOrder = [
        {
            key: 'truck0.png',
            source: "./design/images/sprites/trucks/truck0.png"
        },
        {
            key: 'truck1.png',
            source: "./design/images/sprites/trucks/truck1.png"
        },
        {
            key: 'log0.png',
            source: "./design/images/sprites/logs/log0.png"
        },
        {
            key: 'log1.png',
            source: "./design/images/sprites/logs/log1.png"
        },
        {
            key: 'log2.png',
            source: "./design/images/sprites/logs/log2.png"
        },
        {
            key: 'alligators.png',
            source: "./design/images/sprites/alligators.png"
        },
        {
            key: 'cars.png',
            source: "./design/images/sprites/cars.png"
        },
        {
            key: 'dead.png',
            source: "./design/images/sprites/dead.png"
        },
        {
            key: 'fly.png',
            source: "./design/images/sprites/fly.png"
        },
        {
            key: 'frog.png',
            source: "./design/images/sprites/frog.png"
        },
        {
            key: 'lilypad.png',
            source: "./design/images/sprites/lilypad.png"
        },
        {
            key: 'otter.png',
            source: "./design/images/sprites/otter.png"
        },
        {
            key: 'terrain.png',
            source: "./design/images/sprites/terrain.png"
        },
        {
            key: 'turtles.png',
            source: "./design/images/sprites/turtles.png"
        },
        {
            key: 'background.mp3',
            source: "./design/audio/background.mp3"
        },
        {
            key: 'hop.mp3',
            source: "./design/audio/hop.mp3"
        },
        {
            key: 'plunk.mp3',
            source: "./design/audio/plunk.mp3"
        },
        {
            key: 'squish.mp3',
            source: "./design/audio/squish.mp3"
        },
    ];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function () {
                // console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/url/asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        let entry = 0;
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            entry = assets[0];
            loadAsset(entry.source,
                function (asset) {
                    onSuccess(entry, asset);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function (error) {
                    onError(error);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let asset = null;
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = 'blob';

            xhr.onload = function () {
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    asset.onload = function () {
                        window.URL.revokeObjectURL(asset.src);
                    };
                    asset.src = window.URL.createObjectURL(xhr.response);
                    if (onSuccess) { onSuccess(asset); }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }

        xhr.send();
    }

    function mainComplete() {
        const showScreen = FroggerGame.game.showScreen
        FroggerGame.utilities.htmlAttach.initialize(showScreen)
        // showScreen(FroggerGame.constants.pages.mainMenu)
        showScreen('main-menu')
    }

    loadAssets(assetOrder,
        function (source, asset) {    // Store it on success
            FroggerGame.assets[source.key] = asset;
        },
        function (error) {
            console.log(error);
        },
        function () {
            loadScripts(scriptOrder, mainComplete);
        }
    );
}());

FroggerGame.game = (function (screens) {
    FroggerGame.isPlaying = false

    function showScreen(id) {
        const active = document.getElementsByClassName(pages.active)
        for (let screen = 0; screen < active.length; screen++) {
            active[screen].classList.remove(pages.active)
        }
        screens[id].run()
        document.getElementById(id).classList.add(pages.active)
    }

    function initialize() {
        let screen = null
        // Go through each of the screens and tell them to initialize
        for (screen in screens) {
            if (screens.hasOwnProperty(screen)) {
                screens[screen].initialize()
            }
        }
    }

    return {
        initialize: initialize,
        showScreen: showScreen
    }
}(FroggerGame.screens))

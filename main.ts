controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
/** 👑 THE ALCHEMIST: GHOST PHASE EDITION 👑 */
//  --- 1. CLASES ---
class ItemJuego {
    nombre: string
    imagen: Image
    tipo: string
    recogido: boolean
    sprite_fisico: Sprite
    constructor(nombre: string, imagen: Image, tipo: string) {
        this.nombre = nombre
        this.imagen = imagen
        this.tipo = tipo
        //  "mision" o "curacion"
        this.recogido = false
        this.sprite_fisico = null
    }
    
}

//  --- 2. CONFIGURACIÓN ---
let items : ItemJuego[] = []
let enemigos : Sprite[] = []
let jugador : Sprite = null
let rey_npc : Sprite = null
let energia = 100.0
let juego_activo = false
let mision_iniciada = false
let nivel_actual = 1
//  Tipos de Sprite
let KIND_ITEM = SpriteKind.create()
let KIND_META = SpriteKind.create()
let KIND_ENEMIGO = SpriteKind.Enemy
let KIND_NPC = SpriteKind.create()
let KIND_SALIDA_SECRETA = SpriteKind.create()
//  Nueva trampilla
//  --- 3. ARTE PIXEL ---
let img_hero = img`
    . . . . 2 2 2 2 . . . .
    . . . 2 2 2 2 2 2 . . .
    . . 2 2 2 2 2 2 2 2 . .
    . . 2 2 8 8 8 8 2 2 . .
    . . 2 8 8 8 8 8 8 2 . .
    . . 8 8 f f f f 8 8 . .
    . . 8 f f 2 2 f f 8 . .
    . . 8 f f f f f f 8 . .
    . . 8 8 8 8 8 8 8 8 . .
    . . f 8 8 8 8 8 8 f . .
    . . f 8 5 5 5 5 8 f . .
    . . . 8 5 5 5 5 8 . . .
    . . . f f . . f f . . .
    . . . . . . . . . . . .
`
let img_rey = img`
    . . . . 5 5 5 5 . . . .
    . . . 5 5 4 4 5 5 . . .
    . . 5 5 4 5 5 4 5 5 . .
    . . 5 5 4 4 4 4 5 5 . .
    . . . f f f f f f . . .
    . . . f f 2 2 f f . . .
    . . . f f f f f f . . .
    . . . 5 5 5 5 5 5 . . .
    . . . 5 4 5 5 4 5 . . .
    . . . 5 5 5 5 5 5 . . .
    . . . 5 5 5 5 5 5 . . .
    . . . 5 5 . . 5 5 . . .
    . . . . . . . . . . . .
    . . . . . . . . . . . .
`
let img_fantasma = img`
    . . . . . . . . . . . .
    . . . . 1 1 1 1 . . . .
    . . . 1 1 1 1 1 1 . . .
    . . 1 1 1 1 1 1 1 1 . .
    . . 1 1 f 1 1 f 1 1 . .
    . . 1 1 1 1 1 1 1 1 . .
    . . 1 1 1 1 1 1 1 1 . .
    . . 1 1 1 1 1 1 1 1 . .
    . . 1 1 1 1 1 1 1 1 . .
    . . 1 . 1 . 1 . 1 . . .
    . . . . . . . . . . . .
`
let img_gema = img`
    . . . . . . . . . . . .
    . . . . . 2 2 . . . . .
    . . . . 2 4 4 2 . . . .
    . . . 2 4 2 2 4 2 . . .
    . . . 2 4 2 2 4 2 . . .
    . . . 2 4 4 4 4 2 . . .
    . . . . 2 4 4 2 . . . .
    . . . . . 2 2 . . . . .
    . . . . . . . . . . . .
`
let img_planta = img`
    . . . . . . . . . . . .
    . . . . . . 7 . . . . .
    . . . . . 7 7 . . . . .
    . . . 7 . 7 7 . 7 . . .
    . . . 7 7 7 7 7 7 . . .
    . . . . 7 7 7 7 . . . .
    . . . . 7 7 7 7 . . . .
    . . . . . 7 7 . . . . .
    . . . . . . . . . . . .
`
let img_libro = img`
    . . . . . . . . . . . .
    . . . b b b b . . . . .
    . . b 1 1 1 1 b . . . .
    . b 1 1 1 1 1 1 b . . .
    . b c c c c c c b . . .
    . b c c c c c c b . . .
    . b c c c c c c b . . .
    . b 1 1 1 1 1 1 b . . .
    . . b b b b b b . . . .
`
let img_salud = img`
    . . . . . . . . . . . .
    . . . . . 1 1 . . . . .
    . . . . . 1 1 . . . . .
    . . . . 1 1 1 1 . . . .
    . . . 1 2 2 2 2 1 . . .
    . . . 1 2 2 2 2 1 . . .
    . . 1 2 2 2 2 2 2 1 . .
    . . 1 2 f f f 2 2 1 . .
    . . 1 2 2 2 2 2 2 1 . .
    . . . 1 2 2 2 2 1 . . .
    . . . . 1 1 1 1 . . . .
`
let img_caldero = img`
    . . . . . . . . . . . .
    . . . b b . . b b . . .
    . . b 1 1 b b 1 1 b . .
    . b 1 1 1 1 1 1 1 1 b .
    . b 1 2 2 5 5 2 2 1 b .
    . b 1 2 5 5 5 5 2 1 b .
    . b b 2 5 5 5 5 2 b b .
    . . b 2 2 5 5 2 2 b . .
    . . . b b b b b b . . .
    . . . d . . . . d . . .
    . . d . . . . . . d . .
`
let img_trampilla = img`
    . . . b b b b b b . . .
    . . b c c c c c c b . .
    . b c 1 1 1 1 1 1 c b .
    . b c 1 f f f f 1 c b .
    . b c 1 f 1 1 f 1 c b .
    . b c 1 f 1 1 f 1 c b .
    . b c 1 f 1 1 f 1 c b .
    . b c 1 f f f f 1 c b .
    . b c 1 1 1 1 1 1 c b .
    . . b c c c c c c b . .
    . . . b b b b b b . . .
`
let img_suelo = img`
    c c b c c c b c c c b c c c b c
    c c b c c c b c c c b c c c b c
    b b b b b b b b b b b b b b b b
    c b c c c b c c c b c c c b c c
    c b c c c b c c c b c c c b c c
    b b b b b b b b b b b b b b b b
    c c c b c c c b c c c b c c c b
    c c c b c c c b c c c b c c c b
    b b b b b b b b b b b b b b b b
    c c b c c c b c c c b c c c b c
    c c b c c c b c c c b c c c b c
    b b b b b b b b b b b b b b b b
    c b c c c b c c c b c c c b c c
    c b c c c b c c c b c c c b c c
    b b b b b b b b b b b b b b b b
    c c c b c c c b c c c b c c c b
`
let img_pared = img`
    b b b b b b b b b b b b b b b b
    b d d d d d d d d d d d d d d b
    b d c c c c c c c c c c c c d b
    b d c b b b c b b b c b b b c b
    b d c b b b c b b b c b b b c b
    b d c c c c c c c c c c c c c b
    b d c b b b c b b b c b b b c b
    b d c c c c c c c c c c c c c b
    b d c c c c c c c c c c c c c b
    b d c b b b c b b b c b b b c b
    b d c b b b c b b b c b b b c b
    b d c c c c c c c c c c c c c b
    b d c b b b c b b b c b b b c b
    b d c b b b c b b b c b b b c b
    b d d d d d d d d d d d d d d b
    b b b b b b b b b b b b b b b b
`
//  --- 4. MAPA Y ENTIDADES ---
function generar_mundo() {
    let fila: string;
    let char: string;
    let loc: tiles.Location;
    let caldero: Sprite;
    let trampilla: Sprite;
    
    //  LIMPIEZA TOTAL
    for (let muro of tiles.getTilesByType(img_pared)) {
        tiles.setTileAt(muro, img_suelo)
        tiles.setWallAt(muro, false)
    }
    sprites.destroyAllSpritesOfKind(KIND_ENEMIGO)
    sprites.destroyAllSpritesOfKind(KIND_META)
    sprites.destroyAllSpritesOfKind(KIND_NPC)
    sprites.destroyAllSpritesOfKind(KIND_SALIDA_SECRETA)
    for (let item of items) {
        if (item.sprite_fisico) {
            item.sprite_fisico.destroy()
        }
        
    }
    scene.setBackgroundColor(13)
    tiles.setCurrentTilemap(tilemap`level1`)
    //  --- DISEÑO DE NIVELES CON MECÁNICA DE FASEO ---
    //  Los items (1, 2, 3) están rodeados de 'W'.
    //  Hay una 'T' (Trampilla) junto al item para poder salir.
    //  Los enemigos 'E' están fuera para empujarte dentro.
    //  NIVEL 1
    let mapa_1 = ["WWWWWWWWWWWWWWWWWWWW", "W.S..N.............W", "W.WWWWWWW.WW.WWW.W.W", "W.W.....W.WW.W...W.W", "W.W.E...W.WW.WWWWW.W", "W.WWWWWWW.WW.W1TWW.W", "W.........E..WWWWW.W", "WWWWWWWW.....WWWWWWW", "W..................W", "W.WWWWWWW...WWWWWW.W", "W.W.....W...W....W.W", "W.W.........W..C.W.W", "W.WWWWWWWW.WWWWWWW.W", "W..................W", "WWWWWWWWWWWWWWWWWWWW"]
    //  <--- SALA CERRADA
    //  NIVEL 2
    let mapa_2 = ["WWWWWWWWWWWWWWWWWWWW", "WS.......W...E.....W", "WWWWWW.W.W.WWWWWWW.W", "W......W.W.......W.W", "W.WWWWWW.WWWWWWW.W.W", "W.W...E..........W.W", "W.W.WWWWWWWWWWWW.W.W", "W.W.W......P...W.W.W", "W.W.W.WWWWWWWW.W.W.W", "W.W.W.WWWWWWWW.W.W.W", "W.W.W.WW2TWWWW.W.W.W", "W.W.W.WWWWWWWW.W.W.W", "W...W.....E....W.C.W", "WWWWWWWWWWWWWWWWWWWW", "WWWWWWWWWWWWWWWWWWWW"]
    //  <--- SALA CERRADA
    //  NIVEL 3
    let mapa_3 = ["WWWWWWWWWWWWWWWWWWWW", "WS..W...E..W.....E.W", "WWW.W.WWWW.W.WWWWW.W", "W...W.W..W.W.W...W.W", "W.WWW.W..W.W.W.W.W.W", "W.....W..W...W.W.W.W", "WWWWWWW.WWWWWW.W.W.W", "W...E........W.W.W.W", "W.WWWWWWWWWW.W.W.W.W", "W.W........W.W.W.W.W", "W.W.WWWWWW.W.W.W.W.W", "W.W.WW3TWW.W...W.C.W", "W.W.WWWWWWWWWWWWWW.W", "W.P...E............W", "WWWWWWWWWWWWWWWWWWWW"]
    //  <--- SALA CERRADA
    let mapa_elegido = mapa_1
    if (nivel_actual == 2) {
        mapa_elegido = mapa_2
    } else if (nivel_actual == 3) {
        mapa_elegido = mapa_3
    }
    
    let filas = mapa_elegido.length
    let cols = mapa_elegido[0].length
    for (let r = 0; r < filas; r++) {
        fila = mapa_elegido[r]
        for (let c = 0; c < cols; c++) {
            char = fila[c]
            loc = tiles.getTileLocation(c, r)
            tiles.setTileAt(loc, img_suelo)
            if (char == "W") {
                tiles.setTileAt(loc, img_pared)
                tiles.setWallAt(loc, true)
            } else if (char == "C") {
                caldero = sprites.create(img_caldero, KIND_META)
                tiles.placeOnTile(caldero, loc)
                caldero.startEffect(effects.fountain, 50000)
            } else if (char == "S") {
                if (jugador) {
                    tiles.placeOnTile(jugador, loc)
                }
                
            } else if (char == "N") {
                if (nivel_actual == 1) {
                    crear_rey(loc)
                }
                
            } else if (char == "E") {
                crear_enemigo(loc)
            } else if (char == "T") {
                //  La Salida Secreta
                trampilla = sprites.create(img_trampilla, KIND_SALIDA_SECRETA)
                tiles.placeOnTile(trampilla, loc)
            } else if (char == "P") {
                crear_item("Pocion Salud", img_salud, loc, "curacion")
            } else if (char == "1" && nivel_actual == 1) {
                //  Objetos de misión
                crear_item("Gema Magica", img_gema, loc, "mision")
            } else if (char == "2" && nivel_actual == 2) {
                crear_item("Hierba Santa", img_planta, loc, "mision")
            } else if (char == "3" && nivel_actual == 3) {
                crear_item("Libro Antiguo", img_libro, loc, "mision")
            }
            
        }
    }
    game.splash("NIVEL " + ("" + nivel_actual))
}

function crear_rey(loc: tiles.Location) {
    
    rey_npc = sprites.create(img_rey, KIND_NPC)
    tiles.placeOnTile(rey_npc, loc)
    rey_npc.startEffect(effects.smiles, 50000)
}

function crear_enemigo(loc: tiles.Location) {
    let ene = sprites.create(img_fantasma, KIND_ENEMIGO)
    tiles.placeOnTile(ene, loc)
    ene.follow(jugador, 35)
    //  MECÁNICA CLAVE: El fantasma atraviesa paredes para poder empujarte
    ene.setFlag(SpriteFlag.GhostThroughWalls, true)
}

function crear_item(nombre: string, img_obj: Image, loc: tiles.Location, tipo: string) {
    let spr: Sprite;
    let nuevo_item: ItemJuego;
    if (tipo == "curacion") {
        spr = sprites.create(img_obj, KIND_ITEM)
        tiles.placeOnTile(spr, loc)
        nuevo_item = new ItemJuego(nombre, img_obj, tipo)
        nuevo_item.sprite_fisico = spr
        items.push(nuevo_item)
        return
    }
    
    nuevo_item = new ItemJuego(nombre, img_obj, tipo)
    items.push(nuevo_item)
    if (settings.readNumber("got_" + nombre) == 1) {
        nuevo_item.recogido = true
    } else {
        spr = sprites.create(img_obj, KIND_ITEM)
        tiles.placeOnTile(spr, loc)
        spr.startEffect(effects.halo, 50000)
        nuevo_item.sprite_fisico = spr
    }
    
}

function setup_hero() {
    
    //  Corrección para evitar duplicados
    if (jugador) {
        jugador.destroy()
    }
    
    jugador = sprites.create(img_hero, SpriteKind.Player)
    controller.moveSprite(jugador, 80, 80)
    scene.cameraFollowSprite(jugador)
    jugador.setStayInScreen(true)
}

//  --- 5. LÓGICA DEL JUEGO ---
game.onUpdate(function bucle_principal() {
    
    if (!juego_activo) {
        return
    }
    
    let velocidad = 80
    let gasto = 0.05
    if (controller.A.isPressed()) {
        velocidad = 120
        gasto = 0.2
        jugador.startEffect(effects.trail, 100)
    }
    
    controller.moveSprite(jugador, velocidad, velocidad)
    if (controller.left.isPressed() || controller.right.isPressed() || controller.up.isPressed() || controller.down.isPressed()) {
        energia -= gasto
    }
    
    info.setScore(Math.trunc(energia))
    if (energia <= 0) {
        game.over(false, effects.melt)
    }
    
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
//  INTERACCIÓN NPC
sprites.onOverlap(SpriteKind.Player, KIND_NPC, function on_npc_overlap(player: Sprite, npc: Sprite) {
    
    if (!mision_iniciada) {
        game.showLongText(`REY: ¡Alquimista!
Los objetos estan ocultos tras los muros.`, DialogLayout.Bottom)
        game.showLongText(`REY: Deja que los espectros te golpeen para traspasar la pared.
Usa las trampillas para salir.`, DialogLayout.Bottom)
        mision_iniciada = true
        player.y += 16
    }
    
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    500,
    false
    )
//  INTERACCIÓN ITEMS
sprites.onOverlap(SpriteKind.Player, KIND_ITEM, function on_item_overlap(player: Sprite, other: Sprite) {
    
    for (let it of items) {
        if (it.sprite_fisico == other) {
            if (it.tipo == "curacion") {
                energia = Math.min(100, energia + 30)
                other.destroy(effects.hearts, 500)
                music.powerUp.play()
                player.say("Recuperado!", 500)
                it.recogido = true
                break
            }
            
            if (it.tipo == "mision") {
                it.recogido = true
                other.destroy(effects.confetti, 500)
                music.magicWand.play()
                energia = Math.min(100, energia + 10)
                game.showLongText("¡Conseguido!\n" + it.nombre, DialogLayout.Bottom)
                settings.writeNumber("got_" + it.nombre, 1)
                break
            }
            
        }
        
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
//  INTERACCIÓN ENEMIGOS (MECÁNICA DE FASEO)
sprites.onOverlap(SpriteKind.Player, KIND_ENEMIGO, function on_enemy_overlap(player: Sprite, enemy: Sprite) {
    
    energia -= 5
    scene.cameraShake(4, 200)
    music.zapped.play()
    //  EMPUJE (FASEO): Esto permite atravesar muros si estás pegado a ellos
    if (player.x < enemy.x) {
        player.x -= 16
    } else {
        player.x += 16
    }
    
    player.say("¡Pasando!", 200)
})
//  INTERACCIÓN CALDERO (CAMBIO DE NIVEL)
sprites.onOverlap(SpriteKind.Player, KIND_META, function on_meta_overlap(player: Sprite, meta: Sprite) {
    
    let item_necesario = ""
    if (nivel_actual == 1) {
        item_necesario = "Gema Magica"
    } else if (nivel_actual == 2) {
        item_necesario = "Hierba Santa"
    } else if (nivel_actual == 3) {
        item_necesario = "Libro Antiguo"
    }
    
    let tiene_item = false
    for (let i of items) {
        if (i.nombre == item_necesario && i.recogido) {
            tiene_item = true
            break
        }
        
    }
    if (tiene_item) {
        music.baDing.play()
        if (nivel_actual < 3) {
            game.showLongText("El caldero te transporta...", DialogLayout.Bottom)
            nivel_actual += 1
            player.startEffect(effects.halo, 1000)
            pause(1000)
            generar_mundo()
        } else {
            game.over(true, effects.starField)
        }
        
    } else {
        player.y += 10
        scene.cameraShake(2, 200)
        player.say("Necesito: " + item_necesario, 2000)
    }
    
})
//  INTERACCIÓN SALIDA SECRETA (TRAMPILLA)
sprites.onOverlap(SpriteKind.Player, KIND_SALIDA_SECRETA, function on_salida_overlap(player: Sprite, salida: Sprite) {
    music.jumpUp.play()
    player.startEffect(effects.spray, 500)
    player.say("¡Escape!", 500)
    //  Teletransportar a lugar seguro (ej. 32, 32)
    player.setPosition(32, 32)
})
//  --- 6. MENÚS Y ARRANQUE ---
function inicio() {
    
    game.splash("THE ALCHEMIST", "Ghost Edition")
    let opcion = game.askForNumber(`1. Jugar
2. Borrar Progreso`, 1)
    if (opcion == 2) {
        settings.writeNumber("got_Gema Magica", 0)
        settings.writeNumber("got_Hierba Santa", 0)
        settings.writeNumber("got_Libro Antiguo", 0)
        game.splash("Memoria borrada")
    }
    
    setup_hero()
    controller.B.onEvent(ControllerButtonEvent.Pressed, function mostrar_inventari() {
        let estado: any;
        let texto = "MOCHILA:\n"
        for (let i of items) {
            if (i.tipo == "mision") {
                estado = i.recogido ? "[X] " : "[ ] "
                texto += estado + i.nombre + "\n"
            }
            
        }
        game.showLongText(texto, DialogLayout.Full)
    })
    items = []
    nivel_actual = 1
    energia = 999.0
    generar_mundo()
    juego_activo = true
    game.showLongText(`CONTROLES:
A = Correr
B = Inventario`, DialogLayout.Full)
}

inicio()

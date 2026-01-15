/** 👑 THE ALCHEMIST👑 */
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
//  Tipos de Sprite
let KIND_ITEM = SpriteKind.create()
let KIND_META = SpriteKind.create()
let KIND_ENEMIGO = SpriteKind.Enemy
let KIND_NPC = SpriteKind.create()
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
    scene.setBackgroundColor(13)
    //  IMPORTANTE: Configurar mapa en el editor a 20x15
    tiles.setCurrentTilemap(tilemap`level1`)
    //  N = NPC, S = Start, P = Pocion
    let nivel = ["WWWWWWWWWWWWWWWWWWWW", "W.S..N.............W", "W.WWWWWWW.WW.WWWWW.W", "W.W.....W.WW.W...W.W", "W.W.1...W.WW.W.2.W.W", "W.WWWWWWW.WW.WWWWW.W", "W.........E........W", "WWWWWWWW.....WWWWWWW", "W......E...........W", "W.WWWWWWW...WWWWWW.W", "W.W.....W...W....W.W", "W.W.3.......W..C.W.W", "W.WWWWWWWW.WWWWWWW.W", "W.........P........W", "WWWWWWWWWWWWWWWWWWWW"]
    let filas = nivel.length
    let cols = nivel[0].length
    for (let r = 0; r < filas; r++) {
        fila = nivel[r]
        for (let c = 0; c < cols; c++) {
            char = fila[c]
            loc = tiles.getTileLocation(c, r)
            //  1. Suelo
            tiles.setTileAt(loc, img_suelo)
            //  2. Elementos
            if (char == "W") {
                tiles.setTileAt(loc, img_pared)
                tiles.setWallAt(loc, true)
            } else if (char == "C") {
                caldero = sprites.create(img_caldero, KIND_META)
                tiles.placeOnTile(caldero, loc)
                caldero.startEffect(effects.fountain, 50000)
            } else if (char == "S") {
                tiles.placeOnTile(jugador, loc)
            } else if (char == "N") {
                crear_rey(loc)
            } else if (char == "E") {
                crear_enemigo(loc)
            } else if (char == "P") {
                crear_item("Pocion Salud", img_salud, loc, "curacion")
            } else if (char == "1") {
                crear_item("Gema Magica", img_gema, loc, "mision")
            } else if (char == "2") {
                crear_item("Hierba Santa", img_planta, loc, "mision")
            } else if (char == "3") {
                crear_item("Libro Antiguo", img_libro, loc, "mision")
            }
            
        }
    }
}

function crear_rey(loc: tiles.Location) {
    
    rey_npc = sprites.create(img_rey, KIND_NPC)
    tiles.placeOnTile(rey_npc, loc)
    rey_npc.startEffect(effects.smiles, 50000)
}

function crear_enemigo(loc: tiles.Location) {
    let ene = sprites.create(img_fantasma, KIND_ENEMIGO)
    tiles.placeOnTile(ene, loc)
    ene.follow(jugador, 25)
}

function crear_item(nombre: string, img_obj: Image, loc: tiles.Location, tipo: string) {
    let spr: Sprite;
    let nuevo_item: ItemJuego;
    //  Items de curación no se guardan
    if (tipo == "curacion") {
        spr = sprites.create(img_obj, KIND_ITEM)
        tiles.placeOnTile(spr, loc)
        nuevo_item = new ItemJuego(nombre, img_obj, tipo)
        nuevo_item.sprite_fisico = spr
        items.push(nuevo_item)
        return
    }
    
    //  Items de misión
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
    //  SPRINT (Correr)
    if (controller.A.isPressed()) {
        velocidad = 120
        gasto = 0.2
        jugador.startEffect(effects.trail, 100)
    }
    
    controller.moveSprite(jugador, velocidad, velocidad)
    //  Gasto de energía
    if (controller.left.isPressed() || controller.right.isPressed() || controller.up.isPressed() || controller.down.isPressed()) {
        energia -= gasto
    }
    
    //  HUD (Sin cambiar color para evitar errores)
    info.setScore(Math.trunc(energia))
    if (energia <= 0) {
        game.over(false, effects.melt)
    }
    
})
//  INTERACCIÓN NPC
sprites.onOverlap(SpriteKind.Player, KIND_NPC, function on_npc_overlap(player: Sprite, npc: Sprite) {
    
    if (!mision_iniciada) {
        game.showLongText(`REY: ¡Alquimista!
Una plaga destruye mi reino.
Encuentra los 3 objetos sagrados y llevalos al caldero.`, DialogLayout.Bottom)
        game.showLongText(`REY: Ten cuidado con los fantasmas.
¡Ve y salvanos!`, DialogLayout.Bottom)
        mision_iniciada = true
        player.y += 16
    }
    
})
//  INTERACCIÓN ITEMS
sprites.onOverlap(SpriteKind.Player, KIND_ITEM, function on_item_overlap(player: Sprite, other: Sprite) {
    
    for (let it of items) {
        if (it.sprite_fisico == other) {
            if (it.tipo == "curacion") {
                energia = Math.min(100, energia + 30)
                other.destroy(effects.hearts, 500)
                music.powerUp.play()
                player.say("Recuperado!", 500)
                //  No usamos remove, solo lo marcamos como recogido
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
//  INTERACCIÓN ENEMIGOS
sprites.onOverlap(SpriteKind.Player, KIND_ENEMIGO, function on_enemy_overlap(player: Sprite, enemy: Sprite) {
    
    energia -= 5
    scene.cameraShake(4, 200)
    music.zapped.play()
    if (player.x < enemy.x) {
        player.x -= 16
    } else {
        player.x += 16
    }
    
    player.say("¡Ay!", 500)
})
//  INTERACCIÓN META
sprites.onOverlap(SpriteKind.Player, KIND_META, function on_meta_overlap(player: Sprite, meta: Sprite) {
    let faltan = false
    for (let i of items) {
        if (i.tipo == "mision" && !i.recogido) {
            faltan = true
        }
        
    }
    if (!faltan) {
        music.baDing.play()
        game.over(true, effects.starField)
    } else {
        player.say("Necesito los 3 objetos!", 1000)
        player.y -= 10
    }
    
})
//  --- 6. MENÚS Y ARRANQUE ---
function inicio() {
    
    game.splash("THE ALCHEMIST", "Platinum Edition")
    let opcion = game.askForNumber(`1. Jugar
2. Borrar Progreso`, 1)
    if (opcion == 2) {
        settings.writeNumber("got_Gema Magica", 0)
        settings.writeNumber("got_Hierba Santa", 0)
        settings.writeNumber("got_Libro Antiguo", 0)
        game.splash("Memoria borrada")
    }
    
    setup_hero()
    //  Botón B activa inventario
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
    generar_mundo()
    energia = 100.0
    juego_activo = true
    game.showLongText(`CONTROLES:
A = Correr
B = Inventario

Habla con el REY para empezar.`, DialogLayout.Full)
}

//  ¡ARRANCAR MOTOR!
inicio()

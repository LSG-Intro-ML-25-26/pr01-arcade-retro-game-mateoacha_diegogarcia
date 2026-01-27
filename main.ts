/** 
👑 BLACKOUT: ESPAÑA EDITION 👑
(Torres Blancas + Mapa Abierto + Lore + Sin Decoración Auto)

 */
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
let energia = 999.0
let juego_activo = false
let nivel_actual = 0
//  0 = MAPA, 1,2,3 = NIVELES
let niveles_desbloqueados = 1
//  Variable para controlar la animación
let ultimo_estado_hero = "parado"
//  Tipos de Sprite
let KIND_ITEM = SpriteKind.create()
let KIND_META = SpriteKind.create()
let KIND_ENEMIGO = SpriteKind.Enemy
let KIND_NPC = SpriteKind.create()
let KIND_TORRE = SpriteKind.create()
//  --- 3. ARTE PIXEL ---
//  [HÉROE ANIMADO]
let img_hero = assets.image`hero_quieto`
//  [TORRES BLANCAS]
let img_torre_a = img`
    . . . . . . . . . . . . . . . .
    . . . . 1 1 1 1 1 1 1 1 . . . .
    . . . . 1 c b b b b c 1 . . . .
    . . . . 1 c 1 1 1 1 c 1 . . . .
    . . . . 1 c 1 1 1 1 c 1 . . . .
    . . . . 1 c 1 1 1 1 c 1 . . . .
    . . . . 1 c 1 1 1 1 c 1 . . . .
    . . . . 1 c 1 1 1 1 c 1 . . . .
    . . . . 1 d c c c c d 1 . . . .
    . . . . 1 1 1 1 1 1 1 1 . . . .
    . . . . 1 1 1 d d 1 1 1 . . . .
    . . . . 1 1 1 d d 1 1 1 . . . .
    . . . . 1 1 1 1 1 1 1 1 . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`
let img_torre_b = img`
    . . . . . . . . . . . . . . . .
    . . . . . . 1 1 1 1 . . . . . .
    . . . . . 1 c b b c 1 . . . . .
    . . . . . 1 c 1 1 c 1 . . . . .
    . . 1 1 1 1 c 1 1 c 1 1 1 1 . .
    . . 1 c b b b b b b b b c 1 . .
    . . 1 c 1 1 1 1 1 1 1 1 c 1 . .
    . . 1 c 1 1 1 1 1 1 1 1 c 1 . .
    . . 1 c 1 1 1 1 1 1 1 1 c 1 . .
    . . 1 c 1 1 1 1 1 1 1 1 c 1 . .
    . . 1 c 1 1 1 1 1 1 1 1 c 1 . .
    . . 1 d c c c c c c c c d 1 . .
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
    . . 1 1 1 1 1 d d 1 1 1 1 1 . .
    . . 1 1 1 1 1 d d 1 1 1 1 1 . .
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
`
let img_torre_c = img`
    . . . . . . . 1 1 . . . . . . .
    . . . . . . 1 c c 1 . . . . . .
    . . . . . 1 c b b c 1 . . . . .
    . . . . . 1 c 1 1 c 1 . . . . .
    . . 1 1 1 1 c 1 1 c 1 1 1 1 . .
    . . 1 c b b b b b b b b c 1 . .
    . . 1 c 1 1 1 1 1 1 1 1 c 1 . .
    . . 1 c 1 1 1 1 1 1 1 1 c 1 . .
    . . 1 c 1 1 1 1 1 1 1 1 c 1 . .
    1 1 1 c 1 1 1 1 1 1 1 1 c 1 1 1
    1 c b b b b b b b b b b b b c 1
    1 c 1 1 1 1 1 1 1 1 1 1 1 1 c 1
    1 c 1 1 1 1 1 1 1 1 1 1 1 1 c 1
    1 c 1 1 1 1 1 1 1 1 1 1 1 1 c 1
    1 d c c c c c c c c c c c c d 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 d d 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 d d 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
`
//  [RESTO DE OBJETOS]
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
//  Tile de suelo metálico (sigue disponible para usarse)
let img_suelo_limpio = img`
    b b b b b b b b b b b b b b b b
    b d d d d d d d d d d d d d d b
    b d c c c c c c c c c c c c d b
    b d c 1 c c c c c c c c 1 c d b
    b d c c c c c c c c c c c c d b
    b d c c c 1 c c c c c c c c d b
    b d c c 1 1 1 c c c c c c c d b
    b d c c c 1 c c c c c c c c d b
    b d c c c c c c c c c c c c d b
    b d c c c c c c c c c c c c d b
    b d c c c c c c c c c c c c d b
    b d c c c c c c c c c c c c d b
    b d c 1 c c c c c c c c 1 c d b
    b d c c c c c c c c c c c c d b
    b d d d d d d d d d d d d d d b
    b b b b b b b b b b b b b b b b
`
//  --- 4. MAPA Y ENTIDADES ---
function generar_mundo() {
    let lista_jugador: tiles.Location[];
    let lista_torre_a: tiles.Location[];
    let i: number;
    let loc: tiles.Location;
    let t: Sprite;
    let lista_torre_b: tiles.Location[];
    let lista_torre_c: tiles.Location[];
    let caldero: Sprite;
    
    //  Limpieza
    items = []
    sprites.destroyAllSpritesOfKind(KIND_ENEMIGO)
    sprites.destroyAllSpritesOfKind(KIND_META)
    sprites.destroyAllSpritesOfKind(KIND_ITEM)
    sprites.destroyAllSpritesOfKind(KIND_TORRE)
    scene.setBackgroundColor(13)
    //  --- CASO 0: MAPA GENERAL ---
    if (nivel_actual == 0) {
        tiles.setCurrentTilemap(tilemap`mapa_general`)
        game.splash("MAPA DE ESPAÑA", "Busca la Torre A")
        //  Colocar Jugador
        lista_jugador = tiles.getTilesByType(assets.tile`marcador_jugador`)
        if (lista_jugador.length > 0) {
            tiles.placeOnTile(jugador, lista_jugador[0])
        }
        
        //  Si quieres usar el suelo metálico donde sale el jugador, descomenta esto:
        //  tiles.set_tile_at(lista_jugador[0], img_suelo_limpio)
        //  De lo contrario, se verá lo que hayas pintado en el mapa.
        //  COLOCAR TORRES
        //  Torre A
        lista_torre_a = tiles.getTilesByType(assets.tile`marcador_torre_a`)
        for (i = 0; i < lista_torre_a.length; i++) {
            loc = lista_torre_a[i]
            t = sprites.create(img_torre_a, KIND_TORRE)
            tiles.placeOnTile(t, loc)
            //  Limpiamos el marcador
            tiles.setTileAt(loc, img_suelo_limpio)
        }
        //  Torre B
        lista_torre_b = tiles.getTilesByType(assets.tile`marcador_torre_b`)
        for (i = 0; i < lista_torre_b.length; i++) {
            loc = lista_torre_b[i]
            t = sprites.create(img_torre_b, KIND_TORRE)
            tiles.placeOnTile(t, loc)
            tiles.setTileAt(loc, img_suelo_limpio)
        }
        //  Torre C
        lista_torre_c = tiles.getTilesByType(assets.tile`marcador_torre_c`)
        for (i = 0; i < lista_torre_c.length; i++) {
            loc = lista_torre_c[i]
            t = sprites.create(img_torre_c, KIND_TORRE)
            tiles.placeOnTile(t, loc)
            tiles.setTileAt(loc, img_suelo_limpio)
        }
        return
    }
    
    //  --- CASO NIVELES (1, 2, 3) ---
    if (nivel_actual == 1) {
        tiles.setCurrentTilemap(tilemap`level01`)
        game.splash("TORRE A", "Objetivo: 1 Panel")
    } else if (nivel_actual == 2) {
        tiles.setCurrentTilemap(tilemap`level0`)
        game.splash("TORRE B", "Objetivo: 2 Paneles")
    } else if (nivel_actual == 3) {
        tiles.setCurrentTilemap(tilemap`level03`)
        game.splash("TORRE C", "Objetivo: 3 Paneles")
    }
    
    //  Colocar Jugador
    lista_jugador = tiles.getTilesByType(assets.tile`marcador_jugador`)
    if (lista_jugador.length > 0) {
        tiles.placeOnTile(jugador, lista_jugador[0])
        tiles.setTileAt(lista_jugador[0], img_suelo_limpio)
    }
    
    //  Colocar Enemigos
    let lista_enemigos = tiles.getTilesByType(assets.tile`marcador_enemigo`)
    for (i = 0; i < lista_enemigos.length; i++) {
        loc = lista_enemigos[i]
        crear_enemigo(loc)
        tiles.setTileAt(loc, img_suelo_limpio)
    }
    //  Colocar Meta (Caldero/Centro Control)
    let lista_caldero = tiles.getTilesByType(assets.tile`marcador_caldero`)
    for (i = 0; i < lista_caldero.length; i++) {
        loc = lista_caldero[i]
        caldero = sprites.create(img_caldero, KIND_META)
        tiles.placeOnTile(caldero, loc)
        caldero.startEffect(effects.fountain, 50000)
        tiles.setTileAt(loc, img_suelo_limpio)
    }
    //  Colocar Items
    let lista_gema = tiles.getTilesByType(assets.tile`marcador_item1`)
    for (i = 0; i < lista_gema.length; i++) {
        loc = lista_gema[i]
        crear_item("Panel Torre A", img_gema, loc, "mision")
        tiles.setTileAt(loc, img_suelo_limpio)
    }
    let lista_planta = tiles.getTilesByType(assets.tile`marcador_item2`)
    for (i = 0; i < lista_planta.length; i++) {
        loc = lista_planta[i]
        crear_item("Panel Torre B", img_planta, loc, "mision")
        tiles.setTileAt(loc, img_suelo_limpio)
    }
    let lista_libro = tiles.getTilesByType(assets.tile`marcador_item3`)
    for (i = 0; i < lista_libro.length; i++) {
        loc = lista_libro[i]
        crear_item("Panel Torre C", img_libro, loc, "mision")
        tiles.setTileAt(loc, img_suelo_limpio)
    }
}

function crear_enemigo(loc: tiles.Location) {
    let ene = sprites.create(img_fantasma, KIND_ENEMIGO)
    tiles.placeOnTile(ene, loc)
    ene.follow(jugador, 20)
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
    spr = sprites.create(img_obj, KIND_ITEM)
    tiles.placeOnTile(spr, loc)
    spr.startEffect(effects.halo, 50000)
    nuevo_item.sprite_fisico = spr
}

function setup_hero() {
    
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
    //  --- ANIMACIÓN ---
    let estado_actual = "parado"
    if (controller.left.isPressed()) {
        estado_actual = "izquierda"
        energia -= gasto
    } else if (controller.right.isPressed()) {
        estado_actual = "derecha"
        energia -= gasto
    } else if (controller.up.isPressed()) {
        estado_actual = "arriba"
        energia -= gasto
    } else if (controller.down.isPressed()) {
        estado_actual = "abajo"
        energia -= gasto
    }
    
    if (estado_actual != ultimo_estado_hero) {
        animation.stopAnimation(animation.AnimationTypes.All, jugador)
        if (estado_actual == "izquierda") {
            animation.runImageAnimation(jugador, assets.animation`anim_hero_izquierda`, 100, true)
        } else if (estado_actual == "derecha") {
            animation.runImageAnimation(jugador, assets.animation`anim_hero_derecha`, 100, true)
        } else if (estado_actual == "arriba") {
            animation.runImageAnimation(jugador, assets.animation`anim_hero_arriba`, 100, true)
        } else if (estado_actual == "abajo") {
            animation.runImageAnimation(jugador, assets.animation`anim_hero_abajo`, 100, true)
        } else if (estado_actual == "parado") {
            jugador.setImage(img_hero)
        }
        
        ultimo_estado_hero = estado_actual
    }
    
    info.setScore(Math.trunc(energia))
    if (energia <= 0) {
        game.over(false, effects.melt)
    }
    
})
//  INTERACCIÓN ITEMS
sprites.onOverlap(SpriteKind.Player, KIND_ITEM, function on_item_overlap(player: Sprite, other: Sprite) {
    
    for (let it of items) {
        if (it.sprite_fisico == other) {
            if (it.tipo == "curacion") {
                energia = Math.min(999, energia + 30)
                other.destroy(effects.hearts, 500)
                music.powerUp.play()
                player.say("Recuperado!", 500)
                it.recogido = true
                break
            }
            
            if (it.tipo == "mision") {
                it.recogido = true
                other.destroy()
                music.magicWand.play()
                energia = Math.min(999, energia + 10)
                game.showLongText("¡Conseguido!\n" + it.nombre, DialogLayout.Bottom)
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
    pause(200)
})
//  INTERACCIÓN CON LAS TORRES (ENTRADA A NIVELES)
sprites.onOverlap(SpriteKind.Player, KIND_TORRE, function on_torre_overlap(player: Sprite, torre: Sprite) {
    
    if (torre.image == img_torre_a) {
        nivel_actual = 1
        generar_mundo()
    } else if (torre.image == img_torre_b) {
        if (niveles_desbloqueados >= 2) {
            nivel_actual = 2
            generar_mundo()
        } else {
            player.say("¡Bloqueada! Termina la Torre A", 1000)
            player.y += 16
        }
        
    } else if (torre.image == img_torre_c) {
        if (niveles_desbloqueados >= 3) {
            nivel_actual = 3
            generar_mundo()
        } else {
            player.say("¡Bloqueada! Termina la Torre B", 1000)
            player.y += 16
        }
        
    }
    
})
//  INTERACCIÓN CALDERO (COMPLETAR NIVEL)
sprites.onOverlap(SpriteKind.Player, KIND_META, function on_meta_overlap(player: Sprite, meta: Sprite) {
    let tenemos_este: boolean;
    let texto_falta: string;
    
    let objetivos : string[] = []
    if (nivel_actual == 1) {
        objetivos = ["Panel Torre A"]
    } else if (nivel_actual == 2) {
        objetivos = ["Panel Torre A", "Panel Torre B"]
    } else if (nivel_actual == 3) {
        objetivos = ["Panel Torre A", "Panel Torre B", "Panel Torre C"]
    }
    
    let faltan : string[] = []
    for (let obj_nombre of objetivos) {
        tenemos_este = false
        for (let it of items) {
            if (it.nombre == obj_nombre && it.recogido) {
                tenemos_este = true
                break
            }
            
        }
        if (!tenemos_este) {
            faltan.push(obj_nombre)
        }
        
    }
    if (faltan.length == 0) {
        music.baDing.play()
        if (nivel_actual == 1) {
            game.showLongText(`Torre A reactivada.
Volviendo al mapa...`, DialogLayout.Bottom)
            niveles_desbloqueados = 2
            nivel_actual = 0
            //  Volver al mapa
            generar_mundo()
        } else if (nivel_actual == 2) {
            game.showLongText(`Torre B reactivada.
Volviendo al mapa...`, DialogLayout.Bottom)
            niveles_desbloqueados = 3
            nivel_actual = 0
            //  Volver al mapa
            generar_mundo()
        } else if (nivel_actual == 3) {
            game.over(true, effects.starField)
        }
        
    } else {
        //  FIN DEL JUEGO
        player.y += 10
        scene.cameraShake(2, 200)
        texto_falta = "Faltan:\n"
        for (let f of faltan) {
            texto_falta += "- " + f + "\n"
        }
        game.showLongText(texto_falta, DialogLayout.Bottom)
    }
    
})
//  --- 6. HISTORIA Y MENÚS ---
function introduccion_historia() {
    scene.setBackgroundColor(15)
    game.showLongText(`ESPAÑA SE APAGO
EN UNA SOLA NOCHE.`, DialogLayout.Full)
    game.showLongText(`Las ciudades quedaron
en silencio.
Los cielos, sin luz.`, DialogLayout.Full)
    music.bigCrash.play()
    game.showLongText(`El sistema electrico
nacional colapso.
El tiempo corre...`, DialogLayout.Full)
    game.showLongText(`MISIÓN:
Activar 3 paneles de
luz ocultos en los
sotanos de las torres.`, DialogLayout.Full)
    game.showLongText(`ADVERTENCIA:
Debes activarlos en
orden correcto:
A -> B -> C`, DialogLayout.Full)
    music.beamUp.play()
    game.showLongText(`Si fallas, la
oscuridad sera
irreversible.`, DialogLayout.Full)
    game.showLongText(`El destino de España
esta en tus manos.`, DialogLayout.Full)
}

function inicio() {
    
    game.splash("BLACKOUT", "España Edition")
    introduccion_historia()
    setup_hero()
    controller.B.onEvent(ControllerButtonEvent.Pressed, function mostrar_inventari() {
        let texto = "EQUIPO:\n"
        let encontrados = 0
        for (let i of items) {
            if (i.tipo == "mision" && i.recogido) {
                texto += "[ON] " + i.nombre + "\n"
                encontrados += 1
            }
            
        }
        if (encontrados == 0) {
            texto += "(Sin energia)"
        }
        
        game.showLongText(texto, DialogLayout.Full)
    })
    items = []
    //  EMPEZAMOS EN EL MAPA (Nivel 0)
    nivel_actual = 0
    energia = 999.0
    generar_mundo()
    juego_activo = true
}

inicio()

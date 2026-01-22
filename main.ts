/** 
👑 THE ALCHEMIST: GHOST PHASE EDITION 👑
(Héroe 100% Personalizable + Resto Clásico)

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
let rey_npc : Sprite = null
let energia = 100.0
let juego_activo = false
let mision_iniciada = false
let nivel_actual = 1
//  Variable para controlar la animación
let ultimo_estado_hero = "parado"
//  Tipos de Sprite
let KIND_ITEM = SpriteKind.create()
let KIND_META = SpriteKind.create()
let KIND_ENEMIGO = SpriteKind.Enemy
let KIND_NPC = SpriteKind.create()
//  --- 3. ARTE PIXEL ---
//  [ESTO ES LO QUE PEDISTE]
//  El héroe usa Assets. Haz clic en el paréntesis para elegir tu dibujo "Quieto"
let img_hero = assets.image`hero_quieto`
//  [EL RESTO SIGUE SIENDO CÓDIGO DE TEXTO]
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
//  --- LOS 3 OBJETOS ÚNICOS ---
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
//  Tile de limpieza
let img_suelo_limpio = img`
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
//  --- 4. MAPA Y ENTIDADES ---
function generar_mundo() {
    let i: number;
    let loc: tiles.Location;
    let caldero: Sprite;
    
    //  1. LIMPIEZA
    sprites.destroyAllSpritesOfKind(KIND_ENEMIGO)
    sprites.destroyAllSpritesOfKind(KIND_META)
    sprites.destroyAllSpritesOfKind(KIND_NPC)
    for (let item of items) {
        if (item.sprite_fisico) {
            item.sprite_fisico.destroy()
        }
        
    }
    scene.setBackgroundColor(13)
    //  2. CARGAR TILEMAP VISUAL
    if (nivel_actual == 1) {
        tiles.setCurrentTilemap(tilemap`level1`)
    } else if (nivel_actual == 2) {
        tiles.setCurrentTilemap(tilemap`level2`)
    } else if (nivel_actual == 3) {
        tiles.setCurrentTilemap(tilemap`level3`)
    } else {
        game.over(true)
    }
    
    //  3. COLOCAR OBJETOS BASADO EN MARCADORES
    //  --- A. JUGADOR ---
    let lista_jugador = tiles.getTilesByType(assets.tile`marcador_jugador`)
    if (lista_jugador.length > 0) {
        tiles.placeOnTile(jugador, lista_jugador[0])
        tiles.setTileAt(lista_jugador[0], img_suelo_limpio)
    }
    
    //  --- B. EL REY ---
    let lista_rey = tiles.getTilesByType(assets.tile`marcador_rey`)
    for (i = 0; i < lista_rey.length; i++) {
        loc = lista_rey[i]
        crear_rey(loc)
        tiles.setTileAt(loc, img_suelo_limpio)
    }
    //  --- C. ENEMIGOS ---
    let lista_enemigos = tiles.getTilesByType(assets.tile`marcador_enemigo`)
    for (i = 0; i < lista_enemigos.length; i++) {
        loc = lista_enemigos[i]
        crear_enemigo(loc)
        tiles.setTileAt(loc, img_suelo_limpio)
    }
    //  --- D. CALDERO ---
    let lista_caldero = tiles.getTilesByType(assets.tile`marcador_caldero`)
    for (i = 0; i < lista_caldero.length; i++) {
        loc = lista_caldero[i]
        caldero = sprites.create(img_caldero, KIND_META)
        tiles.placeOnTile(caldero, loc)
        caldero.startEffect(effects.fountain, 50000)
        tiles.setTileAt(loc, img_suelo_limpio)
    }
    //  --- F. ITEMS (OBJETOS) ---
    //  1. GEMA MAGICA
    let lista_gema = tiles.getTilesByType(assets.tile`marcador_item1`)
    for (i = 0; i < lista_gema.length; i++) {
        loc = lista_gema[i]
        crear_item("Gema Magica", img_gema, loc, "mision")
        tiles.setTileAt(loc, img_suelo_limpio)
    }
    //  2. HIERBA SANTA
    let lista_planta = tiles.getTilesByType(assets.tile`marcador_item2`)
    for (i = 0; i < lista_planta.length; i++) {
        loc = lista_planta[i]
        crear_item("Hierba Santa", img_planta, loc, "mision")
        tiles.setTileAt(loc, img_suelo_limpio)
    }
    //  3. LIBRO ANTIGUO
    let lista_libro = tiles.getTilesByType(assets.tile`marcador_item3`)
    for (i = 0; i < lista_libro.length; i++) {
        loc = lista_libro[i]
        crear_item("Libro Antiguo", img_libro, loc, "mision")
        tiles.setTileAt(loc, img_suelo_limpio)
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
    //  VELOCIDAD LENTA (20)
    ene.follow(jugador, 20)
    ene.setFlag(SpriteFlag.GhostThroughWalls, true)
}

function crear_item(nombre: string, img_obj: Image, loc: tiles.Location, tipo: string) {
    let spr: Sprite;
    let nuevo_item: ItemJuego;
    for (let i of items) {
        if (i.nombre == nombre && i.recogido) {
            return
        }
        
    }
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
    
    //  Se crea el héroe usando la imagen de Assets que definiste arriba
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
    //  --- LÓGICA DE ANIMACIÓN DEL HÉROE ---
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
    
    //  Solo cambiamos la animación si el estado es diferente al anterior
    if (estado_actual != ultimo_estado_hero) {
        //  Esto para cualquier animación que esté corriendo
        animation.stopAnimation(animation.AnimationTypes.All, jugador)
        //  IMPORTANTE: Selecciona aquí tus animaciones
        if (estado_actual == "izquierda") {
            animation.runImageAnimation(jugador, assets.animation`anim_hero_izquierda`, 100, true)
        } else if (estado_actual == "derecha") {
            animation.runImageAnimation(jugador, assets.animation`anim_hero_derecha`, 100, true)
        } else if (estado_actual == "arriba") {
            animation.runImageAnimation(jugador, assets.animation`anim_hero_arriba`, 100, true)
        } else if (estado_actual == "abajo") {
            animation.runImageAnimation(jugador, assets.animation`anim_hero_abajo`, 100, true)
        } else if (estado_actual == "parado") {
            //  Aquí es donde le decimos: Si se para, ponte la imagen de "img_hero"
            jugador.setImage(img_hero)
        }
        
        ultimo_estado_hero = estado_actual
    }
    
    info.setScore(Math.trunc(energia))
    if (energia <= 0) {
        game.over(false, effects.melt)
    }
    
})
//  INTERACCIÓN NPC
sprites.onOverlap(SpriteKind.Player, KIND_NPC, function on_npc_overlap(player: Sprite, npc: Sprite) {
    
    if (!mision_iniciada) {
        game.showLongText("REY: ¡Traeme los ingredientes!", DialogLayout.Bottom)
        game.showLongText(`Nivel 1: Gema
Nivel 2: Gema + Hierba
Nivel 3: Gema + Hierba + Libro`, DialogLayout.Bottom)
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
                it.recogido = true
                break
            }
            
            if (it.tipo == "mision") {
                it.recogido = true
                other.destroy(effects.confetti, 500)
                music.magicWand.play()
                energia = Math.min(100, energia + 10)
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
    if (player.x < enemy.x) {
        player.x -= 16
    } else {
        player.x += 16
    }
    
    player.say("¡Pasando!", 200)
})
//  INTERACCIÓN CALDERO (META)
sprites.onOverlap(SpriteKind.Player, KIND_META, function on_meta_overlap(player: Sprite, meta: Sprite) {
    let tenemos_este: boolean;
    let texto_falta: string;
    
    let objetivos : string[] = []
    if (nivel_actual == 1) {
        objetivos = ["Gema Magica"]
    } else if (nivel_actual == 2) {
        objetivos = ["Gema Magica", "Hierba Santa"]
    } else if (nivel_actual == 3) {
        objetivos = ["Gema Magica", "Hierba Santa", "Libro Antiguo"]
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
        if (nivel_actual < 3) {
            game.showLongText(`¡Caldero activado!
Viajando...`, DialogLayout.Bottom)
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
        texto_falta = "Falta:\n"
        for (let f of faltan) {
            texto_falta += "- " + f + "\n"
        }
        game.showLongText(texto_falta, DialogLayout.Bottom)
    }
    
})
//  --- 6. MENÚS Y ARRANQUE ---
function inicio() {
    
    game.splash("THE ALCHEMIST", "Ghost Edition")
    game.showLongText(`Si tu energia llega a 0,
perderas TODOS los objetos.`, DialogLayout.Full)
    setup_hero()
    controller.B.onEvent(ControllerButtonEvent.Pressed, function mostrar_inventari() {
        let texto = "MOCHILA:\n"
        let encontrados = 0
        for (let i of items) {
            if (i.tipo == "mision" && i.recogido) {
                texto += "[X] " + i.nombre + "\n"
                encontrados += 1
            }
            
        }
        if (encontrados == 0) {
            texto += "(Vacia)"
        }
        
        game.showLongText(texto, DialogLayout.Full)
    })
    items = []
    nivel_actual = 1
    energia = 100.0
    generar_mundo()
    juego_activo = true
}

inicio()

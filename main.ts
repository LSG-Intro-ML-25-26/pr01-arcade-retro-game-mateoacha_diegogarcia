// INTERACCIÓN CALDERO (META)
sprites.onOverlap(SpriteKind.Player, KIND_META, function (player2, meta) {
    let faltan: string[] = []
    let tenemos_este: boolean;
let texto_falta: string;
// REQUERIMIENTOS POR NIVEL
    if (nivel_actual == 1) {
        objetivos = ["Gema Magica"]
    } else if (nivel_actual == 2) {
        objetivos = ["Gema Magica", "Hierba Santa"]
    } else if (nivel_actual == 3) {
        objetivos = ["Gema Magica", "Hierba Santa", "Libro Antiguo"]
    }
    for (let obj_nombre of objetivos) {
        tenemos_este = false
        for (let it2 of items) {
            if (it2.nombre == obj_nombre && it2.recogido) {
                tenemos_este = true
                break;
            }
        }
        if (!(tenemos_este)) {
            faltan.push(obj_nombre)
        }
    }
    if (faltan.length == 0) {
        music.baDing.play()
        if (nivel_actual < 3) {
            game.showLongText(`¡Caldero activado!
Viajando...`, DialogLayout.Bottom)
            nivel_actual += 1
            player2.startEffect(effects.halo, 1000)
            pause(1000)
            generar_mundo()
        } else {
            game.over(true, effects.starField)
        }
    } else {
        player2.x += 10
        scene.cameraShake(2, 200)
        texto_falta = "Falta:\n"
for (let f of faltan) {
            texto_falta = "" + texto_falta + "- " + f + "\n"
        }
        game.showLongText(texto_falta, DialogLayout.Bottom)
    }
})
// INTERACCIÓN ENEMIGOS
sprites.onOverlap(SpriteKind.Player, KIND_ENEMIGO, function (player2, enemy) {
    energia += 0 - 5
    scene.cameraShake(4, 200)
    music.zapped.play()
    // Pausa para evitar muerte instantánea al atravesar
    pause(200)
})
function setup_hero () {
    if (jugador) {
        jugador.destroy()
    }
    // Se crea el héroe usando la imagen de Assets que definiste arriba
    jugador = sprites.create(img_hero, SpriteKind.Player)
    controller.moveSprite(jugador, 80, 80)
    scene.cameraFollowSprite(jugador)
    jugador.setStayInScreen(true)
}
// --- 4. MAPA Y ENTIDADES ---
function generar_mundo () {
    let i: number;
let loc: tiles.Location;
let caldero: Sprite;
// REINICIAMOS LOS OBJETOS EN CADA NIVEL
    items = []
    // 1. LIMPIEZA
    sprites.destroyAllSpritesOfKind(KIND_ENEMIGO)
    sprites.destroyAllSpritesOfKind(KIND_META)
    sprites.destroyAllSpritesOfKind(KIND_ITEM)
    scene.setBackgroundColor(13)
    // 2. CARGAR TILEMAP VISUAL
    if (nivel_actual == 1) {
        tiles.setCurrentTilemap(tilemap`level01`)
    } else if (nivel_actual == 2) {
        tiles.setCurrentTilemap(tilemap`level02`)
    } else if (nivel_actual == 3) {
        tiles.setCurrentTilemap(tilemap`level03`)
    } else {
        game.over(true)
    }
    // 3. COLOCAR OBJETOS BASADO EN MARCADORES
    // --- A. JUGADOR ---
    lista_jugador = tiles.getTilesByType(assets.tile`marcador_jugador`)
    if (lista_jugador.length > 0) {
        tiles.placeOnTile(jugador, lista_jugador[0])
        tiles.setTileAt(lista_jugador[0], img_suelo_limpio)
    }
    // --- B. ENEMIGOS ---
    lista_enemigos = tiles.getTilesByType(assets.tile`marcador_enemigo`)
    for (i = 0; i < lista_enemigos.length; i++) {
        loc = lista_enemigos[i]
        crear_enemigo(loc)
        tiles.setTileAt(loc, img_suelo_limpio)
    }
// --- C. CALDERO ---
    lista_caldero = tiles.getTilesByType(assets.tile`marcador_caldero`)
    for (i = 0; i < lista_caldero.length; i++) {
        loc = lista_caldero[i]
        caldero = sprites.create(img_caldero, KIND_META)
        tiles.placeOnTile(caldero, loc)
        caldero.startEffect(effects.fountain, 50000)
        tiles.setTileAt(loc, img_suelo_limpio)
    }
// --- D. ITEMS (OBJETOS) ---
    // 1. GEMA MAGICA
    lista_gema = tiles.getTilesByType(assets.tile`marcador_item1`)
    for (i = 0; i < lista_gema.length; i++) {
        loc = lista_gema[i]
        crear_item("Gema Magica", img_gema, loc, "mision")
        tiles.setTileAt(loc, img_suelo_limpio)
    }
// 2. HIERBA SANTA
    lista_planta = tiles.getTilesByType(assets.tile`marcador_item2`)
    for (i = 0; i < lista_planta.length; i++) {
        loc = lista_planta[i]
        crear_item("Hierba Santa", img_planta, loc, "mision")
        tiles.setTileAt(loc, img_suelo_limpio)
    }
// 3. LIBRO ANTIGUO
    lista_libro = tiles.getTilesByType(assets.tile`marcador_item3`)
    for (i = 0; i < lista_libro.length; i++) {
        loc = lista_libro[i]
        crear_item("Libro Antiguo", img_libro, loc, "mision")
        tiles.setTileAt(loc, img_suelo_limpio)
    }
game.splash("NIVEL " + ("" + nivel_actual))
}
// --- 6. MENÚS Y ARRANQUE ---
function inicio () {
    game.splash("THE ALCHEMIST", "Ghost Edition")
    game.showLongText(`Si tu energia llega a 0,
perderas TODOS los objetos.`, DialogLayout.Full)
    setup_hero()
    controller.B.onEvent(ControllerButtonEvent.Pressed, function mostrar_inventari() {
        let texto = "MOCHILA:\n"
        let encontrados = 0
        for (let j of items) {
            if (j.tipo == "mision" && j.recogido) {
                texto += "[X] " + j.nombre + "\n"
                encontrados += 1
            }
            
        }
        if (encontrados == 0) {
            texto += "(Vacia)"
        }
        
        game.showLongText(texto, DialogLayout.Full)
    })
// Inicialización limpia
    items = []
    nivel_actual = 1
    // VIDA INICIAL 999
    energia = 999
    generar_mundo()
    juego_activo = true
}
function crear_enemigo (loc: tiles.Location) {
    ene = sprites.create(img_fantasma, KIND_ENEMIGO)
    tiles.placeOnTile(ene, loc)
    ene.follow(jugador, 20)
    ene.setFlag(SpriteFlag.GhostThroughWalls, true)
}
// INTERACCIÓN ITEMS
sprites.onOverlap(SpriteKind.Player, KIND_ITEM, function (player2, other) {
    for (let it of items) {
        if (it.sprite_fisico == other) {
            if (it.tipo == "curacion") {
                energia = Math.min(999, energia + 30)
                // Aumentado el tope de curación
                other.destroy(effects.hearts, 500)
                music.powerUp.play()
                player2.say("Recuperado!", 500)
                it.recogido = true
break;
            }
            if (it.tipo == "mision") {
                it.recogido = true
// Simplemente destruimos el objeto (desaparece sin confeti)
                other.destroy()
                music.magicWand.play()
                energia = Math.min(999, energia + 10)
                // Aumentado el tope de energía
                game.showLongText("" + "¡Conseguido!\n" + it.nombre, DialogLayout.Bottom)
                break;
            }
        }
    }
})
function crear_item (nombre: string, img_obj: Image, loc: tiles.Location, tipo: string) {
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
let estado_actual = ""
let gasto = 0
let velocidad = 0
let ene: Sprite = null
let juego_activo = false
let lista_libro: tiles.Location[] = []
let lista_planta: tiles.Location[] = []
let lista_gema: tiles.Location[] = []
let lista_caldero: tiles.Location[] = []
let lista_enemigos: tiles.Location[] = []
let lista_jugador: tiles.Location[] = []
let jugador: Sprite = null
let objetivos: string[] = []
let img_suelo_limpio: Image = null
let img_fantasma: Image = null
let img_hero: Image = null
let KIND_ENEMIGO = 0
let nivel_actual = 0
let energia = 0
let enemigos: number[] = []
// --- 2. CONFIGURACIÓN ---
let items : ItemJuego[] = []
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
energia = 999
nivel_actual = 1
// Variable para controlar la animación
let ultimo_estado_hero = "parado"
let KIND_ITEM = SpriteKind.create()
let KIND_META = SpriteKind.create()
KIND_ENEMIGO = SpriteKind.Enemy
// --- 3. ARTE PIXEL ---
// [HÉROE ANIMADO]
// Haz clic aquí para elegir tu dibujo del héroe quieto
img_hero = assets.image`hero_quieto`
// [RESTO DE OBJETOS - TEXTO]
img_fantasma = img`
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
// --- LOS 3 OBJETOS ÚNICOS ---
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
// Tile de limpieza
img_suelo_limpio = img`
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
inicio()
// --- 5. LÓGICA DEL JUEGO ---
game.onUpdate(function () {
    if (!(juego_activo)) {
        return
    }
    velocidad = 80
    gasto = 0.05
    if (controller.A.isPressed()) {
        velocidad = 120
        gasto = 0.2
        jugador.startEffect(effects.trail, 100)
    }
    controller.moveSprite(jugador, velocidad, velocidad)
    // --- LÓGICA DE ANIMACIÓN DEL HÉROE ---
    estado_actual = "parado"
    if (controller.left.isPressed()) {
        estado_actual = "izquierda"
        energia += 0 - gasto
    } else if (controller.right.isPressed()) {
        estado_actual = "derecha"
        energia += 0 - gasto
    } else if (controller.up.isPressed()) {
        estado_actual = "arriba"
        energia += 0 - gasto
    } else if (controller.down.isPressed()) {
        estado_actual = "abajo"
        energia += 0 - gasto
    }
    if (estado_actual != ultimo_estado_hero) {
        animation.stopAnimation(animation.AnimationTypes.All, jugador)
        // IMPORTANTE: Selecciona aquí tus animaciones
        if (estado_actual == "izquierda") {
            animation.runImageAnimation(
            jugador,
            assets.animation`anim_hero_izquierda`,
            100,
            true
            )
        } else if (estado_actual == "derecha") {
            animation.runImageAnimation(
            jugador,
            assets.animation`anim_hero_derecha`,
            100,
            true
            )
        } else if (estado_actual == "arriba") {
            animation.runImageAnimation(
            jugador,
            assets.animation`anim_hero_arriba`,
            100,
            true
            )
        } else if (estado_actual == "abajo") {
            animation.runImageAnimation(
            jugador,
            assets.animation`anim_hero_abajo`,
            100,
            true
            )
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

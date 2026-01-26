"""
👑 BLACKOUT: ESPAÑA EDITION 👑
(Historia corregida: Texto legible y bien colocado)
"""

# --- 1. CLASES ---
class ItemJuego:
    def __init__(self, nombre: str, imagen: Image, tipo: str):
        self.nombre = nombre
        self.imagen = imagen
        self.tipo = tipo # "mision" o "curacion"
        self.recogido = False
        self.sprite_fisico = None

# --- 2. CONFIGURACIÓN ---
items: List[ItemJuego] = []
enemigos: List[Sprite] = []
jugador: Sprite = None

energia = 999.0
juego_activo = False
nivel_actual = 1

# Variable para controlar la animación
ultimo_estado_hero = "parado"

# Tipos de Sprite
KIND_ITEM = SpriteKind.create()
KIND_META = SpriteKind.create()
KIND_ENEMIGO = SpriteKind.enemy
KIND_NPC = SpriteKind.create()

# --- 3. ARTE PIXEL ---

# [HÉROE ANIMADO]
img_hero = assets.image("""hero_quieto""")

# [RESTO DE OBJETOS]
img_fantasma = img("""
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
""")

img_gema = img("""
    . . . . . . . . . . . .
    . . . . . 2 2 . . . . .
    . . . . 2 4 4 2 . . . .
    . . . 2 4 2 2 4 2 . . .
    . . . 2 4 2 2 4 2 . . .
    . . . 2 4 4 4 4 2 . . .
    . . . . 2 4 4 2 . . . .
    . . . . . 2 2 . . . . .
    . . . . . . . . . . . .
""")

img_planta = img("""
    . . . . . . . . . . . .
    . . . . . . 7 . . . . .
    . . . . . 7 7 . . . . .
    . . . 7 . 7 7 . 7 . . .
    . . . 7 7 7 7 7 7 . . .
    . . . . 7 7 7 7 . . . .
    . . . . 7 7 7 7 . . . .
    . . . . . 7 7 . . . . .
    . . . . . . . . . . . .
""")

img_libro = img("""
    . . . . . . . . . . . .
    . . . b b b b . . . . .
    . . b 1 1 1 1 b . . . .
    . b 1 1 1 1 1 1 b . . .
    . b c c c c c c b . . .
    . b c c c c c c b . . .
    . b c c c c c c b . . .
    . b 1 1 1 1 1 1 b . . .
    . . b b b b b b . . . .
""")

img_salud = img("""
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
""")

img_caldero = img("""
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
""")

img_suelo_limpio = img("""
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
""")

# --- 4. MAPA Y ENTIDADES ---

def generar_mundo():
    global nivel_actual, items
    items = []

    sprites.destroy_all_sprites_of_kind(KIND_ENEMIGO)
    sprites.destroy_all_sprites_of_kind(KIND_META)
    sprites.destroy_all_sprites_of_kind(KIND_ITEM)
    
    scene.set_background_color(13)

    if nivel_actual == 1:
        tiles.set_current_tilemap(tilemap("""level1"""))
    elif nivel_actual == 2:
        tiles.set_current_tilemap(tilemap("""level2"""))
    elif nivel_actual == 3:
        tiles.set_current_tilemap(tilemap("""level3"""))
    else:
        game.over(True)

    lista_jugador = tiles.get_tiles_by_type(assets.tile("""marcador_jugador"""))
    if len(lista_jugador) > 0:
        tiles.place_on_tile(jugador, lista_jugador[0])
        tiles.set_tile_at(lista_jugador[0], img_suelo_limpio)

    lista_enemigos = tiles.get_tiles_by_type(assets.tile("""marcador_enemigo"""))
    for i in range(len(lista_enemigos)):
        loc = lista_enemigos[i]
        crear_enemigo(loc)
        tiles.set_tile_at(loc, img_suelo_limpio)

    lista_caldero = tiles.get_tiles_by_type(assets.tile("""marcador_caldero"""))
    for i in range(len(lista_caldero)):
        loc = lista_caldero[i]
        caldero = sprites.create(img_caldero, KIND_META)
        tiles.place_on_tile(caldero, loc)
        caldero.start_effect(effects.fountain, 50000)
        tiles.set_tile_at(loc, img_suelo_limpio)
    
    lista_gema = tiles.get_tiles_by_type(assets.tile("""marcador_item1"""))
    for i in range(len(lista_gema)):
        loc = lista_gema[i]
        crear_item("Panel Torre A", img_gema, loc, "mision")
        tiles.set_tile_at(loc, img_suelo_limpio)

    lista_planta = tiles.get_tiles_by_type(assets.tile("""marcador_item2"""))
    for i in range(len(lista_planta)):
        loc = lista_planta[i]
        crear_item("Panel Torre B", img_planta, loc, "mision")
        tiles.set_tile_at(loc, img_suelo_limpio)
        
    lista_libro = tiles.get_tiles_by_type(assets.tile("""marcador_item3"""))
    for i in range(len(lista_libro)):
        loc = lista_libro[i]
        crear_item("Panel Torre C", img_libro, loc, "mision")
        tiles.set_tile_at(loc, img_suelo_limpio)

    game.splash("NIVEL " + str(nivel_actual))

def crear_enemigo(loc: tiles.Location):
    ene = sprites.create(img_fantasma, KIND_ENEMIGO)
    tiles.place_on_tile(ene, loc)
    ene.follow(jugador, 20)
    ene.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)

def crear_item(nombre: str, img_obj: Image, loc: tiles.Location, tipo: str):
    if tipo == "curacion":
        spr = sprites.create(img_obj, KIND_ITEM)
        tiles.place_on_tile(spr, loc)
        nuevo_item = ItemJuego(nombre, img_obj, tipo)
        nuevo_item.sprite_fisico = spr
        items.append(nuevo_item)
        return

    nuevo_item = ItemJuego(nombre, img_obj, tipo)
    items.append(nuevo_item)
    
    spr = sprites.create(img_obj, KIND_ITEM)
    tiles.place_on_tile(spr, loc)
    spr.start_effect(effects.halo, 50000)
    nuevo_item.sprite_fisico = spr

def setup_hero():
    global jugador
    if jugador:
        jugador.destroy()

    jugador = sprites.create(img_hero, SpriteKind.player)
    controller.move_sprite(jugador, 80, 80)
    scene.camera_follow_sprite(jugador)
    jugador.set_stay_in_screen(True)

# --- 5. LÓGICA DEL JUEGO ---

def bucle_principal():
    global energia, juego_activo, ultimo_estado_hero
    
    if not juego_activo: return

    velocidad = 80
    gasto = 0.05

    if controller.A.is_pressed():
        velocidad = 120
        gasto = 0.2
        jugador.start_effect(effects.trail, 100)
    
    controller.move_sprite(jugador, velocidad, velocidad)

    # --- ANIMACIÓN ---
    estado_actual = "parado"

    if controller.left.is_pressed():
        estado_actual = "izquierda"
        energia -= gasto
    elif controller.right.is_pressed():
        estado_actual = "derecha"
        energia -= gasto
    elif controller.up.is_pressed():
        estado_actual = "arriba"
        energia -= gasto
    elif controller.down.is_pressed():
        estado_actual = "abajo"
        energia -= gasto
    
    if estado_actual != ultimo_estado_hero:
        animation.stop_animation(animation.AnimationTypes.ALL, jugador)
        
        # IMPORTANTE: Selecciona tus animaciones aquí
        if estado_actual == "izquierda":
            animation.run_image_animation(jugador, assets.animation("""anim_hero_izquierda"""), 100, True)
        elif estado_actual == "derecha":
            animation.run_image_animation(jugador, assets.animation("""anim_hero_derecha"""), 100, True)
        elif estado_actual == "arriba":
            animation.run_image_animation(jugador, assets.animation("""anim_hero_arriba"""), 100, True)
        elif estado_actual == "abajo":
            animation.run_image_animation(jugador, assets.animation("""anim_hero_abajo"""), 100, True)
        elif estado_actual == "parado":
            jugador.set_image(img_hero)

        ultimo_estado_hero = estado_actual

    info.set_score(int(energia))
    
    if energia <= 0:
        game.over(False, effects.melt)

game.on_update(bucle_principal)

# INTERACCIÓN ITEMS
def on_item_overlap(player, other):
    global energia
    for it in items:
        if it.sprite_fisico == other:
            if it.tipo == "curacion":
                energia = min(999, energia + 30)
                other.destroy(effects.hearts, 500)
                music.power_up.play()
                player.say("Recuperado!", 500)
                it.recogido = True
                break

            if it.tipo == "mision":
                it.recogido = True
                other.destroy()
                music.magic_wand.play()
                energia = min(999, energia + 10)
                game.show_long_text("¡Conseguido!\n" + it.nombre, DialogLayout.BOTTOM)
                break

sprites.on_overlap(SpriteKind.player, KIND_ITEM, on_item_overlap)

# INTERACCIÓN ENEMIGOS
def on_enemy_overlap(player, enemy):
    global energia
    energia -= 5
    scene.camera_shake(4, 200)
    music.zapped.play()
    pause(200)

sprites.on_overlap(SpriteKind.player, KIND_ENEMIGO, on_enemy_overlap)

# INTERACCIÓN META
def on_meta_overlap(player, meta):
    global nivel_actual
    
    objetivos: List[str] = []
    
    if nivel_actual == 1:
        objetivos = ["Panel Torre A"]
    elif nivel_actual == 2:
        objetivos = ["Panel Torre A", "Panel Torre B"]
    elif nivel_actual == 3:
        objetivos = ["Panel Torre A", "Panel Torre B", "Panel Torre C"]
    
    faltan: List[str] = []
    
    for obj_nombre in objetivos:
        tenemos_este = False
        for it in items:
            if it.nombre == obj_nombre and it.recogido:
                tenemos_este = True
                break
        if not tenemos_este:
            faltan.append(obj_nombre)
            
    if len(faltan) == 0:
        music.ba_ding.play()
        if nivel_actual < 3:
            game.show_long_text("¡Sistema restablecido!\nAvanzando...", DialogLayout.BOTTOM)
            nivel_actual += 1
            player.start_effect(effects.halo, 1000)
            pause(1000)
            generar_mundo()
        else:
            game.over(True, effects.star_field)
    else:
        player.y += 10
        scene.camera_shake(2, 200)
        texto_falta = "Faltan Paneles:\n"
        for f in faltan:
            texto_falta += "- " + f + "\n"
        game.show_long_text(texto_falta, DialogLayout.BOTTOM)

sprites.on_overlap(SpriteKind.player, KIND_META, on_meta_overlap)

# --- 6. HISTORIA Y MENÚS ---

# [NUEVA HISTORIA CORREGIDA: TEXTO LIMPIO]
def introduccion_historia():
    # Fondo negro para máxima legibilidad
    scene.set_background_color(15)
    
    # Usamos FULL para que sea como una pantalla de cine muda
    game.show_long_text("ESPAÑA SE APAGO\nEN UNA SOLA NOCHE.", DialogLayout.FULL)
    
    game.show_long_text("Las ciudades quedaron\nen silencio.\nLos cielos, sin luz.", DialogLayout.FULL)
    
    music.big_crash.play()
    game.show_long_text("El sistema electrico\nnacional colapso.\nEl tiempo corre...", DialogLayout.FULL)
    
    game.show_long_text("MISIÓN:\nActivar 3 paneles de\nluz ocultos en los\nsotanos de las torres.", DialogLayout.FULL)
    
    game.show_long_text("ADVERTENCIA:\nDebes activarlos en\norden correcto:\nA -> B -> C", DialogLayout.FULL)
    
    music.beam_up.play()
    game.show_long_text("Si fallas, la\noscuridad sera\nirreversible.", DialogLayout.FULL)
    
    game.show_long_text("El destino de España\nesta en tus manos.", DialogLayout.FULL)

def mostrar_inventari():
    texto = "EQUIPO:\n"
    encontrados = 0
    for i in items:
        if i.tipo == "mision" and i.recogido:
            texto += "[ON] " + i.nombre + "\n"
            encontrados += 1
    
    if encontrados == 0:
        texto += "(Sin energia)"
        
    game.show_long_text(texto, DialogLayout.FULL)

def inicio():
    global juego_activo, energia, nivel_actual, items
    
    game.splash("BLACKOUT", "España Edition")
    
    introduccion_historia()

    setup_hero()
    controller.B.on_event(ControllerButtonEvent.PRESSED, mostrar_inventari)
    
    items = []
    nivel_actual = 1
    energia = 999.0
    
    generar_mundo()
    
    juego_activo = True

inicio()
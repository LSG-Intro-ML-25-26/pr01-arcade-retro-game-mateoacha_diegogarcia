"""
👑 BLACKOUT: ESPAÑA EDITION 👑
(Torres Blancas + Mapa Abierto + Lore + Sin Decoración Auto)
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
nivel_actual = 0 # 0 = MAPA, 1,2,3 = NIVELES
niveles_desbloqueados = 1

# Variable para controlar la animación
ultimo_estado_hero = "parado"

# Tipos de Sprite
KIND_ITEM = SpriteKind.create()
KIND_META = SpriteKind.create()
KIND_ENEMIGO = SpriteKind.enemy
KIND_NPC = SpriteKind.create()
KIND_TORRE = SpriteKind.create()

# --- 3. ARTE PIXEL ---

# [HÉROE ANIMADO]
img_hero = assets.image("""hero_quieto""")

# [TORRES BLANCAS]
img_torre_a = img("""
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
""")

img_torre_b = img("""
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
""")

img_torre_c = img("""
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
""")

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

# Tile de suelo metálico (sigue disponible para usarse)
img_suelo_limpio = img("""
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
""")

# --- 4. MAPA Y ENTIDADES ---

def generar_mundo():
    global nivel_actual, items
    
    # Limpieza
    items = []
    sprites.destroy_all_sprites_of_kind(KIND_ENEMIGO)
    sprites.destroy_all_sprites_of_kind(KIND_META)
    sprites.destroy_all_sprites_of_kind(KIND_ITEM)
    sprites.destroy_all_sprites_of_kind(KIND_TORRE)
    
    scene.set_background_color(13)

    # --- CASO 0: MAPA GENERAL ---
    if nivel_actual == 0:
        tiles.set_current_tilemap(tilemap("""mapa_general"""))
        game.splash("MAPA DE ESPAÑA", "Busca la Torre A")
        
        # Colocar Jugador
        lista_jugador = tiles.get_tiles_by_type(assets.tile("""marcador_jugador"""))
        if len(lista_jugador) > 0:
            tiles.place_on_tile(jugador, lista_jugador[0])
            # Si quieres usar el suelo metálico donde sale el jugador, descomenta esto:
            # tiles.set_tile_at(lista_jugador[0], img_suelo_limpio)
            # De lo contrario, se verá lo que hayas pintado en el mapa.
            
        # COLOCAR TORRES
        
        # Torre A
        lista_torre_a = tiles.get_tiles_by_type(assets.tile("""marcador_torre_a"""))
        for i in range(len(lista_torre_a)):
            loc = lista_torre_a[i]
            t = sprites.create(img_torre_a, KIND_TORRE)
            tiles.place_on_tile(t, loc)
            # Limpiamos el marcador
            tiles.set_tile_at(loc, img_suelo_limpio)
            
        # Torre B
        lista_torre_b = tiles.get_tiles_by_type(assets.tile("""marcador_torre_b"""))
        for i in range(len(lista_torre_b)):
            loc = lista_torre_b[i]
            t = sprites.create(img_torre_b, KIND_TORRE)
            tiles.place_on_tile(t, loc)
            tiles.set_tile_at(loc, img_suelo_limpio)

        # Torre C
        lista_torre_c = tiles.get_tiles_by_type(assets.tile("""marcador_torre_c"""))
        for i in range(len(lista_torre_c)):
            loc = lista_torre_c[i]
            t = sprites.create(img_torre_c, KIND_TORRE)
            tiles.place_on_tile(t, loc)
            tiles.set_tile_at(loc, img_suelo_limpio)
            
        return

    # --- CASO NIVELES (1, 2, 3) ---
    if nivel_actual == 1:
        tiles.set_current_tilemap(tilemap("""level01"""))
        game.splash("TORRE A", "Objetivo: 1 Panel")
    elif nivel_actual == 2:
        tiles.set_current_tilemap(tilemap("""level02"""))
        game.splash("TORRE B", "Objetivo: 2 Paneles")
    elif nivel_actual == 3:
        tiles.set_current_tilemap(tilemap("""level03"""))
        game.splash("TORRE C", "Objetivo: 3 Paneles")

    # Colocar Jugador
    lista_jugador = tiles.get_tiles_by_type(assets.tile("""marcador_jugador"""))
    if len(lista_jugador) > 0:
        tiles.place_on_tile(jugador, lista_jugador[0])
        tiles.set_tile_at(lista_jugador[0], img_suelo_limpio)

    # Colocar Enemigos
    lista_enemigos = tiles.get_tiles_by_type(assets.tile("""marcador_enemigo"""))
    for i in range(len(lista_enemigos)):
        loc = lista_enemigos[i]
        crear_enemigo(loc)
        tiles.set_tile_at(loc, img_suelo_limpio)

    # Colocar Meta (Caldero/Centro Control)
    lista_caldero = tiles.get_tiles_by_type(assets.tile("""marcador_caldero"""))
    for i in range(len(lista_caldero)):
        loc = lista_caldero[i]
        caldero = sprites.create(img_caldero, KIND_META)
        tiles.place_on_tile(caldero, loc)
        caldero.start_effect(effects.fountain, 50000)
        tiles.set_tile_at(loc, img_suelo_limpio)
    
    # Colocar Items
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

# INTERACCIÓN CON LAS TORRES (ENTRADA A NIVELES)
def on_torre_overlap(player, torre):
    global nivel_actual, niveles_desbloqueados
    
    if torre.image == img_torre_a:
        nivel_actual = 1
        generar_mundo()
        
    elif torre.image == img_torre_b:
        if niveles_desbloqueados >= 2:
            nivel_actual = 2
            generar_mundo()
        else:
            player.say("¡Bloqueada! Termina la Torre A", 1000)
            player.y += 16
            
    elif torre.image == img_torre_c:
        if niveles_desbloqueados >= 3:
            nivel_actual = 3
            generar_mundo()
        else:
            player.say("¡Bloqueada! Termina la Torre B", 1000)
            player.y += 16

sprites.on_overlap(SpriteKind.player, KIND_TORRE, on_torre_overlap)

# INTERACCIÓN CALDERO (COMPLETAR NIVEL)
def on_meta_overlap(player, meta):
    global nivel_actual, niveles_desbloqueados
    
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
        
        if nivel_actual == 1:
            game.show_long_text("Torre A reactivada.\nVolviendo al mapa...", DialogLayout.BOTTOM)
            niveles_desbloqueados = 2
            nivel_actual = 0 # Volver al mapa
            generar_mundo()
            
        elif nivel_actual == 2:
            game.show_long_text("Torre B reactivada.\nVolviendo al mapa...", DialogLayout.BOTTOM)
            niveles_desbloqueados = 3
            nivel_actual = 0 # Volver al mapa
            generar_mundo()
            
        elif nivel_actual == 3:
            game.over(True, effects.star_field) # FIN DEL JUEGO
            
    else:
        player.y += 10
        scene.camera_shake(2, 200)
        texto_falta = "Faltan:\n"
        for f in faltan:
            texto_falta += "- " + f + "\n"
        game.show_long_text(texto_falta, DialogLayout.BOTTOM)

sprites.on_overlap(SpriteKind.player, KIND_META, on_meta_overlap)

# --- 6. HISTORIA Y MENÚS ---

def introduccion_historia():
    scene.set_background_color(15)
    
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
    
    # EMPEZAMOS EN EL MAPA (Nivel 0)
    nivel_actual = 0
    energia = 999.0
    
    generar_mundo()
    
    juego_activo = True

inicio()
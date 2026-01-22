"""
👑 THE ALCHEMIST: GHOST PHASE EDITION 👑
(Héroe 100% Personalizable + Resto Clásico)
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
rey_npc: Sprite = None

energia = 100.0
juego_activo = False
mision_iniciada = False
nivel_actual = 1

# Variable para controlar la animación
ultimo_estado_hero = "parado"

# Tipos de Sprite
KIND_ITEM = SpriteKind.create()
KIND_META = SpriteKind.create()
KIND_ENEMIGO = SpriteKind.enemy
KIND_NPC = SpriteKind.create()

# --- 3. ARTE PIXEL ---

# [ESTO ES LO QUE PEDISTE]
# El héroe usa Assets. Haz clic en el paréntesis para elegir tu dibujo "Quieto"
img_hero = assets.image("""hero_quieto""")

# [EL RESTO SIGUE SIENDO CÓDIGO DE TEXTO]
img_rey = img("""
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
""")

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

# --- LOS 3 OBJETOS ÚNICOS ---
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

# Tile de limpieza
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
    
    # 1. LIMPIEZA
    sprites.destroy_all_sprites_of_kind(KIND_ENEMIGO)
    sprites.destroy_all_sprites_of_kind(KIND_META)
    sprites.destroy_all_sprites_of_kind(KIND_NPC)
    
    for item in items:
        if item.sprite_fisico:
            item.sprite_fisico.destroy()

    scene.set_background_color(13)

    # 2. CARGAR TILEMAP VISUAL
    if nivel_actual == 1:
        tiles.set_current_tilemap(tilemap("""level1"""))
    elif nivel_actual == 2:
        tiles.set_current_tilemap(tilemap("""level2"""))
    elif nivel_actual == 3:
        tiles.set_current_tilemap(tilemap("""level3"""))
    else:
        game.over(True)

    # 3. COLOCAR OBJETOS BASADO EN MARCADORES

    # --- A. JUGADOR ---
    lista_jugador = tiles.get_tiles_by_type(assets.tile("""marcador_jugador"""))
    if len(lista_jugador) > 0:
        tiles.place_on_tile(jugador, lista_jugador[0])
        tiles.set_tile_at(lista_jugador[0], img_suelo_limpio)

    # --- B. EL REY ---
    lista_rey = tiles.get_tiles_by_type(assets.tile("""marcador_rey"""))
    for i in range(len(lista_rey)):
        loc = lista_rey[i]
        crear_rey(loc)
        tiles.set_tile_at(loc, img_suelo_limpio)

    # --- C. ENEMIGOS ---
    lista_enemigos = tiles.get_tiles_by_type(assets.tile("""marcador_enemigo"""))
    for i in range(len(lista_enemigos)):
        loc = lista_enemigos[i]
        crear_enemigo(loc)
        tiles.set_tile_at(loc, img_suelo_limpio)

    # --- D. CALDERO ---
    lista_caldero = tiles.get_tiles_by_type(assets.tile("""marcador_caldero"""))
    for i in range(len(lista_caldero)):
        loc = lista_caldero[i]
        caldero = sprites.create(img_caldero, KIND_META)
        tiles.place_on_tile(caldero, loc)
        caldero.start_effect(effects.fountain, 50000)
        tiles.set_tile_at(loc, img_suelo_limpio)
    
    # --- F. ITEMS (OBJETOS) ---
    
    # 1. GEMA MAGICA
    lista_gema = tiles.get_tiles_by_type(assets.tile("""marcador_item1"""))
    for i in range(len(lista_gema)):
        loc = lista_gema[i]
        crear_item("Gema Magica", img_gema, loc, "mision")
        tiles.set_tile_at(loc, img_suelo_limpio)

    # 2. HIERBA SANTA
    lista_planta = tiles.get_tiles_by_type(assets.tile("""marcador_item2"""))
    for i in range(len(lista_planta)):
        loc = lista_planta[i]
        crear_item("Hierba Santa", img_planta, loc, "mision")
        tiles.set_tile_at(loc, img_suelo_limpio)
        
    # 3. LIBRO ANTIGUO
    lista_libro = tiles.get_tiles_by_type(assets.tile("""marcador_item3"""))
    for i in range(len(lista_libro)):
        loc = lista_libro[i]
        crear_item("Libro Antiguo", img_libro, loc, "mision")
        tiles.set_tile_at(loc, img_suelo_limpio)

    game.splash("NIVEL " + str(nivel_actual))

def crear_rey(loc: tiles.Location):
    global rey_npc
    rey_npc = sprites.create(img_rey, KIND_NPC)
    tiles.place_on_tile(rey_npc, loc)
    rey_npc.start_effect(effects.smiles, 50000)

def crear_enemigo(loc: tiles.Location):
    ene = sprites.create(img_fantasma, KIND_ENEMIGO)
    tiles.place_on_tile(ene, loc)
    # VELOCIDAD LENTA (20)
    ene.follow(jugador, 20)
    ene.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)

def crear_item(nombre: str, img_obj: Image, loc: tiles.Location, tipo: str):
    for i in items:
        if i.nombre == nombre and i.recogido:
            return

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

    # Se crea el héroe usando la imagen de Assets que definiste arriba
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

    # --- LÓGICA DE ANIMACIÓN DEL HÉROE ---
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
    
    # Solo cambiamos la animación si el estado es diferente al anterior
    if estado_actual != ultimo_estado_hero:
        # Esto para cualquier animación que esté corriendo
        animation.stop_animation(animation.AnimationTypes.ALL, jugador)
        
        # IMPORTANTE: Selecciona aquí tus animaciones
        if estado_actual == "izquierda":
            animation.run_image_animation(jugador, assets.animation("""anim_hero_izquierda"""), 100, True)
        elif estado_actual == "derecha":
            animation.run_image_animation(jugador, assets.animation("""anim_hero_derecha"""), 100, True)
        elif estado_actual == "arriba":
            animation.run_image_animation(jugador, assets.animation("""anim_hero_arriba"""), 100, True)
        elif estado_actual == "abajo":
            animation.run_image_animation(jugador, assets.animation("""anim_hero_abajo"""), 100, True)
        elif estado_actual == "parado":
            # Aquí es donde le decimos: Si se para, ponte la imagen de "img_hero"
            jugador.set_image(img_hero)

        ultimo_estado_hero = estado_actual

    info.set_score(int(energia))
    
    if energia <= 0:
        game.over(False, effects.melt)

game.on_update(bucle_principal)

# INTERACCIÓN NPC
def on_npc_overlap(player, npc):
    global mision_iniciada
    if not mision_iniciada:
        game.show_long_text("REY: ¡Traeme los ingredientes!", DialogLayout.BOTTOM)
        game.show_long_text("Nivel 1: Gema\nNivel 2: Gema + Hierba\nNivel 3: Gema + Hierba + Libro", DialogLayout.BOTTOM)
        mision_iniciada = True
        player.y += 16

sprites.on_overlap(SpriteKind.player, KIND_NPC, on_npc_overlap)

# INTERACCIÓN ITEMS
def on_item_overlap(player, other):
    global energia
    for it in items:
        if it.sprite_fisico == other:
            if it.tipo == "curacion":
                energia = min(100, energia + 30)
                other.destroy(effects.hearts, 500)
                music.power_up.play()
                player.say("Recuperado!", 500)
                it.recogido = True
                break

            if it.tipo == "mision":
                it.recogido = True
                other.destroy(effects.confetti, 500)
                music.magic_wand.play()
                energia = min(100, energia + 10)
                game.show_long_text("¡Conseguido!\n" + it.nombre, DialogLayout.BOTTOM)
                break

sprites.on_overlap(SpriteKind.player, KIND_ITEM, on_item_overlap)

# INTERACCIÓN ENEMIGOS
def on_enemy_overlap(player, enemy):
    global energia
    energia -= 5
    scene.camera_shake(4, 200)
    music.zapped.play()
    
    if player.x < enemy.x:
        player.x -= 16
    else:
        player.x += 16
    
    player.say("¡Pasando!", 200)

sprites.on_overlap(SpriteKind.player, KIND_ENEMIGO, on_enemy_overlap)

# INTERACCIÓN CALDERO (META)
def on_meta_overlap(player, meta):
    global nivel_actual
    
    objetivos: List[str] = []
    
    if nivel_actual == 1:
        objetivos = ["Gema Magica"]
    elif nivel_actual == 2:
        objetivos = ["Gema Magica", "Hierba Santa"]
    elif nivel_actual == 3:
        objetivos = ["Gema Magica", "Hierba Santa", "Libro Antiguo"]
    
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
            game.show_long_text("¡Caldero activado!\nViajando...", DialogLayout.BOTTOM)
            nivel_actual += 1
            player.start_effect(effects.halo, 1000)
            pause(1000)
            generar_mundo()
        else:
            game.over(True, effects.star_field)
    else:
        player.y += 10
        scene.camera_shake(2, 200)
        texto_falta = "Falta:\n"
        for f in faltan:
            texto_falta += "- " + f + "\n"
        game.show_long_text(texto_falta, DialogLayout.BOTTOM)

sprites.on_overlap(SpriteKind.player, KIND_META, on_meta_overlap)

# --- 6. MENÚS Y ARRANQUE ---

def mostrar_inventari():
    texto = "MOCHILA:\n"
    encontrados = 0
    for i in items:
        if i.tipo == "mision" and i.recogido:
            texto += "[X] " + i.nombre + "\n"
            encontrados += 1
    
    if encontrados == 0:
        texto += "(Vacia)"
        
    game.show_long_text(texto, DialogLayout.FULL)

def inicio():
    global juego_activo, energia, nivel_actual, items
    game.splash("THE ALCHEMIST", "Ghost Edition")
    
    game.show_long_text("Si tu energia llega a 0,\nperderas TODOS los objetos.", DialogLayout.FULL)

    setup_hero()
    controller.B.on_event(ControllerButtonEvent.PRESSED, mostrar_inventari)
    
    items = []
    nivel_actual = 1
    energia = 100.0
    
    generar_mundo()
    
    juego_activo = True

inicio()
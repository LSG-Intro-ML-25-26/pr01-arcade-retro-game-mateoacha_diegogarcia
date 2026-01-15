"""
👑 THE ALCHEMIST: GHOST PHASE EDITION 👑
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

# Tipos de Sprite
KIND_ITEM = SpriteKind.create()
KIND_META = SpriteKind.create()
KIND_ENEMIGO = SpriteKind.enemy
KIND_NPC = SpriteKind.create()
KIND_SALIDA_SECRETA = SpriteKind.create() # Nueva trampilla

# --- 3. ARTE PIXEL ---

img_hero = img("""
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
""")

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

img_trampilla = img("""
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
""")

img_suelo = img("""
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

img_pared = img("""
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
""")

# --- 4. MAPA Y ENTIDADES ---

def generar_mundo():
    global nivel_actual
    
    # LIMPIEZA TOTAL
    for muro in tiles.get_tiles_by_type(img_pared):
        tiles.set_tile_at(muro, img_suelo)
        tiles.set_wall_at(muro, False)
    
    sprites.destroy_all_sprites_of_kind(KIND_ENEMIGO)
    sprites.destroy_all_sprites_of_kind(KIND_META)
    sprites.destroy_all_sprites_of_kind(KIND_NPC)
    sprites.destroy_all_sprites_of_kind(KIND_SALIDA_SECRETA)
    
    for item in items:
        if item.sprite_fisico:
            item.sprite_fisico.destroy()

    scene.set_background_color(13)
    tiles.set_current_tilemap(tilemap("""level1"""))

    # --- DISEÑO DE NIVELES CON MECÁNICA DE FASEO ---
    # Los items (1, 2, 3) están rodeados de 'W'.
    # Hay una 'T' (Trampilla) junto al item para poder salir.
    # Los enemigos 'E' están fuera para empujarte dentro.

    # NIVEL 1
    mapa_1 = [
        "WWWWWWWWWWWWWWWWWWWW",
        "W.S..N.............W",
        "W.WWWWWWW.WW.WWW.W.W",
        "W.W.....W.WW.W...W.W",
        "W.W.E...W.WW.WWWWW.W",
        "W.WWWWWWW.WW.W1TWW.W", # <--- SALA CERRADA
        "W.........E..WWWWW.W",
        "WWWWWWWW.....WWWWWWW",
        "W..................W",
        "W.WWWWWWW...WWWWWW.W",
        "W.W.....W...W....W.W",
        "W.W.........W..C.W.W",
        "W.WWWWWWWW.WWWWWWW.W",
        "W..................W",
        "WWWWWWWWWWWWWWWWWWWW"
    ]

    # NIVEL 2
    mapa_2 = [
        "WWWWWWWWWWWWWWWWWWWW",
        "WS.......W...E.....W",
        "WWWWWW.W.W.WWWWWWW.W",
        "W......W.W.......W.W",
        "W.WWWWWW.WWWWWWW.W.W",
        "W.W...E..........W.W",
        "W.W.WWWWWWWWWWWW.W.W",
        "W.W.W......P...W.W.W",
        "W.W.W.WWWWWWWW.W.W.W",
        "W.W.W.WWWWWWWW.W.W.W",
        "W.W.W.WW2TWWWW.W.W.W", # <--- SALA CERRADA
        "W.W.W.WWWWWWWW.W.W.W",
        "W...W.....E....W.C.W",
        "WWWWWWWWWWWWWWWWWWWW",
        "WWWWWWWWWWWWWWWWWWWW"
    ]

    # NIVEL 3
    mapa_3 = [
        "WWWWWWWWWWWWWWWWWWWW",
        "WS..W...E..W.....E.W",
        "WWW.W.WWWW.W.WWWWW.W",
        "W...W.W..W.W.W...W.W",
        "W.WWW.W..W.W.W.W.W.W",
        "W.....W..W...W.W.W.W",
        "WWWWWWW.WWWWWW.W.W.W",
        "W...E........W.W.W.W",
        "W.WWWWWWWWWW.W.W.W.W",
        "W.W........W.W.W.W.W",
        "W.W.WWWWWW.W.W.W.W.W",
        "W.W.WW3TWW.W...W.C.W", # <--- SALA CERRADA
        "W.W.WWWWWWWWWWWWWW.W",
        "W.P...E............W",
        "WWWWWWWWWWWWWWWWWWWW"
    ]

    mapa_elegido = mapa_1
    if nivel_actual == 2: mapa_elegido = mapa_2
    elif nivel_actual == 3: mapa_elegido = mapa_3

    filas = len(mapa_elegido)
    cols = len(mapa_elegido[0])
    
    for r in range(filas):
        fila = mapa_elegido[r]
        for c in range(cols):
            char = fila[c]
            loc = tiles.get_tile_location(c, r)
            
            tiles.set_tile_at(loc, img_suelo)
            
            if char == "W":
                tiles.set_tile_at(loc, img_pared)
                tiles.set_wall_at(loc, True)
            elif char == "C":
                caldero = sprites.create(img_caldero, KIND_META)
                tiles.place_on_tile(caldero, loc)
                caldero.start_effect(effects.fountain, 50000)
            elif char == "S":
                if jugador: tiles.place_on_tile(jugador, loc)
            elif char == "N":
                if nivel_actual == 1: crear_rey(loc)
            elif char == "E":
                crear_enemigo(loc)
            elif char == "T":
                # La Salida Secreta
                trampilla = sprites.create(img_trampilla, KIND_SALIDA_SECRETA)
                tiles.place_on_tile(trampilla, loc)
            elif char == "P":
                crear_item("Pocion Salud", img_salud, loc, "curacion")
            
            # Objetos de misión
            elif char == "1" and nivel_actual == 1:
                crear_item("Gema Magica", img_gema, loc, "mision")
            elif char == "2" and nivel_actual == 2:
                crear_item("Hierba Santa", img_planta, loc, "mision")
            elif char == "3" and nivel_actual == 3:
                crear_item("Libro Antiguo", img_libro, loc, "mision")

    game.splash("NIVEL " + str(nivel_actual))

def crear_rey(loc: tiles.Location):
    global rey_npc
    rey_npc = sprites.create(img_rey, KIND_NPC)
    tiles.place_on_tile(rey_npc, loc)
    rey_npc.start_effect(effects.smiles, 50000)

def crear_enemigo(loc: tiles.Location):
    ene = sprites.create(img_fantasma, KIND_ENEMIGO)
    tiles.place_on_tile(ene, loc)
    ene.follow(jugador, 35)
    # MECÁNICA CLAVE: El fantasma atraviesa paredes para poder empujarte
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
    
    if settings.read_number("got_" + nombre) == 1:
        nuevo_item.recogido = True
    else:
        spr = sprites.create(img_obj, KIND_ITEM)
        tiles.place_on_tile(spr, loc)
        spr.start_effect(effects.halo, 50000)
        nuevo_item.sprite_fisico = spr

def setup_hero():
    global jugador
    # Corrección para evitar duplicados
    if jugador:
        jugador.destroy()

    jugador = sprites.create(img_hero, SpriteKind.player)
    controller.move_sprite(jugador, 80, 80)
    scene.camera_follow_sprite(jugador)
    jugador.set_stay_in_screen(True)

# --- 5. LÓGICA DEL JUEGO ---

def bucle_principal():
    global energia, juego_activo
    
    if not juego_activo: return

    velocidad = 80
    gasto = 0.05

    if controller.A.is_pressed():
        velocidad = 120
        gasto = 0.2
        jugador.start_effect(effects.trail, 100)
    
    controller.move_sprite(jugador, velocidad, velocidad)

    if controller.left.is_pressed() or controller.right.is_pressed() or controller.up.is_pressed() or controller.down.is_pressed():
        energia -= gasto

    info.set_score(int(energia))
    
    if energia <= 0:
        game.over(False, effects.melt)

game.on_update(bucle_principal)

# INTERACCIÓN NPC
def on_npc_overlap(player, npc):
    global mision_iniciada
    if not mision_iniciada:
        game.show_long_text("REY: ¡Alquimista!\nLos objetos estan ocultos tras los muros.", DialogLayout.BOTTOM)
        game.show_long_text("REY: Deja que los espectros te golpeen para traspasar la pared.\nUsa las trampillas para salir.", DialogLayout.BOTTOM)
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
                settings.write_number("got_" + it.nombre, 1)
                break

sprites.on_overlap(SpriteKind.player, KIND_ITEM, on_item_overlap)

# INTERACCIÓN ENEMIGOS (MECÁNICA DE FASEO)
def on_enemy_overlap(player, enemy):
    global energia
    energia -= 5
    scene.camera_shake(4, 200)
    music.zapped.play()
    
    # EMPUJE (FASEO): Esto permite atravesar muros si estás pegado a ellos
    if player.x < enemy.x:
        player.x -= 16
    else:
        player.x += 16
    
    player.say("¡Pasando!", 200)

sprites.on_overlap(SpriteKind.player, KIND_ENEMIGO, on_enemy_overlap)

# INTERACCIÓN CALDERO (CAMBIO DE NIVEL)
def on_meta_overlap(player, meta):
    global nivel_actual
    
    item_necesario = ""
    if nivel_actual == 1: item_necesario = "Gema Magica"
    elif nivel_actual == 2: item_necesario = "Hierba Santa"
    elif nivel_actual == 3: item_necesario = "Libro Antiguo"
    
    tiene_item = False
    for i in items:
        if i.nombre == item_necesario and i.recogido:
            tiene_item = True
            break
            
    if tiene_item:
        music.ba_ding.play()
        if nivel_actual < 3:
            game.show_long_text("El caldero te transporta...", DialogLayout.BOTTOM)
            nivel_actual += 1
            player.start_effect(effects.halo, 1000)
            pause(1000)
            generar_mundo()
        else:
            game.over(True, effects.star_field)
    else:
        player.y += 10
        scene.camera_shake(2, 200)
        player.say("Necesito: " + item_necesario, 2000)

sprites.on_overlap(SpriteKind.player, KIND_META, on_meta_overlap)

# INTERACCIÓN SALIDA SECRETA (TRAMPILLA)
def on_salida_overlap(player, salida):
    music.jump_up.play()
    player.start_effect(effects.spray, 500)
    player.say("¡Escape!", 500)
    # Teletransportar a lugar seguro (ej. 32, 32)
    player.set_position(32, 32)

sprites.on_overlap(SpriteKind.player, KIND_SALIDA_SECRETA, on_salida_overlap)

# --- 6. MENÚS Y ARRANQUE ---

def mostrar_inventari():
    texto = "MOCHILA:\n"
    for i in items:
        if i.tipo == "mision":
            estado = "[X] " if i.recogido else "[ ] "
            texto += estado + i.nombre + "\n"
    game.show_long_text(texto, DialogLayout.FULL)

def inicio():
    global juego_activo, energia, nivel_actual, items
    game.splash("THE ALCHEMIST", "Ghost Edition")
    
    opcion = game.ask_for_number("1. Jugar\n2. Borrar Progreso", 1)
    
    if opcion == 2:
        settings.write_number("got_Gema Magica", 0)
        settings.write_number("got_Hierba Santa", 0)
        settings.write_number("got_Libro Antiguo", 0)
        game.splash("Memoria borrada")

    setup_hero()
    controller.B.on_event(ControllerButtonEvent.PRESSED, mostrar_inventari)
    
    items = []
    nivel_actual = 1
    energia = 999.0
    
    generar_mundo()
    
    juego_activo = True
    game.show_long_text("CONTROLES:\nA = Correr\nB = Inventario", DialogLayout.FULL)

inicio()

"""
👑 BLACKOUT: ESPAÑA EDITION 👑
(ACTUALIZADO: Héroe en Posición Fija 50x50 en Mapa General)
"""
#hola
# --- 1. CLASES ---
class ItemJuego:
    def __init__(self, nombre: str, imagen: Image, tipo: str):
        self.nombre = nombre
        self.imagen = imagen
        self.tipo = tipo
        self.recogido = False
        self.sprite_fisico = None

# --- 2. CONFIGURACIÓN ---
items: List[ItemJuego] = []
enemigos: List[Sprite] = []
jugador: Sprite = None

energia = 999.0
juego_activo = False
nivel_actual = 0
niveles_desbloqueados = 1

ultimo_estado_hero = "parado"

KIND_ITEM = SpriteKind.create()
KIND_META = SpriteKind.create()
KIND_ENEMIGO = SpriteKind.enemy
KIND_NPC = SpriteKind.create()
KIND_TORRE = SpriteKind.create()

# --- 3. ARTE PIXEL Y ASSETS ---

img_hero = assets.image("""hero_quieto""")

# -- TORRES --
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

# -- OBJETOS DESDE ASSETS --
img_fantasma = assets.image("""img_fantasma""")

# Objetos de misión (Cables)
img_cableNaranja = assets.image("""img_cableNaranja""")
img_cableVerde = assets.image("""img_cableVerde""")
img_cableAmarillo = assets.image("""img_cableAmarillo""")

# Otros objetos
img_salud = assets.image("""img_salud""")
img_caldero = assets.image("""img_caldero""")

# Tile de suelo metálico
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
        # Buscamos si hay un marcador, pero LUEGO forzamos la posición 50,50
        lista_jugador = tiles.get_tiles_by_type(assets.tile("""marcador_jugador"""))
        
        # Opción A: Si hay marcador, lo ponemos ahí y luego movemos
        if len(lista_jugador) > 0:
            tiles.place_on_tile(jugador, lista_jugador[0])
            tiles.set_tile_at(lista_jugador[0], img_suelo_limpio)
        
        # --- AQUÍ FORZAMOS LA POSICIÓN 50x50 ---
        jugador.x = 800
        jugador.y = 800
        # ---------------------------------------
            
        # COLOCAR TORRES
        
        # Torre A
        lista_torre_a = tiles.get_tiles_by_type(assets.tile("""marcador_torre_a"""))
        for i in range(len(lista_torre_a)):
            loc = lista_torre_a[i]
            t = sprites.create(img_torre_a, KIND_TORRE)
            tiles.place_on_tile(t, loc)
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

    # Colocar Jugador en niveles (aquí SÍ usamos el marcador normal)
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
    
    # --- COLOCAR ITEMS ---
    
    # Marcador 1 -> Cable Naranja (Torre A)
    lista_cable1 = tiles.get_tiles_by_type(assets.tile("""marcador_item1"""))
    for i in range(len(lista_cable1)):
        loc = lista_cable1[i]
        crear_item("Cable de Potencia", img_cableNaranja, loc, "mision")
        tiles.set_tile_at(loc, img_suelo_limpio)

    # Marcador 2 -> Cable Verde (Torre B)
    lista_cable2 = tiles.get_tiles_by_type(assets.tile("""marcador_item2"""))
    for i in range(len(lista_cable2)):
        loc = lista_cable2[i]
        crear_item("Cable de Datos", img_cableVerde, loc, "mision")
        tiles.set_tile_at(loc, img_suelo_limpio)
        
    # Marcador 3 -> Cable Amarillo (Torre C)
    lista_cable3 = tiles.get_tiles_by_type(assets.tile("""marcador_item3"""))
    for i in range(len(lista_cable3)):
        loc = lista_cable3[i]
        crear_item("Cable Maestro", img_cableAmarillo, loc, "mision")
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
                player.say("Recuperado!", 2000)
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

# --- INTERACCIÓN CON LAS TORRES ---
def on_torre_overlap(player, torre):
    global nivel_actual, niveles_desbloqueados
    
    # TORRE A
    if torre.image == img_torre_a:
        if niveles_desbloqueados == 1:
            nivel_actual = 1
            generar_mundo()
        else:
            player.say("Torre A: COMPLETADA", 2000)
            player.y += 16
            
    # TORRE B
    elif torre.image == img_torre_b:
        if niveles_desbloqueados == 2:
            nivel_actual = 2
            generar_mundo()
        elif niveles_desbloqueados > 2:
            player.say("Torre B: COMPLETADA", 2000)
            player.y += 16
        else:
            player.say("¡Bloqueada! Termina la Torre A", 2000)
            player.y += 16
            
    # TORRE C
    elif torre.image == img_torre_c:
        if niveles_desbloqueados == 3:
            nivel_actual = 3
            generar_mundo()
        else:
            player.say("¡Bloqueada! Termina la Torre B", 2000)
            player.y += 16

sprites.on_overlap(SpriteKind.player, KIND_TORRE, on_torre_overlap)

# INTERACCIÓN CALDERO (COMPLETAR NIVEL)
def on_meta_overlap(player, meta):
    global nivel_actual, niveles_desbloqueados
    
    # Nombres actualizados de los objetos
    objetivos: List[str] = []
    
    if nivel_actual == 1:
        objetivos = ["Cable de Potencia"]
    elif nivel_actual == 2:
        objetivos = ["Cable de Potencia", "Cable de Datos"]
    elif nivel_actual == 3:
        objetivos = ["Cable de Potencia", "Cable de Datos", "Cable Maestro"]
    
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
            nivel_actual = 0
            generar_mundo()
            
        elif nivel_actual == 2:
            game.show_long_text("Torre B reactivada.\nVolviendo al mapa...", DialogLayout.BOTTOM)
            niveles_desbloqueados = 3
            nivel_actual = 0
            generar_mundo()
            
        elif nivel_actual == 3:
            game.over(True, effects.star_field)
            
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

    # 1. CIUDAD
    scene.set_background_image(assets.image("""intro_ciudad"""))

    game.show_long_text("ESPAÑA\n02:17 A.M.", DialogLayout.BOTTOM)
    
    music.big_crash.play()
    game.show_long_text("LA RED...\nSE APAGA.", DialogLayout.BOTTOM)
    game.show_long_text("No fue un fallo.\nNi un ataque.", DialogLayout.BOTTOM)
    
    # 2. RAYO
    scene.set_background_image(assets.image("""intro_rayo"""))
    game.show_long_text("La electricidad\nsimplemente...", DialogLayout.BOTTOM)
    game.show_long_text("DESAPARECIO.", DialogLayout.BOTTOM)
    game.show_long_text("Las torres entraron\nen contencion.", DialogLayout.BOTTOM)
    game.show_long_text("Los sistemas\nquedaron bajo tierra.", DialogLayout.BOTTOM)

    # 3. MAPA
    scene.set_background_image(assets.image("""intro_mapa"""))
    game.show_long_text("Los tecnicos\nnunca salieron.", DialogLayout.BOTTOM)
    game.show_long_text("Algo de ellos\nsigue abajo.", DialogLayout.BOTTOM)

    game.show_long_text("SENSORES ACTIVOS:", DialogLayout.BOTTOM)
    game.show_long_text("Detectando\nRadiacion residual...", DialogLayout.BOTTOM)
    game.show_long_text("Detectando\nEnergia inestable...", DialogLayout.BOTTOM)
    game.show_long_text("Detectando\nEcos humanos...", DialogLayout.BOTTOM)

    # 4. HÉROE
    scene.set_background_image(assets.image("""intro_heroe"""))
    music.beam_up.play()
    game.show_long_text("Eres un\nOPERADOR DE\nCONTINGENCIA.", DialogLayout.BOTTOM)
    game.show_long_text("Tu traje te protege.\nPero tu energia\nNO es infinita.", DialogLayout.BOTTOM)

    game.show_long_text("MISION PRIORITY:", DialogLayout.BOTTOM)
    game.show_long_text("Recuperar los\nPANELES DE REINICIO\nde los sotanos.", DialogLayout.BOTTOM)

    # Volvemos al MAPA
    scene.set_background_image(assets.image("""intro_mapa"""))
    game.show_long_text("ADVERTENCIA:\nEl sistema exige\nun orden exacto.", DialogLayout.BOTTOM)
    
    game.show_long_text("FASE 1:\nIr a Torre A", DialogLayout.BOTTOM)
    game.show_long_text("FASE 2:\nIr a Torre B", DialogLayout.BOTTOM)
    game.show_long_text("FASE 3:\nIr a Torre C", DialogLayout.BOTTOM)

    scene.set_background_image(None)
    scene.set_background_color(15)

    game.show_long_text("Si fallas,\nla red caera\npara siempre.", DialogLayout.CENTER)
    game.show_long_text("Si tienes exito...\nEspaña volvera\na encenderse.", DialogLayout.CENTER)
    game.show_long_text("A cualquier precio.", DialogLayout.CENTER)

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

def menu_principal():
    scene.set_background_color(15)
    scene.set_background_image(None)

    bg_negro = image.create(160, 120)
    bg_negro.fill(15)
    scene.set_background_image(bg_negro)

    pause(100)

    jugar = game.ask("¿INICIAR MISION?", "A: Jugar  B: Controles")
    
    if jugar:
        comenzar_juego()
    else:
        # TAB 1: MOVIMIENTO
        bg_controles = image.create(160, 120)
        bg_controles.fill(15)
        bg_controles.print_center("CONTROLES (1/3)", 5, 1)
        bg_controles.print("MOVIMIENTO:", 10, 30, 1)
        bg_controles.print("Usa FLECHAS", 20, 45, 6)
        bg_controles.print("o teclas WASD", 20, 60, 6)
        scene.set_background_image(bg_controles)
        game.show_long_text("Siguiente: Pulsa (A)", DialogLayout.BOTTOM)
        
        # TAB 2: ACCIÓN
        bg_controles.fill(15)
        bg_controles.print_center("CONTROLES (2/3)", 5, 1)
        bg_controles.print("ACCION:", 10, 30, 1)
        bg_controles.print("Pulsa ESPACIO", 20, 45, 6)
        bg_controles.print("o Boton (A)", 20, 60, 6)
        scene.set_background_image(bg_controles)
        game.show_long_text("Siguiente: Pulsa (A)", DialogLayout.BOTTOM)
        
        # TAB 3: CORRER
        bg_controles.fill(15)
        bg_controles.print_center("CONTROLES (3/3)", 5, 1)
        bg_controles.print("CORRER:", 10, 30, 1)
        bg_controles.print("Manten ESPACIO", 20, 45, 6)
        bg_controles.print("mientras andas", 20, 60, 6)
        scene.set_background_image(bg_controles)
        game.show_long_text("Volver al menu: (A)", DialogLayout.BOTTOM)

        menu_principal()

def comenzar_juego():
    global juego_activo, energia, nivel_actual, items
    
    introduccion_historia()

    setup_hero()
    controller.B.on_event(ControllerButtonEvent.PRESSED, mostrar_inventari)
    
    items = []
    
    # EMPEZAMOS EN EL MAPA (Nivel 0)
    nivel_actual = 0
    energia = 999.0
    
    generar_mundo()
    
    juego_activo = True

# --- INICIO DEL PROGRAMA ---
game.splash("BLACKOUT", "España Edition")
menu_principal()
// Código generado automáticamente. No editar.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level01":
            case "level1":return tiles.createTilemap(hex`1000100001010101010101010101010101010101010202020202020208080808070707010102030207020202020807070707070101080808080808020702070708080801010202020202080802020208080808010102020202070208080202020204080101020202020202050802020202020201010808080802080808020208080202010102060807020202020208080808020101020202020202020202080808080201010202080802020802020808040202010102020808040208080202080802020101080202080202080802020208020201010101020102020101010202010202010102020202020202020202020202020101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . 2 2 2 2 . . . 2 
2 . . . . . . . . 2 . . . . . 2 
2 2 2 2 2 2 2 . . . . . 2 2 2 2 
2 . . . . . 2 2 . . . 2 2 2 2 2 
2 . . . . . . 2 2 . . . . . 2 2 
2 . . . . . . . 2 . . . . . . 2 
2 2 2 2 2 . 2 2 2 . . 2 2 . . 2 
2 . . 2 . . . . . . 2 2 2 2 . 2 
2 . . . . . . . . . 2 2 2 2 . 2 
2 . . 2 2 . . 2 . . 2 2 . . . 2 
2 . . 2 2 . . 2 2 . . 2 2 . . 2 
2 2 . . 2 . . 2 2 . . . 2 . . 2 
2 2 2 . 2 . . 2 2 2 . . 2 . . 2 
2 . . . . . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.dungeon.floorLight0,sprites.dungeon.darkGroundSouthWest1,myTiles.tile3,myTiles.tile4,myTiles.tile6,myTiles.tile7,sprites.dungeon.darkGroundCenter,sprites.dungeon.floorLight1], TileScale.Sixteen);
            case "level03":
            case "level2":return tiles.createTilemap(hex`1000100001010101010101010101010101010101010202020202020202020202020202010102020202020202020202020202020101020302020202020202020202020101010202020202020202020202020201010102020202020202020202020202010101020202020202020202020202020101010202020202020202020202020202010102020202020202020202020202020101020202020202020202020202020201010202020202020202020202020202010102020202020202020202020202020101020202020202020202020202020201010202020202020202020202020202010102020202020202020202020202020101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . 2 2 
2 . . . . . . . . . . . . . 2 2 
2 . . . . . . . . . . . . . 2 2 
2 . . . . . . . . . . . . . 2 2 
2 . . . . . . . . . . . . . 2 2 
2 . . . . . . . . . . . . . 2 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.dungeon.floorLight0,sprites.dungeon.darkGroundSouthWest1,myTiles.tile3], TileScale.Sixteen);
            case "level02":
            case "level3":return tiles.createTilemap(hex`100010000a09090909090909090909090909090c060e0e0e0e0f0f0e0e0e0e0f0f0e0e08060e0e10100f0e1010101010020e0e08060e10011010101010100e0e10100f08060f1010101010100e0e0e0f10100e08060f0e0e0e100e1010100f0f10100e08060f0f0e0e100e1010101010050e0f08060f0f0f0f100e0e0e10100f0f0e0f08060f0f021010100e0e0f100e0e0e0f08060f10100e0e10100e0f100e0e0f0f08060f1010100f0f100e0f10100e0e0f08060e0e10100e0e101010101010100f08060e0f10100e0e1010020e0f10100f08060e0e040f0e1010100e0f0f03100f08060f0e0e0e0e10100f0f0f0f10100f080d07070707070707070707070707070b`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 . . 2 2 . . . . . . 2 2 2 
2 2 . . . . . . . . 2 2 . . 2 2 
2 2 . . . . . . 2 2 2 2 . . 2 2 
2 2 2 2 2 . 2 . . . 2 2 . . 2 2 
2 2 2 2 2 . 2 . . . . . . 2 2 2 
2 2 2 2 2 . 2 2 2 . . 2 2 2 2 2 
2 2 2 . . . . 2 2 2 . 2 2 2 2 2 
2 2 . . 2 2 . . 2 2 . 2 2 2 2 2 
2 2 . . . 2 2 . 2 2 . . 2 2 2 2 
2 2 2 . . 2 2 . . . . . . . 2 2 
2 2 2 . . 2 2 . . . 2 2 . . 2 2 
2 2 2 . 2 2 . . . 2 2 2 . . 2 2 
2 2 2 2 2 2 . . 2 2 2 2 . . 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile3,myTiles.tile4,myTiles.tile6,myTiles.tile8,myTiles.tile7,sprites.dungeon.greenOuterWest1,sprites.dungeon.greenOuterSouth0,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.floorLight1,sprites.dungeon.floorLight0,sprites.dungeon.darkGroundCenter], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "marcador_jugador":
            case "tile3":return tile3;
            case "marcador_enemigo":
            case "tile4":return tile4;
            case "marcador_rey":
            case "tile5":return tile5;
            case "marcador_caldero":
            case "tile6":return tile6;
            case "marcador_item2":
            case "tile8":return tile8;
            case "marcador_item3":
            case "tile9":return tile9;
            case "marcador_item1":
            case "tile7":return tile7;
        }
        return null;
    })

}
// Código generado automáticamente. No editar.

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
            case "level03":
            case "level2":return tiles.createTilemap(hex`100010000a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a010102020202020201010b0b0b040a0a0101020b080b02020202010b02020a0a0101020b0b0202020202020b02090a0a0102020b0102020901020202020b0a0a02020b0102020b040b020202020b0a0a020b07010202020b020202020b0b0a0a02020202020202020202020b0b0b0a0a010202020b0b010202020b060b0b0a0a01020202050b01010202020202020a0a010202020b0b01010102020b0b0b0a0a010b02020201010102020b0b0b0b0a0a0b0b0b02020201010202020b0b0b0a0a0b0b0402020202020202020202020a0a0b0b0b0b0b0b0b0b0b01020202030a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 . . . . . . 2 2 2 2 2 . 2 
2 2 2 . 2 . 2 . . . . 2 2 . . 2 
2 2 2 . 2 2 . . . . . . 2 . . 2 
2 2 . . 2 2 . . . 2 . . . . 2 2 
2 . . 2 2 . . 2 . 2 . . . . 2 2 
2 . 2 . 2 . . . 2 . . . . 2 2 2 
2 . . . . . . . . . . . 2 2 2 2 
2 2 . . . 2 2 2 . . . 2 . 2 2 2 
2 2 . . . . 2 2 2 . . . . . . 2 
2 2 . . . 2 2 2 2 2 . . 2 2 2 2 
2 2 2 . . . 2 2 2 . . 2 2 2 2 2 
2 2 2 2 . . . 2 2 . . . 2 2 2 2 
2 2 2 . . . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.dungeon.floorLight0,sprites.dungeon.darkGroundSouthWest1,myTiles.tile3,myTiles.tile4,myTiles.tile6,myTiles.tile8,myTiles.tile9,myTiles.tile7,sprites.dungeon.darkGroundCenter,sprites.dungeon.collectibleInsignia,sprites.dungeon.floorLight1], TileScale.Sixteen);
            case "level02":
            case "level3":return tiles.createTilemap(hex`100010000a09090909090909090909090909090c060e0e0e0e0f0f0e0e0e0e0f0f0e0e08060e0e10100f0e1010101010020e0e08060e10011010101010100e0e10100f08060f1010101010100e0e0e0f10100e08060f101010100e101010101010100e08060f0f0e10100e1010101010050e0f08060f0f0f10100e0e0e10100f0f0e0f08060f0f021010100e0e0f100e0e0e0f08060f1010101010100e0f1010100f0f08060f1010100f0f101010101010100f08060e0e10100e0e101010101010100f08060e1010100e0e1010020e0f10100f08060e1004100e1010100e0f0f03100f08060f0e0e0e0e10100f0f0f0f10100f080d07070707070707070707070707070b`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 . . 2 2 . . . . . . 2 2 2 
2 2 . . . . . . . . 2 2 . . 2 2 
2 2 . . . . . . 2 2 2 2 . . 2 2 
2 2 . . . . 2 . . . . . . . 2 2 
2 2 2 2 . . 2 . . . . . . 2 2 2 
2 2 2 2 . . 2 2 2 . . 2 2 2 2 2 
2 2 2 . . . . 2 2 2 . 2 2 2 2 2 
2 2 . . . . . . 2 2 . . . 2 2 2 
2 2 . . . 2 2 . . . . . . . 2 2 
2 2 2 . . 2 2 . . . . . . . 2 2 
2 2 . . . 2 2 . . . 2 2 . . 2 2 
2 2 . . . 2 . . . 2 2 2 . . 2 2 
2 2 2 2 2 2 . . 2 2 2 2 . . 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile3,myTiles.tile4,myTiles.tile6,myTiles.tile8,myTiles.tile7,sprites.dungeon.greenOuterWest1,sprites.dungeon.greenOuterSouth0,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.floorLight1,sprites.dungeon.floorLight0,sprites.dungeon.darkGroundCenter], TileScale.Sixteen);
            case "level01":
            case "level1":return tiles.createTilemap(hex`1900190001010101010101010101010101010101010101010101010101010202020202020208080808070707070202020202020201010102030207020202020807070707070702020202020202010101070707080808020702070702080807020202020202020101010202020202080802020208080808070202010202020101010102020202070208080202020204080702020101040101010101020202020202070802020202020207020202010101020201010808080202080808020208020202070202020202020202010102020807020202020202080808020702020202020202020101020202020202020202080808080207020101010202020201010202020202020802020808040202070201010102020202010102020808040208080202080802020702020104020202020101080202080202080802020208020207020201010202020201010102020102020101010202010502070202020101020202010102020202020707070707070707070702020202020202020101070707070701010101070707070707020202020202010101010202020202010101010202020104020202020202020101010101020202020101010101020201010102020202020101010101010102020202020201010202010101020202040101010101010101010202020202020202020202010102020101010707010101020202020402020101020202020202020201010707070101020202020202020101010101020202020201010707070701010602020202020101010101010102020202070707070707010102020202020202020202020202020202020702020202020101010101010101010101010101010101010101010101010101`, img`
2222222222222222222222222
2.......2222...........22
2........2.............22
2...222......22........22
2.....22...2222...2...222
2......22.....2...22.2222
2.......2..........222..2
2222..222..2............2
2..2.......222..........2
2.........2222...222....2
2......2..22.....222....2
2..22..22..22.....2.....2
22..2..22...2.....22....2
22..2..222..2......22...2
2.......................2
2.....2222............222
2.....2222...2........222
22....22222..222.....2222
222......22..222....22222
2222...........22..222..2
22.......22........22...2
2.......22222.....22....2
2......2222222..........2
2.......................2
2222222222222222222222222
`, [myTiles.transparency16,sprites.dungeon.floorLight0,sprites.dungeon.darkGroundSouthWest1,myTiles.tile3,myTiles.tile4,myTiles.tile6,myTiles.tile7,sprites.dungeon.darkGroundCenter,sprites.dungeon.floorLight1], TileScale.Sixteen);
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

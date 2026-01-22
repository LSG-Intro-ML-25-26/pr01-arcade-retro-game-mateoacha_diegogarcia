// Código generado automáticamente. No editar.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
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
            case "level2":
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
            case "level3":
            case "level3":return tiles.createTilemap(hex`1000100001010101010101010101010101010101010202020202020202020202020202010102020202020202020202020202020101020203020202020202020202020201010202020202020202020202020202010102020202020202020202020202020101020202020202020202020202020201010202020202020202020202020202010102020202020202020202020202020101020202020202020202020202020201010202020202020202020202020202010102020202020202020202020202020101020202020202020202020202020201010202020202020202020202020202010102020202020202020202020202020101010101010101010101010101010101`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.builtin.forestTiles1,sprites.swamp.swampTile9,myTiles.tile3], TileScale.Sixteen);
            case "level1":
            case "level1":return tiles.createTilemap(hex`10000e000101010101010101010101010101010101020202020202020808080807070701010203020702020202080707070707010108080808080802070207070808080101020202020208080202020808080801010202020207020808020202020408010102020202020205080202020202020101080808080208080802020808020201010206080702020202020808080802010102020202020202020208080808020101080808080202080808080804020201010808080804020808080808080202010108080808020208080808080802020101010101010101010101010101010101`, img`
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
2 2 2 2 2 . . 2 2 2 2 2 . . . 2 
2 2 2 2 2 . . 2 2 2 2 2 2 . . 2 
2 2 2 2 2 . . 2 2 2 2 2 2 . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.dungeon.floorLight0,sprites.dungeon.darkGroundSouthWest1,myTiles.tile3,myTiles.tile4,myTiles.tile6,myTiles.tile7,sprites.dungeon.darkGroundCenter,sprites.dungeon.floorLight1], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "miMosaico":
            case "tile1":return tile1;
            case "miMosaico0":
            case "tile2":return tile2;
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

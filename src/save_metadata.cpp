#include "save_metadata.h"
#include "cata_utility.h"
#include "filesystem.h"
#include "path_info.h"
#include "game.h"

bool read_save_metadata( const WORLD *world, const save_t &save, save_metadata &data )
{
    cata_path meta = world->folder_path() / ( save.base_path() + ".meta.json" );
    if( !file_exist( meta ) ) {
        return false;
    }
    return read_from_file_json( meta, [&]( const JsonValue & jsin ) {
        JsonObject obj = jsin.get_object();
        obj.read( "timestamp", data.timestamp );
        obj.read( "screenshot", data.screenshot );
        if( obj.has_array( "pos" ) ) {
            JsonArray pos = obj.get_array( "pos" );
            data.pos = tripoint_abs_omt( point( pos.get_int( 0 ), pos.get_int( 1 ) ), pos.get_int( 2 ) );
        }
    } );
}

void write_save_metadata( const save_metadata &data, const std::string &save_id )
{
    cata_path meta = PATH_INFO::world_base_save_path() / ( base64_encode( save_id ) + ".meta.json" );
    write_to_file( meta, [&]( std::ostream & fout ) {
        JsonOut jsout( fout );
        jsout.start_object();
        jsout.member( "timestamp", data.timestamp );
        jsout.member( "screenshot", data.screenshot );
        jsout.member( "pos", data.pos );
        jsout.end_object();
    }, _( "save metadata" ) );
}

#ifndef CATA_SRC_SAVE_METADATA_H
#define CATA_SRC_SAVE_METADATA_H

#include "catacharset.h"
#include "worldfactory.h"
#include "json.h"
#include "point.h"

struct save_metadata {
    tripoint_abs_omt pos = tripoint_abs_omt::zero;
    std::string timestamp;
    std::string screenshot;
};

bool read_save_metadata( const WORLD *world, const save_t &save, save_metadata &data );
void write_save_metadata( const save_metadata &data, const std::string &save_id );

#endif // CATA_SRC_SAVE_METADATA_H

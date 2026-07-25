import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.alterColumn('series', 'id', {
        notNull: true,
        default: null
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.alterColumn('series', 'id', {
        default: pgm.func('gen_random_uuid()')
    })
}
